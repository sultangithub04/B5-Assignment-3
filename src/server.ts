import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { app } from './app';

dotenv.config()





const port = 5000



async function main() {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log("connnected to mongoose");
        app.listen(port, () => {
            console.log(`server is runnig on port ${port}`);
        })

    } catch (error) {
        console.error("database connection failed", error);
        process.exit(1)
    }
}

main()