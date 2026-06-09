import fs from "fs";
import path from "path";
import { Api } from "telegram";

export async function uploadFile(
  client,
  filePath
) {

  const stats = fs.statSync(filePath);

  console.log("Starting upload...");
  console.log("File size:", stats.size);

  const result = await client.sendFile(
    "me",
    {
      file: filePath,
      workers: 2,
      caption: "Uploaded file",
      forceDocument: true,

      attributes: [
        new Api.DocumentAttributeFilename({
          fileName: path.basename(filePath),
        }),
      ],

      progressCallback: (progress) => {
        console.log(progress);
      },
    }
  );

  console.log("Uploaded!");
  console.log("Message ID:", result.id);

  return result.id;
}