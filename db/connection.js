import mongoose from "mongoose";

const db = process.env.DATABASE;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connection is Established');
    }).catch((err) => {
        console.log('Error: ', err);
    });