
export default async function handler(req, res) {
    const uri = process.env.MONGO_URI;
    const { MongoClient, ServerApiVersion } = require('mongodb');

    if(req.method == "POST"){

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });



      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("users"); // Choose a name for your database
      const collection = database.collection("login"); // Choose a name for your collection
      const user = await collection.findOne({email:req.body.email});
      if(user){
        res.status(401).json({error:"User already exists"})
      }
      else{
        const allData = await collection.insertOne(req.body);
        const response = {...req.body}
        delete response.password
        res.status(200).json(response);
      }

        // Send a ping to confirm a successful connection

      } catch(err){
        res.status(500).json({ error: 'Internal server error occured'});
      }
      finally{
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    else{
        res.status(405).json({ error: 'Method not allowed'});
        }


}
  