import { NextResponse } from 'next/server';
import { ogStorage } from '@/services/ogStorageService';
import { walletService } from '@/services/walletService';
import { encrypt } from '@/utils';

// ── Utility: parse input array ────────────────────────────────────────────────
const parse = (text: string) => text ? text.split('*') : [''];

// Dummy implementations for services required by the O-Link USSD router
// In a full migration, these would be actual modules interacting with DB/Blockchain
const walletSvc = {
   userExists: async (phone: string) => false,
   createWallet: async (phone: string, pin: string) => ({ address: "0x1234567890abcdef1234567890abcdef12345678" }),
   getWalletRecord: async (phone: string) => ({ address: "0x1234567890abcdef1234567890abcdef12345678" }),
   lookupByPhone: async (phone: string) => "0xabcdef1234567890abcdef1234567890abcdef12",
   verifyPin: async (phone: string, pin: string) => true
};

const chainSvc = {
   getVerifiableBalance: async (phone: string, sessionId: string) => ({ amount: "100.5", symbol: "A0GI", proofId: "proof-xyz987" }),
   getNativeBalance: async (address: string) => "100.5",
   estimateTransferFee: async (from: string, to: string, amount: string) => "0.01",
   transferNative: async (phone: string, to: string, amount: string, sessionId: string) => ({ txHash: "0xtx-hash-123", proofId: "proof-abc456" })
};

const paystackSvc = {
   getExchangeRate: () => ({ ngnPerA0gi: 1500 }),
   initiateCharge: async (phone: string, amountNGN: string, sessionId: string) => ({ reference: "ref-sub-123", paymentUrl: "https://paystack.com/pay/xyz", cryptoEstimate: "0.06" }),
   resolveAccount: async (acct: string, code: string) => ({ accountName: "John Doe" }),
   initiatePayout: async (phone: string, acct: string, code: string, amount: string, sessionId: string) => ({ reference: "ref-payout-456" })
};

const smsSvc = {
   sendWalletDetails: async (phone: string, addr: string, receipt: string) => { },
   sendDepositAddress: async (phone: string, addr: string) => { },
   sendTransferConfirmation: async (phone: string, amt: string, tx: string, proof: string) => { },
   sendPaymentLink: async (phone: string, url: string, ngn: string, crypto: string) => { }
};

const ogDA = {
   publishSessionBlob: async (sid: string, phone: string, action: string, data?: any) => { }
};

export async function POST(req: Request) {
   try {
      const formData = await req.formData();
      const sessionId = formData.get('sessionId') as string;
      const serviceCode = formData.get('serviceCode') as string;
      const phoneNumber = formData.get('phoneNumber') as string;
      const text = formData.get('text') as string || '';

      if (!phoneNumber || !sessionId) {
         return new NextResponse('END System error. Please try again.', { headers: { 'Content-Type': 'text/plain' } });
      }

      let response = 'END Unexpected error. Please try again.';

      // Attempt to find user on 0G KV using encrypted phone number
      const encryptedPhone = encrypt(phoneNumber);
      const userData = await ogStorage.getKV("olink-users", encryptedPhone);
      const isRegistered = !!userData;

      const input = parse(text);

      if (!isRegistered && input.length <= 2) {
         // User is onboarding
         response = await handleOnboarding(phoneNumber, encryptedPhone, text, sessionId);
      } else {
         // User is registered OR just finished onboarding and is selecting a menu option

         // If they just finished onboarding, the first 2 inputs were their PIN setup.
         // We slice those off so the Main Menu handler sees their actual selection as 'level0'.
         const menuInputText = (!isRegistered && input.length > 2)
            ? input.slice(2).join('*')
            : text;

         response = await handleMainMenu(phoneNumber, menuInputText, sessionId);
      }

      return new NextResponse(response, { headers: { 'Content-Type': 'text/plain' } });

   } catch (error) {
      console.error(`[USSD] Unhandled error:`, error);
      return new NextResponse('END A system error occurred. Please try again in a moment.', {
         headers: { 'Content-Type': 'text/plain' },
         status: 500
      });
   }
}

