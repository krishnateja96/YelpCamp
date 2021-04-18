const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60756a363748711b300400fb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident magni, nostrum adipisci nemo porro itaque sequi, iste maxime laboriosam, nesciunt unde. Sapiente sit id repellat officiis perspiciatis dolorum quos voluptate?',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude 
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dle406lly/image/upload/v1618646332/YelpCamp/sk0jfmzsz5uywif6jlg6.jpg',
                    filename: 'YelpCamp/sk0jfmzsz5uywif6jlg6'
                },
                {
                    url: 'https://res.cloudinary.com/dle406lly/image/upload/v1618646333/YelpCamp/ybbyoxoqembj3bof09xi.jpg',
                    filename: 'YelpCamp/ybbyoxoqembj3bof09xi'
                }]
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});