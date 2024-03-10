// const mongoose = require('mongoose');
// const mongoURI='mongodb+srv://gofood:gofood@cluster0.oyfhtua.mongodb.net/gofoodmern?retryWrites=true&w=majority'

// const mongoDB = async()=>{

//      await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{

//       if (err)console.log(err)
//       else{
//             console.log("connected");
//             const feached_data=await mongoose.connection.db.collection("food_items");
//             feached_data.find({}).toArray(function(err,data){
//                if(err) console.log(err);
//                else console.log(data);
//             })
         
         
         
         
         
//          }





//      });
     


//      .then(()=>{
//       console.log("connected")
     
    
         

    
        
            
            
//         })

//         const feached_data= await mongoose.connection.db.collection("food_items");
//         console.log("CCCCCCc")
//         feached_data.find({}).toArray(function(err,data){
  
  
  
  
  
//            if(err)console.log(err);
//            else console.log(data)
  
  
  
  
  
//            })
     
        
       

     
//      .catch((err)=>{
//         console.log(err)})
    
// }
    


// module.exports=mongoDB;

// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.oyfhtua.mongodb.net/gofoodmern?retryWrites=true&w=majority';

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//     console.log("Connected to MongoDB");

//     const collection = mongoose.connection.db.collection("food_items");
//     const data = await collection.find({}).toArray();

//     console.log("Fetched data:");
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     // Close the connection
//     await mongoose.connection.close();
//   }
// };

// module.exports = mongoDB;

//  --------------------

// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.oyfhtua.mongodb.net/gofoodmern?retryWrites=true&w=majority';

// // Connect to MongoDB and export the connection
// const connectToMongo = async () => {
//   await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//   console.log("Connected to MongoDB");
//   const feached_data =await mongoose.connection.db.collection("food_items");
//   feached_data.find({}).toArray(async function(err,data){
      
        
  
//   //  global.food_items=data;
//     // console.log("Fetched data:",global.food_items);
//     const foodCategory=await mongoose.connection.db.collection("foodCategory");
//     foodCategory.find({}).toArray(function (err,catData){
//      if(err) {console.log(err);}
//      else{
//       global.food_items=data;
//       global.foodCategory=catData;

//      }
//     })




//   })
// };

// module.exports = { connectToMongo };
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.oyfhtua.mongodb.net/gofoodmern?retryWrites=true&w=majority';

// Connect to MongoDB and export the connection
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    if (data && catData) {
      global.food_items = data;
      global.foodCategory = catData;
      console.log("Fetched data:", global.food_items);
      console.log("Fetched categories:", global.foodCategory);
    } else {
      console.log("Error fetching data from MongoDB.");
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    // Handle the error as needed
  }
};

module.exports = { connectToMongo };


