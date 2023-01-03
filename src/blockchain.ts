import { Block } from './block';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  minningReward: number;

  constructor(difficulty?: number) {
    this.chain = [this.createGenisisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.minningReward = 50;
  }

  createGenisisBlock(): Block {
    return new Block(
      [{ toAddress: 'none', fromAddress: 'none', amount: 0 }],
      'none',
    );
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(walletAddress: string): void {
    const block = new Block(this.pendingTransactions);

    /* Mines new block */
    block.mineBlock(this.difficulty);

    /* Add new block to the chain */
    this.chain.push(block);

    this.pendingTransactions = [
      {
        fromAddress: null,
        toAddress: walletAddress,
        amount: this.minningReward,
      },
    ];
  }

  createTransaction(transaction: Transaction): void {
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

      if (currentBlock.hash !== currentBlock.calcualteHash()) return false;

      if (currentBlock.previousHash !== prevBlock.hash) return false;
    }
    return true;
  }
}
