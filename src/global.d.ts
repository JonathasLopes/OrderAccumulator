import mongoose from "mongoose";

export {};

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;

    var limit: number;
}