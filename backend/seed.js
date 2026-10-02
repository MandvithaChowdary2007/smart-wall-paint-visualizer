require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Color = require('./models/Color');
const Product = require('./models/Product');

const colors = [
  {name:'Sunset Clay',shade:'Terracotta',hex:'#C85C3A',category:'Earthy',finish:'Matt',coverage:110,price:899,rating:4.8},
  {name:'Mango Pop',shade:'Golden Yellow',hex:'#F6B51D',category:'Bold',finish:'Satin',coverage:120,price:799,rating:4.7},
  {name:'Monsoon Blue',shade:'Cobalt',hex:'#2457C5',category:'Cool',finish:'Matt',coverage:105,price:949,rating:4.9},
  {name:'Neem Leaf',shade:'Fresh Green',hex:'#5C8D45',category:'Earthy',finish:'Matt',coverage:115,price:849,rating:4.6},
  {name:'Lotus Blush',shade:'Soft Coral',hex:'#F39B8D',category:'Pastel',finish:'Eggshell',coverage:115,price:999,rating:4.8},
  {name:'Ivory Mist',shade:'Warm Neutral',hex:'#E9DFC9',category:'Neutral',finish:'Matt',coverage:120,price:749,rating:4.7},
  {name:'Lavender Sky',shade:'Lavender',hex:'#B9A6D9',category:'Pastel',finish:'Satin',coverage:110,price:899,rating:4.5},
  {name:'Royal Plum',shade:'Luxury Purple',hex:'#653D78',category:'Luxury',finish:'Silk',coverage:100,price:1299,rating:4.9}
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const adminPass = await bcrypt.hash('Admin@12345',12);
  const userPass = await bcrypt.hash('User@12345',12);
  await User.findOneAndUpdate({email:'admin@smartpaint.local'},
    {name:'Smart Paint Admin',email:'admin@smartpaint.local',password:adminPass,role:'Admin'}, {upsert:true});
  await User.findOneAndUpdate({email:'user@smartpaint.local'},
    {name:'Demo User',email:'user@smartpaint.local',password:userPass,role:'User'}, {upsert:true});
  await Color.deleteMany({});
  await Color.insertMany(colors);
  await Product.deleteMany({});
  await Product.insertMany(colors.map((c,i)=>({...c,name:`${c.name} Interior Paint`,stock:50+i*5,description:'Premium interior wall paint designed for Indian homes.'})));
  console.log('Seed complete');
  await mongoose.disconnect();
})();
