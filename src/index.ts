import { Blockchain } from './blockchain';

const fareCoin = new Blockchain();

fareCoin.createTransaction({
  fromAddress: 'address1',
  toAddress: 'address2',
  amount: 50,
});

fareCoin.createTransaction({
  fromAddress: 'address2',
  toAddress: 'address1',
  amount: 10,
});

console.log('\n Starting the miner..');
fareCoin.minePendingTransactions('faris-address');

console.log(
  '\n Balance of faris-address is:',
  fareCoin.getBalanceOfAddress('faris-address'),
);

console.log('\n Starting the miner again..');
fareCoin.minePendingTransactions('faris-address');

console.log(
  '\n Balance of faris-address is:',
  fareCoin.getBalanceOfAddress('faris-address'),
);
