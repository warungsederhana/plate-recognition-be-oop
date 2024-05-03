const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3344;
dotenv.config();

// const seedersRoutes = require("./routes/seeder.route");
// const userRoutes = require("./routes/user.route");
const mainRoutes = require("./routes/main.route");
const authRoutes = require("./routes/auth.route");
const kendaraanRoutes = require("./routes/kendaraan.route");
const negaraAsalRoutes = require("./routes/negaraAsal.route");
const merekKendaraan = require("./routes/merekKendaraan.route");
const jenisKendaraan = require("./routes/jenisKendaraan.route");
const typeKendaraan = require("./routes/typeKendaraan.route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Hello World!",
  });
});

// app.use("/api/seeder", seedersRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/main", mainRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/kendaraan", kendaraanRoutes);
app.use("/api/negara-asal", negaraAsalRoutes);
app.use("/api/merek-kendaraan", merekKendaraan);
app.use("/api/jenis-kendaraan", jenisKendaraan);
app.use("/api/type-kendaraan", typeKendaraan);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
