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
    } 
    if(req.method == "GET"){
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
        
        let query = {};
        if(req.query.doctor){
          query = {doctor: req.query.doctor};
        } else if(req.query.name){
          query = {name: req.query.name};
        }

        try {
            const result = await collection.find(query).toArray();
            if(result.length == 0){
              res.status(200).json({message:"No past prescriptions"})
            }
            result.sort((a, b) => {
              const dateA = new Date(a.date.split('-').reverse().join('-'));
              const dateB = new Date(b.date.split('-').reverse().join('-'));
              return dateB - dateA;
            });
            res.status(200).json(result);
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
      
    }
    else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  