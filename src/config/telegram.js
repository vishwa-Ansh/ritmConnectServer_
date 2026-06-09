// import { TelegramClient } from "telegram";
// import { CustomFile } from "telegram/client/uploads.js";
// import { StringSession } from "telegram/sessions/index.js";
// import readline from "readline";
// import fs from "fs";
// import path from "path";
// import { Api } from "telegram";
// const apiId = 36959988;
// const apiHash = "558c0dbf14c51d7c26a72a2aaa741c44";

// const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjEyMAG7LAFU9Vvu7yyzC1X5YC7BxtOCzr+V/WEtRp4t+Paw6KUNH2SfNNbL3cVFXUZZzpUfLi8Hoz7VmdX/Gk9/PFmHkH/enH5vO0mQC8WR3WIGGPsVPpM0tFgslXoYte8zcBTLj/adKKuBOJ5Rwks+Wa/t7ZA24RhToV06oQ410VcLAFDteJynlpU6AilcGxjgMkeKzjtT8Kyi3zrx51WeEHsjBvyIXUzJ3BVfa8gzfpmdTAPrzRhHPDMEg4dtMcg3F+MLe4lq4FcyiDfMcG15E7x6/br01mNrU8HesmPcOPQfZVrxyoR3aacZnJYtovrQB5e0hxhmyyMyMdmBiJNjwv1t2w==");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function uploadFile(client, filePath) {
//   const stats = fs.statSync(filePath);
//   console.log("Starting upload...");
// console.log("File size:", stats.size);

//   const file = new CustomFile(
//     // "sample.pdf",
//     path.basename(filePath),
//     stats.size,
//     filePath
//   );

// //   const result = await client.sendFile("me", {
// //     file,
// //     workers: 1,
// //     caption: "Uploaded file",
// //     forceDocument: true,
// //   });

// // const result = await client.sendFile("me", {
// //   file,
// //   workers: 4,
// //   partSizeKb: 1024,
// //   caption: "Uploaded file",
// //   forceDocument: true,
// // });

// // const result = await client.sendFile("me", {
// //   file,
// //   workers: 1,
// //   partSizeKb: 512,
// //   caption: "Uploaded file",
// //   forceDocument: true,
// // });


// const result = await client.sendFile("me", {
//   file,
//   workers: 2,
// //   partSizeKb: 1024,
//   caption: "Uploaded file",
//   forceDocument: true,
//   attributes: [
//   new Api.DocumentAttributeFilename({
//     fileName: path.basename(filePath),
//   }),
// ],

//   progressCallback: (progress) => {
//     console.log(progress);
//   },
// });

//   console.log("Uploaded!");
//   console.log("Message ID:", result.id);

//   return result.id;
// }

// (async () => {
//   console.log("Loading...");

//   const client = new TelegramClient(
//     stringSession,
//     apiId,
//     apiHash,
//     {
//       connectionRetries: 5,
//     }
//   );

//   await client.start({
//     phoneNumber: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter your number: ", resolve)
//       ),

//     password: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter your password: ", resolve)
//       ),

//     phoneCode: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter the code: ", resolve)
//       ),

//     onError: (err) => console.log(err),
//   });

//   console.log("Connected!");
//   console.log("Session String:");
//   console.log(client.session.save());

// //   await client.sendMessage("me", {
// //     message: "Hello!",
// //   });
// //   await client.connect();

// //   await uploadFile(
// //     client,
// //     "/Users/vishwaansh/nativeCode/BackendServer/sample.pdf"
// //   );
// await uploadFile(
//   client,
//   "/Users/vishwaansh/nativeCode/BackendServer/m3.pdf"
// );
// console.log("Done!");

// await client.disconnect();

// process.exit(0);

// })();

import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
const apiId = 36959988;
const apiHash = "558c0dbf14c51d7c26a72a2aaa741c44";

const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjEyMAG7LAFU9Vvu7yyzC1X5YC7BxtOCzr+V/WEtRp4t+Paw6KUNH2SfNNbL3cVFXUZZzpUfLi8Hoz7VmdX/Gk9/PFmHkH/enH5vO0mQC8WR3WIGGPsVPpM0tFgslXoYte8zcBTLj/adKKuBOJ5Rwks+Wa/t7ZA24RhToV06oQ410VcLAFDteJynlpU6AilcGxjgMkeKzjtT8Kyi3zrx51WeEHsjBvyIXUzJ3BVfa8gzfpmdTAPrzRhHPDMEg4dtMcg3F+MLe4lq4FcyiDfMcG15E7x6/br01mNrU8HesmPcOPQfZVrxyoR3aacZnJYtovrQB5e0hxhmyyMyMdmBiJNjwv1t2w==");

export const client = new TelegramClient(
  stringSession,
  apiId,
  apiHash,
  {
    connectionRetries: 5,
  }
);
await client.start();
console.log("Telegram Connected!");