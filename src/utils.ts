import crypto from 'crypto';

/**
 * Required Environment Variable:
 * WALLET_ENCRYPTION_SECRET - 32 character strong secret key for AES-256-GCM
 */

const getEncryptionSecret = () => {
   let secret = process.env.WALLET_ENCRYPTION_SECRET || '01234567890123456789012345678901';

   if (secret.length !== 32) {
      console.warn("Utils.ts: WALLET_ENCRYPTION_SECRET should be exactly 32 characters long for AES-256-GCM.");
      // Pad or truncate safely if misconfigured locally
      secret = secret.padEnd(32, '0').substring(0, 32);
   }
   return Buffer.from(secret);
};


/**
 * Encrypts a plaintext string using AES-256-GCM
 * @param text The plaintext string to encrypt
 * @returns Formatted payload: `iv:authTag:encryptedData`
 */
export function encrypt(text: string): string {
   const iv = crypto.randomBytes(16);
   const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionSecret(), iv) as crypto.CipherGCM;

   let encrypted = cipher.update(text, 'utf8', 'hex');
   encrypted += cipher.final('hex');

   const authTag = cipher.getAuthTag().toString('hex');

   // Format: iv:authTag:encryptedData
   return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted payload back into a plaintext string
 * @param encryptedPayload Formatted payload: `iv:authTag:encryptedData`
 * @returns The decrypted plaintext string
 */
export function decrypt(encryptedPayload: string): string {
   try {
      const parts = encryptedPayload.split(':');
      if (parts.length !== 3) throw new Error("Invalid encrypted payload format");

      const iv = Buffer.from(parts[0], 'hex');
      const authTag = Buffer.from(parts[1], 'hex');
      const encryptedText = parts[2];

      const decipher = crypto.createDecipheriv('aes-256-gcm', getEncryptionSecret(), iv) as crypto.DecipherGCM;
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
   } catch (error) {
      console.error("Encryption Util Decryption Failed:", error);
      throw new Error("Failed to decrypt payload.");
   }
}