// ─────────────────────────────────────────────────────────────────────────────
//  ONBOARDING FLOW
// ─────────────────────────────────────────────────────────────────────────────
async function handleOnboarding(phoneNumber: string, encryptedPhone: string, text: string, sessionId: string) {
   const input = parse(text);

   // Step 0: Welcome
   if (text === '') {
      await ogDA.publishSessionBlob(sessionId, phoneNumber, 'ONBOARD_START');
      return `CON Welcome to O-Link 🚀
Powered by 0G Decentralized AI

New account detected.
We will create your 0G wallet.

Create a 4-digit Transaction PIN:`;
   }

   // Step 1: PIN entered, ask for confirmation
   if (input.length === 1) {
      const pin = input[0];
      if (!/^\d{4}$/.test(pin)) {
         return `CON Invalid PIN. Enter exactly 4 digits:`;
      }
      return `CON Confirm your 4-digit PIN:`;
   }

   // Step 2: Confirm PIN and create wallet
   if (input.length === 2) {
      const [pin, confirmPin] = input;

      if (pin !== confirmPin) {
         return `CON PINs do not match. Start again.
Enter your 4-digit PIN:`;
      }

      if (!/^\d{4}$/.test(pin)) {
         return `CON Invalid PIN. Enter exactly 4 digits:`;
      }

      // Create wallet using our standard WalletService
      const { address, encryptedKey } = await walletService.createWallet();

      const encryptedPin = encrypt(pin);

      // Store in 0G Storage
      await ogStorage.uploadKV("olink-users", encryptedPhone, {
         encryptedPin,
         encryptedKey,
         publicKey: address
      });

      // Save identity receipt to 0G Storage (mocked crypto.js hash)
      // const { receiptId } = await ogStorage.saveReceipt({
      //    type: 'IDENTITY',
      //    phoneHash: "hash-" + phoneNumber,
      //    address,
      // });

      // Publish to 0G DA
      // await ogDA.publishSessionBlob(sessionId, phoneNumber, 'ONBOARD_COMPLETE', { address });

      // // Send wallet details via SMS (out-of-band)
      // smsSvc.sendWalletDetails(phoneNumber, address, receiptId).catch(() => { });

      const mainMenuText = `1. Check Balance ✅
2. Deposit (get address)
3. Transfer Assets
4. Buy Crypto (NGN→A0GI)
5. Sell Crypto (A0GI→NGN)
0. Contact Support`;

      return `CON 🎉 O-Link Wallet Created!
Your 0G Wallet is ready.
──────────────────

${mainMenuText}`;
   }

   return 'END Session expired. Dial again to continue.';
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN MENU
// ─────────────────────────────────────────────────────────────────────────────
async function handleMainMenu(phoneNumber: string, text: string, sessionId: string) {
   const input = parse(text);
   const [level0, level1, level2, level3] = input;

   // ── Main menu ──────────────────────────────────────────────────────────────
   if (text === '') {
      return `CON O-Link | 0G Decentralized AI
──────────────────
1. Check Balance ✅
2. Deposit (get address)
3. Transfer Assets
4. Buy Crypto (NGN→A0GI)
5. Sell Crypto (A0GI→NGN)
0. Contact Support`;
   }

   // ── Option 0: Help ─────────────────────────────────────────────────────────
   if (level0 === '0') {
      return `END O-Link | Help
──────────────────
Powered by 0G Labs Decentralized AI
Every balance & transfer is verified
on the 0G Blockchain.

Support: support@olink.app
USSD: *384*77#
Theme: Coal to Code - Enugu 🇳🇬`;
   }

   // ── Option 1: Check Balance ────────────────────────────────────────────────
   if (level0 === '1') {
      return handleCheckBalance(phoneNumber, sessionId, level1);
   }

   // ── Option 2: Deposit ──────────────────────────────────────────────────────
   if (level0 === '2') {
      return handleDeposit(phoneNumber, sessionId);
   }

   // ── Option 3: Transfer ────────────────────────────────────────────────────
   if (level0 === '3') {
      return handleTransfer(phoneNumber, sessionId, input);
   }

   // ── Option 4: Buy Crypto (NGN → A0GI) ────────────────────────────────────
   if (level0 === '4') {
      return handleBuyCrypto(phoneNumber, sessionId, input);
   }

   // ── Option 5: Sell Crypto (A0GI → NGN) ───────────────────────────────────
   if (level0 === '5') {
      return handleSellCrypto(phoneNumber, sessionId, input);
   }

   return 'END Invalid option. Dial again.';
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPTION 1: Check Balance
// ─────────────────────────────────────────────────────────────────────────────
async function handleCheckBalance(phoneNumber: string, sessionId: string, chain: string) {
   if (!chain) {
      return `CON Select Chain:
1. 0G Galileo (A0GI)
2. Ethereum (ETH)`;
   }

   if (chain === '1') {
      const { amount, symbol, proofId } = await chainSvc.getVerifiableBalance(phoneNumber, sessionId);
      return `END 0G Balance Verified ✅
Amount: ${amount} ${symbol}
──────────────────
Proof ID: ${proofId}
Verified by 0G AI on-chain.
No trust required.`;
   }

   if (chain === '2') {
      // ETH balance (simplified)
      const record = await walletSvc.getWalletRecord(phoneNumber);
      return `END ETH Network
Address: ${record.address.slice(0, 8)}...${record.address.slice(-6)}
Check balance at:
etherscan.io/address/${record.address}`;
   }

   return 'END Invalid chain selection.';
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPTION 2: Deposit
// ─────────────────────────────────────────────────────────────────────────────
async function handleDeposit(phoneNumber: string, sessionId: string) {
   const record = await walletSvc.getWalletRecord(phoneNumber);
   await ogDA.publishSessionBlob(sessionId, phoneNumber, 'DEPOSIT_VIEW');

   // Send full address via SMS
   smsSvc.sendDepositAddress(phoneNumber, record.address).catch(() => { });

   const shortAddr = `${record.address.slice(0, 8)}...${record.address.slice(-6)}`;
   return `END Deposit Address:
${shortAddr}

Full address sent via SMS 📱
Network: 0G Galileo Testnet
Token: A0GI`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPTION 3: Transfer
// ─────────────────────────────────────────────────────────────────────────────
async function handleTransfer(phoneNumber: string, sessionId: string, input: string[]) {
   const [, recipType, recipValue, amount, pin] = input;

   // Step 1: Choose recipient type
   if (!recipType) {
      return `CON Transfer Assets
──────────────────
Send to:
1. Phone Number (O-Link user)
2. Wallet Address`;
   }

   // Step 2: Enter recipient
   if (!recipValue) {
      if (recipType === '1') return `CON Enter recipient phone number\n(with country code, e.g. 2348012345678):`;
      if (recipType === '2') return `CON Enter recipient wallet address:`;
      return 'END Invalid selection.';
   }

   // Step 3: Enter amount
   if (!amount) {
      return `CON Enter amount to send (A0GI):`;
   }

   const amountNum = parseFloat(amount);
   if (isNaN(amountNum) || amountNum <= 0) {
      return 'END Invalid amount. Dial again.';
   }

   // Step 4: Resolve recipient wallet
   let toAddress = recipValue;
   if (recipType === '1') {
      const recipPhone = recipValue.startsWith('+') ? recipValue : `+${recipValue}`;
      toAddress = await walletSvc.lookupByPhone(recipPhone);
      if (!toAddress) {
         return `END Recipient not found.
Phone ${recipValue} is not registered on O-Link.
Ask them to dial *384*77# to join.`;
      }
   }

   // Validate address format
   if (!toAddress.match(/^0x[0-9a-fA-F]{40}$/i)) {
      return 'END Invalid wallet address. Dial again.';
   }

   // Step 5: Enter PIN
   if (!pin) {
      const record = await walletSvc.getWalletRecord(phoneNumber);
      const fee = await chainSvc.estimateTransferFee(record.address, toAddress, amount);
      return `CON Confirm Transfer:
To: ${toAddress.slice(0, 8)}...${toAddress.slice(-6)}
Amount: ${amount} A0GI
Est. Fee: ${fee} A0GI
──────────────────
Enter your 4-digit PIN:`;
   }

   // Step 6: Execute transfer after PIN verification
   const pinOk = await walletSvc.verifyPin(phoneNumber, pin);
   if (!pinOk) {
      return 'END Wrong PIN. Transfer cancelled.\nDial again to retry.';
   }

   const { txHash, proofId } = await chainSvc.transferNative(
      phoneNumber, toAddress, amount, sessionId
   );

   // SMS confirmation
   smsSvc.sendTransferConfirmation(phoneNumber, amount, txHash, proofId).catch(() => { });

   return `END Transfer Successful ✅
Amount: ${amount} A0GI sent
0G Proof: ${proofId}
Check SMS for full tx details.`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPTION 4: Buy Crypto (NGN → A0GI)
// ─────────────────────────────────────────────────────────────────────────────
async function handleBuyCrypto(phoneNumber: string, sessionId: string, input: string[]) {
   const [, amountNGN] = input;

   if (!amountNGN) {
      const rate = paystackSvc.getExchangeRate();
      return `CON Buy A0GI with NGN
Rate: 1 A0GI ≈ ${rate.ngnPerA0gi} NGN
(Verified by 0G AI Oracle)
──────────────────
Enter NGN amount to spend:`;
   }

   const amount = parseFloat(amountNGN);
   if (isNaN(amount) || amount < 100) {
      return 'END Minimum purchase is NGN 100.';
   }

   const { reference, paymentUrl, cryptoEstimate } = await paystackSvc.initiateCharge(
      phoneNumber, amountNGN, sessionId
   );

   // After Paystack confirms, the webhook triggers the crypto release
   smsSvc.sendPaymentLink(phoneNumber, paymentUrl, amountNGN, cryptoEstimate).catch(() => { });

   return `END Buying ${cryptoEstimate} A0GI
NGN ${amountNGN} via Paystack

Payment link sent to your phone via SMS 📱
Complete payment to receive crypto.
Ref: ${reference.slice(-8)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPTION 5: Sell Crypto (A0GI → NGN)
// ─────────────────────────────────────────────────────────────────────────────
async function handleSellCrypto(phoneNumber: string, sessionId: string, input: string[]) {
   const [, amount, bankAccount, bankCode, pin] = input;

   if (!amount) {
      const rate = paystackSvc.getExchangeRate();
      return `CON Sell A0GI for NGN
Rate: 1 A0GI ≈ ${rate.ngnPerA0gi} NGN
──────────────────
Enter A0GI amount to sell:`;
   }

   const amountNum = parseFloat(amount);
   if (isNaN(amountNum) || amountNum <= 0) {
      return 'END Invalid amount.';
   }

   if (!bankAccount) {
      return `CON Enter your 10-digit bank account number:`;
   }

   if (!bankCode) {
      return `CON Enter your bank code:
(e.g. 058=GTB, 033=UBA, 044=Access)
Type your bank code:`;
   }

   // Validate bank account
   let accountName;
   try {
      const resolved = await paystackSvc.resolveAccount(bankAccount, bankCode);
      accountName = resolved.accountName;
   } catch {
      return `END Could not verify bank account.
Check account number and bank code.
Dial again to retry.`;
   }

   if (!pin) {
      const rate = paystackSvc.getExchangeRate();
      const ngnAmt = (amountNum * rate.ngnPerA0gi).toFixed(2);
      return `CON Confirm Sale:
Sell: ${amount} A0GI
Receive: NGN ${ngnAmt}
To: ${accountName}
──────────────────
Enter your 4-digit PIN:`;
   }

   // Verify PIN
   const pinOk = await walletSvc.verifyPin(phoneNumber, pin);
   if (!pinOk) return 'END Wrong PIN. Sale cancelled.';

   const rate = paystackSvc.getExchangeRate();
   const ngnAmt = (amountNum * rate.ngnPerA0gi).toFixed(2);

   const { reference } = await paystackSvc.initiatePayout(
      phoneNumber, bankAccount, bankCode, ngnAmt, sessionId
   );

   return `END Sale Initiated ✅
${amount} A0GI → NGN ${ngnAmt}
To: ${accountName}
Payout Ref: ${reference.slice(-8)}
You'll receive NGN within 30 mins.`;
}
