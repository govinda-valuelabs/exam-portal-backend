import { connect } from "mongoose";

export default class MongoDB {
    connection;
    connect() {
        try {
            this.connection = connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
            return this.connection
        } catch (error) {
            throw new Error('Invalid connection URI!');
        }
    }
    disconnect() {
        this.connection.close();
    }
}