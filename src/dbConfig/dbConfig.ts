import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log('MongoDB connect success')
        })

        connection.on('error', (err) => {
            console.log('MongoDB conncet erro. ' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something wrong');
        console.log(error);
    }
}