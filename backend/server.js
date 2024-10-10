require("dotenv").config();
const express = require('express');
const cors=require("cors")
const connectDb = require("./utils/db");
const multer = require('multer');
const path = require('path');
const authRoute=require("./routers/auth-router")
const adminRoute=require("./routers/admin-router")
const contactRoute=require("./routers/contact-router")
const errorMiddleware=require("./middlewares/error-middleware")
const app = express()

app.use(express.json());

//for only connection
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

 
// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//for login and register
app.use("/api/auth", authRoute)

//for admin
app.use("/api/admin",adminRoute)

//for contact
app.use("/api/form",contactRoute);

//error middleware
app.use(errorMiddleware);

const PORT = 3000;
connectDb().then(()=>{
    app.listen(PORT, () => {
      console.log(`app run on ${PORT} port `)
    })
})