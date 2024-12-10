import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key';
export const encodeData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return encryptedData;
};

export const decodeData = (encodedData) => {
  const bytes = CryptoJS.AES.decrypt(encodedData, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const getDecodedData = (key) => {
  const encodedData = localStorage.getItem(key);
  if (encodedData) {
    return decodeData(encodedData);
  }
  return null; 
};

export const setEncodedData = (key, data) => {
  const encodedData = encodeData(data);
  localStorage.setItem(key, encodedData);
};
