import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://nextprocject:3Q5PmRJp1WInqkki@cluster0.ob1krgr.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsColletion = db.collection("meetups");

    const result = await meetupsColletion.insertOne(data);

    res.status(201).json({ message: "Meetup inserted" });
    client.close();
  }
}
