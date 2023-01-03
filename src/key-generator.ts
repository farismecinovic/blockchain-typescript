import EC from 'elliptic';

const ec = new EC.ec('secp256k1');

const key = ec.genKeyPair();

export const publicKey = key.getPublic('hex');
export const privateKey = key.getPrivate('hex');

console.log();

console.log('Private key:', privateKey);

console.log();

console.log('Public key:', publicKey);
