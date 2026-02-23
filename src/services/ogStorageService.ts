import { ethers } from 'ethers';
import { Indexer, getFlowContract, StreamDataBuilder, Batcher, StorageNode, KvClient } from '@0glabs/0g-ts-sdk';

/**
 * Required Environment Variables:
 * NEXT_PUBLIC_0G_RPC_ENDPOINT - The RPC endpoint for the 0G network (e.g., https://evmrpc-testnet.0g.ai)
 * NEXT_PUBLIC_0G_INDEXER_RPC_ENDPOINT - The indexer endpoint for KV storage
 * NEXT_PUBLIC_0G_PRIVATE_KEY - Private key for the account paying gas/fees
 * NEXT_PUBLIC_0G_FLOW_CONTRACT_ADDRESS - The Flow contract address
 */

export class OGStorageService {
   private provider: ethers.JsonRpcProvider;
   private signer: ethers.Wallet;
   private indexer: Indexer;
   private rpcEndpoint: string;
   // Cast to any to get around Ethers v5 vs v6 mismatch in standard SDK setups
   private flowContract: any;

   constructor() {
      this.rpcEndpoint = process.env.NEXT_PUBLIC_0G_RPC_ENDPOINT || 'https://evmrpc-testnet.0g.ai';
      const privateKey = process.env.NEXT_PUBLIC_0G_PRIVATE_KEY;
      const indexerEndpoint = process.env.NEXT_PUBLIC_0G_INDEXER_RPC_ENDPOINT || 'https://indexer-testnet.0g.ai';
      const flowContractAddress = process.env.NEXT_PUBLIC_0G_FLOW_CONTRACT_ADDRESS || '0x0460aA47b41a66694c0a73f667aCEb81cC436726'; // Default Standard Testnet

      if (!privateKey) {
         console.warn("Wallet Private Key missing. Storage writes will fail.");
      }

      this.provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
      this.signer = new ethers.Wallet(privateKey || ethers.Wallet.createRandom().privateKey, this.provider);
      this.indexer = new Indexer(indexerEndpoint);

      this.flowContract = getFlowContract(flowContractAddress, this.signer as any);
   }

   /**
    * Uploads a key-value pair to the 0G-KV store
    */
   async uploadKV(streamIdStr: string, key: string, value: any): Promise<string | null> {
      try {
         // Encode data
         const textData = typeof value === 'string' ? value : JSON.stringify(value);
         const keyBytes = new TextEncoder().encode(key);
         const valueBytes = new TextEncoder().encode(textData);

         // Expected StreamID needs to be hex/bytes32 representation 
         const streamId = ethers.id(streamIdStr);

         console.log(`Uploading KV - Stream: ${streamIdStr}, Key: ${key}`);

         // 1. Build Stream Data
         const builder = new StreamDataBuilder(1); // KV Version 1
         builder.set(streamId, keyBytes, valueBytes);

         // 2. Select a storage node via the indexer
         const [nodes, err] = await this.indexer.selectNodes(1);
         if (err || !nodes || nodes.length === 0) {
            console.error("Failed to select KV storage node:", err);
            return null;
         }

         // 3. Batch and Execute
         const batcher = new Batcher(1, nodes, this.flowContract, this.rpcEndpoint);
         batcher.streamDataBuilder = builder;

         const [result, execErr] = await batcher.exec();

         if (execErr || !result) {
            console.error("Batch exec failed:", execErr);
            return null;
         }

         console.log(`Successfully uploaded to KV. Root Hash: ${result.rootHash}`);

         return result.rootHash;
      } catch (error) {
         console.error('Failed to upload to 0G KV:', error);
         return null;
      }
   }

   /**
    * Retrieves a value from the 0G-KV store by key
    */
   async getKV(streamIdStr: string, key: string): Promise<any | null> {
      try {
         const streamId = ethers.id(streamIdStr);
         const keyBytes = new TextEncoder().encode(key);

         // Select a storage node via the indexer to read from
         const [nodes, err] = await this.indexer.selectNodes(1);
         if (err || !nodes || nodes.length === 0) {
            console.error("Failed to select KV storage node for reading:", err);
            return null;
         }

         const kvClient = new KvClient(nodes[0].url);

         console.log(`Getting KV - Stream: ${streamIdStr}, Key: ${key} from ${nodes[0].url}`);

         // SDK getValue signature expects (streamId, keyBytes)
         const value = await kvClient.getValue(streamId, keyBytes as any);

         if (!value || !value.data) {
            console.log("No data found for key:", key);
            return null;
         }

         // Decode from Base64
         const decodedStr = Buffer.from(value.data, 'base64').toString('utf8');
         try {
            return JSON.parse(decodedStr);
         } catch (e) {
            return decodedStr; // Plain string
         }
      } catch (error) {
         console.error('Failed to get from 0G KV:', error);
         return null;
      }
   }

   async saveReceipt(data: any): Promise<{ receiptId: string }> {
      console.log("Saving receipt via OG KV Storage Service");
      const receiptId = `og-receipt-${Date.now()}`;

      const hash = await this.uploadKV("olink-receipts", receiptId, data);

      return { receiptId: hash || receiptId };
   }
}

export const ogStorage = new OGStorageService();
