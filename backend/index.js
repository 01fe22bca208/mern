// const express = require('express')
// const app = express()
// const port = 6000
// const mongoDB=require("./db")
// mongoDB();


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(express.json())
// app.use('/api',require("./Routes/CreateUser"));


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const { connectToMongo } = require('./db'); // Import the connectToMongo function from db.js
const createuserRouter = require('./Routes/CreateUser');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB before starting the server
connectToMongo();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    
    "Access-Control-Allow-Headers",
    "Origin ,X-Requested-With,Content-Type,Accept"
  )
  next();
})
// Middleware
app.use(express.json());

// Routes
app.use('/api', createuserRouter);
app.use('/api',require("./Routes/DisplayData"));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


