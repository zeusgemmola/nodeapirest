const read = (db) => async (req, res) => {
  const collection = db.collection("products");
  const list = await collection.find({}).toArray();
  res.json(list);
};

module.exports = { read };
