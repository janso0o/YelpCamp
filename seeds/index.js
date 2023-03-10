const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '63fa2f1f407c26307499b9eb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/190727/',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni nesciunt quo labore ex repellendus a nostrum aliquid ducimus. Beatae quos enim deserunt sint, ab ipsam rerum sapiente eum voluptas repellendus?',
            price: randomPrice
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})