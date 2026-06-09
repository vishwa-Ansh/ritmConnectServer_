export async function sendPushNotification(
  tokens,
  title,
  body
) {
  const messages = tokens.map((token) => ({
    to: token,
    sound: "default",
    title,
    body,
  }));

  const response = await fetch(
    "https://exp.host/--/api/v2/push/send",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    }
  );

  const data = await response.json();

  console.log("Notification Response");
  console.log(data);
}