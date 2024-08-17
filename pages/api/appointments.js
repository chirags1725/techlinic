// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const uri = process.env.MONGO_URI;
  const { MongoClient, ServerApiVersion } = require("mongodb");

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("appointment");
      const collection = database.collection("appointment");
      
      const user = await collection.find({
        email: req.query.email.toLowerCase(),
        role: req.query.role
      }).toArray();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Internal server error occured" });
    } finally {
      await client.close();
    }
  }
}
