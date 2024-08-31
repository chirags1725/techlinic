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
      
//       const today = new Date();
// const dd = String(today.getDate()).padStart(2, '0');
// const mm = String(today.getMonth() + 1).padStart(2, '0');
// const yyyy = today.getFullYear();

// const todayDate = `${dd}-${mm}-${yyyy}`;

const query = {
  email: req.body.email,
};

if (req.body.date) {
  query.date = req.body.date;
}
      const user = await collection.find(query).sort({ date: 1 }).toArray();

      user.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB - dateA;
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Internal server error occured" });
    } finally {
      await client.close();
    }
  }
}