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
  
    if (req.method === "POST") {
      try {
        await client.connect();
        const database = client.db("appointment");
        const collection = database.collection("appointment");


        const date=req.body.date;
        const email=req.body.email;
        let obj = {}
        for (const [key,value] of Object.entries(req.body.time[0])) {
            var time = value;
            const slots = await collection.countDocuments({email,date,time})
            console.log(date,time)
            obj[time] = 10-slots;
          }
          res.status(200).json(obj)
      }catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error occured" });
      } finally {
        await client.close();
      }
    }
    
}