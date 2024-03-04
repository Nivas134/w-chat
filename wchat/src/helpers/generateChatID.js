import CryptoJS from "crypto-js";

function genrateSortedByEmail(email1, email2) {
  if (email1.length > email2.length) return [email1, email2];
  else if (email1.length < email2.length) return [email2, email1];
  else if (email1.length === email2.length) {
    return [email1, email2].sort((a, b) => a.localeCompare(b));
  }
}

function generateChatIdByEmail(email1, email2) {
  let emails = genrateSortedByEmail(email1, email2);
  const [first, last] = emails;
  const concatenatedEmails = first + last;
  const uniqueId = CryptoJS.MD5(concatenatedEmails).toString();
  // console.log("emails.........", uniqueId);
  return uniqueId;
}

export { generateChatIdByEmail };
