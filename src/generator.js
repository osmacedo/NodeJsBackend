import { randomBytes } from 'crypto';

const secret = randomBytes(64).toString('hex');
console.log("Secret key:", secret);