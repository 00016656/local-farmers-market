const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let products = [
  { id: 1, name: "Fresh Carrots", price: "2.99", image: "carrot.png" },
  { id: 2, name: "Juicy Tomatoes", price: "1.99", image: "tomato.png" },
  { id: 3, name: "Organic Potatoes", price: "3.49", image: "potato.png" },
  { id: 4, name: "Crisp Cabbage", price: "1.50", image: "cabbage.png" },
  { id: 5, name: "Fresh Cucumber", price: "2.00", image: "cucumber.png" },
  { id: 6, name: "Sweet Onion", price: "1.75", image: "onion.png" },
  { id: 7, name: "Ripe Eggplant", price: "3.00", image: "eggplant.png" },
];

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create-product", (req, res) => {
  const { productName, productPrice } = req.body;
  const defaultImage = "vegetables.png";
  products.push({
    id: products.length + 1,
    name: productName,
    price: productPrice,
    image: defaultImage,
  });
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index", { products });
});

app.get("/delete/:productId", (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  products = products.filter((product) => product.id !== productId);
  res.redirect("/");
});

// Removed the routes for editing products

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
