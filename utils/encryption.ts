// utils/encryption.ts

// Generate random room key (256-bit)
export function generateRoomKey() {
  const key = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...key));
}

// Convert base64 → Uint8Array
function base64ToBytes(base64: string) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

// Convert Uint8Array → base64
function bytesToBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

// Encrypt message
export async function encryptMessage(message: string, roomKey: string) {
  const keyBytes = base64ToBytes(roomKey);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(message),
  );

  return {
    ciphertext: bytesToBase64(new Uint8Array(encrypted)),
    iv: bytesToBase64(iv),
  };
}

// Decrypt message
export async function decryptMessage(
  ciphertext: string,
  iv: string,
  roomKey: string,
) {
  const keyBytes = base64ToBytes(roomKey);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToBytes(iv),
    },
    cryptoKey,
    base64ToBytes(ciphertext),
  );

  return new TextDecoder().decode(decrypted);
}
