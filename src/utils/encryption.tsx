import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

export const encryptPassword = (password: string): string => {
  if (!secretKey) {
    throw new Error("Secret key is not defined.");
  }
  if (!password) {
    throw new Error("Password cannot be empty.");
  }
  const iv = CryptoJS.lib.WordArray.random(16);
  const key = CryptoJS.enc.Utf8.parse(secretKey);

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
};
