import { Block } from "./block.js";
import { Blockchain } from "./blockchain.js";

let fareCoin = new Blockchain();

fareCoin.addNewBlock(new Block(1, "3/1/2023", { amount: 20 }));
fareCoin.addNewBlock(new Block(1, "3/1/2023", { amount: 4 }));

console.log(JSON.stringify(fareCoin, null, 4));
