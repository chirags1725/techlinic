export default async function handler(req, res) {
    const uri = process.env.MONGO_URI;
    const { MongoClient, ServerApiVersion } = require("mongodb");
    if (req.method == "POST") {
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
        const database = client.db("prescription"); // Choose a name for your database
        const collection = database.collection("prescription"); // Choose a name for your collection
        
        try {
            const result = await collection.insertOne(req.body);
            res.status(200).json({ message: "Inserted successfully", insertedId: result.insertedId });
          } catch (err) {
            res.status(500).json({ error: err });
          }
  
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
  