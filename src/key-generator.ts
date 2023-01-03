import EC from 'elliptic';

const ec = new EC.ec('secp256k1');

const key = ec.genKeyPair();

export const publicKey = key.getPublic('hex');
export const privateKey = key.getPrivate('hex');
