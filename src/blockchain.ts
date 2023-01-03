import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;

  constructor() {
    this.chain = [this.createGenisisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  createGenisisBlock(): Block {
    return new Block([new Transaction(null, null, 0)], 'none');
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(walletAddress: string): void {
    const rewardTx = new Transaction(null, walletAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    const block = new Block(this.pendingTransactions, this.getLastBlock().hash);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address!');
    }

    if (!transaction.isValid()) {
      throw new Error("Can't add invalid transaction to the chain");
    }
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.toAddress === address) balance += trans.amount;

        if (trans.fromAddress === address) balance -= trans.amount;
      }
    }
    return balance;
  }

  isValidChain(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) return false;

      if (currentBlock.hash !== currentBlock.calcualteHash()) return false;

      if (currentBlock.previousHash !== prevBlock.hash) return false;
    }
    return true;
  }
}
