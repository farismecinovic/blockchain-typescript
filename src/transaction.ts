import crypto from 'crypto-js';
import EC from 'elliptic';

const ec = new EC.ec('secp256k1');
const { SHA256 } = crypto;

export class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  signature: string;
  timestamp: string;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now().toString();
  }

  calculateHash(): string {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey: EC.ec.KeyPair) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error("You can't sign transactions for other wallets! ");
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');

    this.signature = sig.toDER('hex');
  }

  isValid(): boolean {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction!');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
