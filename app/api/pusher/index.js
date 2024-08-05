import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  console.log("Request Method:", req.method); // Log request method
  console.log("Request Body:", req.body); // Log request body

  if (req.method === "POST") {
    const { channelName, eventName, message } = req.body;

    try {
      await pusher.trigger(channelName, eventName, message);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error triggering Pusher:", error);
      res.status(500).json({ error: "Error triggering Pusher" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
