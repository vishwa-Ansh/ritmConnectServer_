import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import fs from "fs";

const apiId = 36959988;
const apiHash = "YOUR_API_HASH";

const stringSession = new StringSession("YOUR_SESSION");

const client = new TelegramClient(
  stringSession,
  apiId,
  apiHash,
  {
    connectionRetries: 5,
  }
);

(async () => {
  await client.start();

  // message id
  const messageId = 24;

  // fetch message
  const message = await client.getMessages("me", {
    ids: [messageId],
  });

  console.log(message[0]);

  // download media
  const buffer = await client.downloadMedia(
    message[0].media,
    {}
  );

  // save file
  fs.writeFileSync("downloaded_file.jpg", buffer);

  console.log("Downloaded!");
})();