import cryptoJs from "crypto-js";

const key = import.meta.env.VITE_CRYPTO_SECRET_KEY;
export const Encrypt = (text) => {
    return cryptoJs.AES.encrypt(text, key).toString();
}
export const Decrypt = (ciphertext) => {
    let bytes = cryptoJs.AES.decrypt(ciphertext, key);
    return bytes.toString(cryptoJs.enc.Utf8);
}