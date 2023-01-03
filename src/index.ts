import { Blockchain } from './blockchain';
import { Transaction } from './transaction';
import EC from 'elliptic';

const ec = new EC.ec('secp256k1');

const myKey = ec.keyFromPrivate(
  'a65ff3312cba338ea15729bd5fa9065cab4cde978b6bd30ad61144568a3f5d00',
);

const myWalletAddress = myKey.getPublic('hex');

const fareCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'publicKey goes here', 10);
tx1.signTransaction(myKey);
fareCoin.addTransaction(tx1);

console.log('\n Starting the miner..');
fareCoin.minePendingTransactions(myWalletAddress);

console.log(
  '\n Balance of faris is:',
  fareCoin.getBalanceOfAddress(myWalletAddress),
);

// fareCoin.minePendingTransactions(myWalletAddress);

// console.log(
//   '\n Balance of faris is:',
//   fareCoin.getBalanceOfAddress(myWalletAddress),
// );
