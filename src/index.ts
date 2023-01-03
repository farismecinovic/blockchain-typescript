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
const playgroundBlockchain = new Blockchain(Number(process.argv[2] || 4));
const numOfBlocks = +process.argv[3] || 10;

// Mine first block
playgroundBlockchain.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
for (let i = 1; i <= numOfBlocks; i++) {
  const tx = new Transaction(myWalletAddress, 'address1', 10);
  tx.signTransaction(myKey);
  playgroundBlockchain.addTransaction(tx);

  // Mine block
  playgroundBlockchain.minePendingTransactions(myWalletAddress);
}

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

console.log('--- GENERATED CHAIN ---\n');
// console.log(JSON.stringify(playgroundBlockchain, null, 4));
