import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import snowflake from "snowflake-sdk";
const { createConnection } = snowflake;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = createConnection({
  account: "mhglgms-ib59390",
  username: "RAJU",
  password: "Raju@123",
  database: "RADIATOR",
  schema: "",
  warehouse: "COMPUTE_WH",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

con.connect((err, conn) => {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connected");
  }
});
app.post("/contactus", (req, res) => {
  const details = req.body;
  console.log("details", details);
  const insertContactDetailsQuery = `INSERT INTO CUSTOMER(NAME, EMAIL, PHONE, MESSAGE) 
    VALUES (?, ?, ?, ?)`;

  const insertContactDetails = [
    `${details.name}`,
    details.email,
    details.phone,
    details.message,
  ];

  con.execute({
    sqlText: insertContactDetailsQuery,
    binds: insertContactDetails,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Error inserting employee: ${err.message}`);
        return res.status(500).json({ Error: "Insert employee error in SQL" });
      }
      return res.json({ Status: "Success" });
    },
  });
});

app.get("/getContactus", (req, res) => {
  const sql = "SELECT * FROM CUSTOMER";
  con.execute({
    sqlText: sql,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Get customer error in SQL" });
      }
      return res.json({ Status: "Success", Result: rows });
    },
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM ADMIN WHERE email = ? AND password = ?";
  con.execute({
    sqlText: sql,
    binds: [req.body.email, req.body.password],
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Status: "Error", Error: "Error in running query" });
      }
      if (rows.length > 0) {
        const id = rows[0].ID;
        const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        return res.json({ Status: "Success" });
      } else {
        return res.json({ Status: "Error", Error: "Wrong Email or Password" });
      }
    },
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen(8081, () => {
  console.log("Running");
});
