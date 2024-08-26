// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const uri = process.env.MONGO_URI;
  const { MongoClient, ServerApiVersion,ObjectId } = require("mongodb");

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
        name: req.query.name.toLowerCase(),
        
      }).sort({ date: -1 }).toArray();
      user.reverse()
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Internal server error occured" });
    } finally {
      await client.close();
    }
  }

  if(req.method === "DELETE"){
    try {
      await client.connect();
      const database = client.db("appointment");
      const collection = database.collection("appointment");
      
      const id=new ObjectId(req.query.id)
      const user = await collection.deleteOne({
        _id:id
      })
      res.status(200).json({message:"Appointment cancelled successfully"});
    } catch (err) {
      res.status(500).json({ error: "Internal server error occured" });
    } finally {
      await client.close();
    }
  }

  if(req.method === "POST"){
    try {
      await client.connect();
      const database = client.db("appointment");
      const collection = database.collection("appointment");

      const { date, time,email } = req.body;
      const count = await collection.countDocuments({
        date,
        time,
        email
      });
      if (count >= 10) {
        res.status(400).json({ error: "Time slot is fully booked" });
      } else {
        const user = await collection.insertOne(req.body);
        res.status(200).json({ message: "Appointment Added successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error occured" });
    } finally {
      await client.close();
    }
  }
}
