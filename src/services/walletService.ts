import { ethers } from 'ethers';
import { encrypt, decrypt } from '../utils';

/**
 * Required Environment Variables:
 * WALLET_ENCRYPTION_SECRET - 32 character strong secret key for AES-256-GCM
 * NEXT_PUBLIC_0G_RPC_ENDPOINT - The RPC endpoint for the 0G network (e.g., https://evmrpc-testnet.0g.ai)
 */

// A basic mapping for known ERC20 tickers on the 0G network.
// In production, these should be dynamically fetched from a database.
const TOKEN_DIRECTORY: Record<string, string> = {
   'USDT': '0x... (Replace with actual 0G USDT contract)',
   'USDC': '0x... (Replace with actual 0G USDC contract)',
};

// Generic ERC20 ABI for balance checking
const ERC20_ABI = [
   "function balanceOf(address owner) view returns (uint256)",
   "function decimals() view returns (uint8)",
   "function symbol() view returns (string)"
];

export class WalletService {
   private provider: ethers.JsonRpcProvider;

   constructor() {
      const rpcEndpoint = process.env.NEXT_PUBLIC_0G_RPC_ENDPOINT || 'https://evmrpc-testnet.0g.ai';
      this.provider = new ethers.JsonRpcProvider(rpcEndpoint);
   }

   /**
    * Creates a new randomized Ethers wallet, encrypts its private key,
    * and returns the public address and the encrypted key payload.
    */
   async createWallet(): Promise<{ address: string; encryptedKey: string }> {
      // 1. Generate new wallet
      const wallet = ethers.Wallet.createRandom();

      // 2. Encrypt the private key
      const encryptedKey = encrypt(wallet.privateKey);

      return {
         address: wallet.address,
         encryptedKey
      };
   }

   /**
    * Reconstructs an Ethers Wallet instance from an encrypted payload
    */
   public getWalletFromEncryptedKey(encryptedPayload: string): ethers.Wallet {
      const privateKey = decrypt(encryptedPayload);
      return new ethers.Wallet(privateKey, this.provider);
   }

   /**
    * Checks the native token (A0GI) balance on the 0G network for an address.
    */
   async getNativeBalance(address: string): Promise<string> {
      try {
         const balanceWei = await this.provider.getBalance(address);
         // Convert Wei (18 decimals) to standard format
         return ethers.formatEther(balanceWei);
      } catch (error) {
         console.error(`Failed to fetch native balance for ${address}:`, error);
         return "0.0";
      }
   }

   /**
    * Checks the ERC20 token balance on the 0G network for an address using a ticker.
    */
   async getERC20Balance(address: string, tickerOrContractAddress: string): Promise<string> {
      try {
         // Resolve the contract address
         const contractAddress = TOKEN_DIRECTORY[tickerOrContractAddress.toUpperCase()] || tickerOrContractAddress;

         // Simple validation to ensure it looks like a hex address
         if (!ethers.isAddress(contractAddress)) {
            throw new Error(`Invalid token address or unmapped ticker: ${tickerOrContractAddress}`);
         }

         const contract = new ethers.Contract(contractAddress, ERC20_ABI, this.provider);

         // Parallel fetch for balance and decimals
         const [balanceRaw, decimals] = await Promise.all([
            contract.balanceOf(address),
            contract.decimals().catch(() => 18) // Fallback to 18 if decimals fails
         ]);

         return ethers.formatUnits(balanceRaw, decimals);
      } catch (error) {
         console.error(`Failed to fetch ERC20 balance for ${tickerOrContractAddress} at ${address}:`, error);
         return "0.0";
      }
   }
}

export const walletService = new WalletService();
