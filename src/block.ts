import crypto from 'crypto-js';
import { Transaction } from './transaction';

const { SHA256 } = crypto;

export class Block {
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(transactions: Transaction[], previousHash = '') {
    this.timestamp = Date.now().toString();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calcualteHash();
    this.nonce = 0;
  }

  calcualteHash(): string {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce,
    ).toString();
  }

  mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calcualteHash();
    }

    console.log('Block mined:', this.hash);
  }

  hasValidTransactions(): boolean {
    for (const tx of this.transactions) {
      if (!tx.isValid()) return false;
    }

    return true;
  }
}
