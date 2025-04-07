import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_encrypt_decrypt_secret_key;

export const encryptMessage = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};


