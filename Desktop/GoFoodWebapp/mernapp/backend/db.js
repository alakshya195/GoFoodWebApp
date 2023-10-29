const mongoose = require('mongoose');
const mongoURI = ; //add your own URL

const connectToMongoDB = async () => {
    // try {
    //     await mongoose.connect(mongoURI);
    //     console.log('Connected!');
    //     const fetched_data = mongoose.connection.db.collection("food_items");
    //     const data=await fetched_data.find({}).toArray()
    //      const foodCategory = mongoose.connection.db.collection("foodCategory");
    //      const catData =await foodCategory.find({}).toArray();
    //     global.foodCategory = catData;
    //     console.log( "foodCategory:", global.foodCategory);
    //     global.food_items = data;
        // console.log(global.food_items)

    //   } catch (error) {
    //     console.log('err: ', error);
    //   }


    await mongoose.connect(mongoURI, {useNewURLParser: true} , async (err,result)=>{
        if(err) console.log("---" , err)
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err, data){
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(async function(err, catData){
                     if(err) console.log(err);
                     else{ 
                        global.food_items = data;
                        global.food_category = catData;
                        // console.log( "foodCategory:", global.food_category);
                    }
                    
                })


            })
        }
    })
};

module.exports = connectToMongoDB;

