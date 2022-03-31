const mongoose = require('mongoose');
const fs = require('fs')
const Product = require('../Models/productModel');
const Review = require('../Models/reviewModel');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const DB =  process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
 mongoose.connect(DB).then(()=> console.log('DB connection successful!'));


 
// READ JSON FILE
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const importData = async () => {
    try {
      await Product.create(products);
      // await Review.create(reviews);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  // DELETE ALL DATA FROM DB
  const deleteData = async () => {
    try {
      // await Review.deleteMany();
      await Product.deleteMany();
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  


  console.log(process.argv);

  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
  