import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  createGenesisBlock(): Block {
    return new Block([], '0');
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

    if (transaction.amount <= 0) {
      throw new Error('Transaction amount should be higher than 0');
    }

    // Making sure that the amount sent is not greater than existing balance
    const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
    if (walletBalance < transaction.amount) {
      throw new Error('Not enough balance');
    }

    // Get all other pending transactions for the "from" wallet
    const pendingTxForWallet = this.pendingTransactions.filter(
      (tx) => tx.fromAddress === transaction.fromAddress,
    );

    // If the wallet has more pending transactions, calculate the total amount
    // of spend coins so far. If this exceeds the balance, we refuse to add this
    // transaction.
    if (pendingTxForWallet.length > 0) {
      const totalPendingAmount = pendingTxForWallet
        .map((tx) => tx.amount)
        .reduce((prev, curr) => prev + curr);

      const totalAmount = totalPendingAmount + transaction.amount;
      if (totalAmount > walletBalance) {
        throw new Error(
          'Pending transactions for this wallet is higher than its balance.',
        );
      }
    }

    this.pendingTransactions.push(transaction);

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 1000;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.toAddress === address) balance += trans.amount;

        if (trans.fromAddress === address) balance -= trans.amount;
      }
    }
    return balance;
  }

  isChainValid(): boolean {
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
