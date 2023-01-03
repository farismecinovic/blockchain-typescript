import { Blockchain } from './blockchain';
import { Transaction } from './transaction';
import EC from 'elliptic';

//=========================== SETUP ===========================//
const ec = new EC.ec('secp256k1');

const myKey = ec.keyFromPrivate(
  'a65ff3312cba338ea15729bd5fa9065cab4cde978b6bd30ad61144568a3f5d00',
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

//=========================== Work ===========================//

//Instance of blockchain
const playgroundBlockchain = new Blockchain();

// Mine first block
playgroundBlockchain.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
playgroundBlockchain.addTransaction(tx1);

// Mine block
playgroundBlockchain.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
playgroundBlockchain.addTransaction(tx2);

// Mine block
playgroundBlockchain.minePendingTransactions(myWalletAddress);

console.log();
console.log(
  `Balance of Faris is ${playgroundBlockchain.getBalanceOfAddress(
    myWalletAddress,
  )}`,
);

// Uncomment this line if you want to test tampering with the chain
// playgroundBlockchain.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log(
  'Blockchain valid?',
  playgroundBlockchain.isChainValid() ? 'Yes' : 'No',
);
