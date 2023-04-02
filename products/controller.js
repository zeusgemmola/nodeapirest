const { object, string, number } = require("yup");
const Products = require("./model");
const { ObjectId } = require("mongodb");

let productSchema = object({
  title: string().required(),
  price: number().required().positive().integer(),
  stock: number().positive().integer(),
  id: number().required().positive().integer(),
});

let productSchemaUpdate = object({
  title: string(),
  price: number().positive().integer(),
  stock: number().positive().integer(),
  id: number().positive().integer(),
});

const cleanObj = (obj) =>
  Object.keys(obj).reduce(
    (acc, curr) => ({
      ...acc,
      ...(obj[curr] !== null && obj[curr] !== undefined
        ? { [curr]: obj[curr] }
        : {}),
    }),
    {}
  );

const read = (db) => async (req, res) => {
  try {
    const collection = db.collection("products");
    const list = await collection.find({}).toArray();
    res.json(list);
  } catch (error) {
    res.status(500).json({ status: 500, message: err && "Erreur serveur" });
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
    } catch (err) {
      res.status(500).json({ message: "Erreur de format", err });
    }
  } catch (err) {
    res.status(403).json({ message: "Erreur de format", err });
  }
};

const readOne = (db) => async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const collection = db.collection("products");
    const product = await collection.findOne({ _id: id });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ status: 404, message: "Produit introuvable" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err && "Erreur serveur" });
  }
};

const update = (db) => async (req, res) => {
  const { body } = req;

  try {
    const id = new ObjectId(req.params.id);
    const parsedProducts = productSchemaUpdate.cast({ ...body });
    const product = new Products({ ...parsedProducts });

    // on supprime les propriétés null et undefined
    const productFiltered = cleanObj(product);

    const collection = db.collection("products");
    const productUpdated = await collection.updateOne(
      { _id: id },
      { $set: { ...productFiltered } }
    );

    res.status(200).json(productUpdated);
  } catch (err) {
    res.status(500).json({ status: 500, message: err && "Erreur serveur" });
  }
};

module.exports = { read, create, readOne, update };
