export default async function handler(req, res) {
    const uri = process.env.MONGO_URI;
    const { MongoClient, ServerApiVersion } = require("mongodb");
    if (req.method == "GET") {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
  
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("doctors"); // Choose a name for your database
        const collection = database.collection("login"); // Choose a name for your collection
        const allData = await collection.find().toArray();
        if (!allData) {
          res.status(401).json({ error: "Error" });
        }
        const response = allData.map((doc) => {
          const { password, ...rest } = doc;
          return rest;
        });
        res.status(200).json(response);
       
  
        // Send a ping to confirm a successful connection
      } catch (err) {
        res.status(500).json({ error: err });
      }
      finally{
        await client.close();
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  