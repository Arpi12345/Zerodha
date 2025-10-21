require('dotenv'). config();

const express = require("express");
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {HoldingsModel} = require('./models/HoldingsModel');
const {  PositionsModel } = require('./models/PositionsModel');
const { OrdersModel,OrderSellModel } = require('./models/OrdersModel');
const { UserModel } = require('./models/UserModel');
const  SignupSchema  = require("./Validators/ValidatorSignup");
const validate = require("./middlewares/validateSingup-middleware");
const LoginSchema  = require("./Validators/validatorLogin");
const validate1 = require("./middlewares/validateLogin-middleware");
const authenticate = require("./middlewares/Authenticate");





const bcrypt = require("bcryptjs");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const errorMiddleware = require('./middlewares/error-middleware');
const { email } = require('zod');





app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

const url = process.env.MONGO_URL;
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use(bodyParser.json());
app.use(cookieParser());





// app.get("/addholdings",(req, res) =>{
//     let holdings = [
      
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
    

//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
  
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
    
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
 
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
  
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",

//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
   
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
  
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
    
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
  
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,

//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
  
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",

//   },
//   ]

//   holdings.forEach((item) =>{
//    let  newHoldings = new HoldingsModel({
//     name: item.name,
//     qty: item.qty,
//     avg: item.avg,
//     price: item.price,
//     net: item.net,
//     day: item.day,
//     username:item.username,

//    });
//    newHoldings.save();

//   });
//      res.send("Done!");

// });

// app.get("/addPositions",async (req,res) =>{
//     let positions =  [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
// positions.forEach((item) =>{
//     let newposition = new PositionsModel({
//     product: item.product,
//     name:item.name,
//     qty: item.qty,
//     avg: item.avg,
//     price: item.price,
//     net: item.net,
//     day: item.day,
//     isLoss: item.isLoss,
//     });

//     newposition.save();
// });

// res.send("data added!");

// });

app.get("/allHoldings", async (req , res) =>{
  try{
    const  allHoldings = await HoldingsModel.find({});
    console.log(allHoldings);
    res.send(allHoldings);
  }catch(error){
    res.status(500).json({error : error.message});
  }
});

app.get("/allPositions", async (req , res) =>{
    let allPositions = await PositionsModel.find({});
    res.send(allPositions);
});



app.post("/Orders", async (req , res) =>{

    let newOrder = new OrdersModel({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    mode: req.body.mode,
    username:req.body.username,
  
    });

  await  newOrder.save();
    res.send("new order saved!");
});
app.get("/neworders", async (req, res) =>{
  let newOrders =  await OrdersModel.find({}); 
  res.send(newOrders);
});

app.post("/OrderSells", async (req, res) => {
  try {
    const newSellOrder = new OrderSellModel({
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      mode: req.body.mode,
      username: req.body.username,
       cheque:req.body.cheque,
    });

    await newSellOrder.save();
    console.log("Sell order saved:", newSellOrder);
    res.status(201).send("Sell order saved!");
  } catch (error) {
    console.error("Error saving sell order:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/neworderSells", async (req, res) =>{
  let newOrders =  await OrderSellModel.find({}); 
  res.send(newOrders);
});



app.post("/signup",validate(SignupSchema), async (req, res) =>{
  try{
let userExist = await UserModel.findOne({email:req.body.email});
if(userExist){
  return res.status(400).json("user already exist !");
}
// const saltRound = 10;
// const hash_password = await bcrypt.hash(req.body.password, saltRound);
 let newUser =   new UserModel({
 email:req.body.email,
 username: req.body.username,
 password:req.body.password,
 isAdmin: true,
 });

 await newUser.save();
 return res.status(201).json({msg: "registration successful", token: await newUser.generateToken() , userId: newUser._id.toString(),})
 

 
}catch(error){
 console.error("Signup error:", error);
  res.status(500).json({ message: "Internal server error", error: error.message });
}
});

app.post("/login", validate1(LoginSchema),  async (req, res) =>{
  try {
    let {email, password} = req.body;
    const userExist = await UserModel.findOne({email: email});
    console.log(userExist);
  

    if(!userExist){
     return res.status(400).json({message:"Invalid  Credentials"});
    }
     console.log("User authenticated:", userExist.username);
    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.compare_password(password);
    if( !user){
      return res.status(401).json({message:"Invalid email or password"});
    }

      const token = jwt.sign(
      {
        username: userExist.username,
        userId: userExist._id.toString()
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

   
    return res.status(200).json({
      message: "Login successful",
      token,
      userId: userExist._id.toString(),
      username: userExist.username,
      isAdmin: userExist.isAdmin,
    });
  } catch (error) {
  console.error("Login error:", error.stack);
  res.status(500).json({
    message: "Internal server error",
    error: error.message
  });
}
});


app.get("/userByuOrders",  authenticate,  async (req, res) => {
try {
    console.log("Decoded user:", req.user);
    const { username } = req.user;
  
   const userHoldings = await OrdersModel.find({username: username});
  
  res.status(200).json(userHoldings);
} catch (error) {
  console.error("DB query failed:", error.stack);
  res.status(500).json({ error: "Internal server error" });
}
});

app.get("/userSellOrders", authenticate,  async (req, res) => {
try {
    console.log("Decoded user:", req.user);
  const { username } = req.user;
   const userHoldings = await OrderSellModel.find({username: username});
  
  res.status(200).json(userHoldings);
} catch (error) {
  console.error("DB query failed:", error.stack);
  res.status(500).json({ error: "Internal server error" });
}
});







app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>{
    console.log("app started !");
    mongoose.connect(url);
    console.log("DB Started!");
});