import mongoose from 'mongoose';

async function dbConnect(): Promise<typeof mongoose> {
    const MONGODB_URI = process.env.MONGO_URI as string;

    if (!MONGODB_URI) {
        throw new Error('Defina MONGO_URI no arquivo .env');
    }

    let cached = global.mongooseCache;

    if (!cached) {
        cached = global.mongooseCache = { conn: null, promise: null };
    }

    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        cached!.promise = mongoose.connect(MONGODB_URI, {});
    }

    cached!.conn = await cached!.promise;
    return cached!.conn;
}

export default dbConnect;
