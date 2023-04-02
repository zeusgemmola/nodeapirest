const { object, string, number } = require("yup");
const Products = require("./model");

let productSchema = object({
  title: string().required(),
  price: number().required().positive().integer(),
  stock: number().positive().integer(),
  id: number().required().positive().integer(),
});

const read = (db) => async (req, res) => {
  try {
    const collection = db.collection("products");
    const list = await collection.find({}).toArray();
    res.json(list);
  } catch (error) {
    res.status(500, err);
  }
};

const create = (db) => async (req, res) => {
  const { body } = req; // on imagine que côté front, un formulaire envoie ces données en post

  try {
    const parsedProducts = productSchema.cast({ ...body });

    const product = new Products({ ...parsedProducts }); // on créé un instance de notre modèle

    try {
      const collection = db.collection("products");
      const result = await collection.insertOne(product);
      res.status(200).json(result);
    } catch (error) {
      res.status(500, err);
    }
  } catch (err) {
    res.status(400).json({ message: "Erreur de format", err });
  }
};

module.exports = { read, create };
