const app = require("./app");

const PORT = process.env.PORT || 5004;

app.get("/", (req, res) => {
  console.log("Success");
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
