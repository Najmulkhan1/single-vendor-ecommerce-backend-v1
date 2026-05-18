import { Server } from "node:http";
import app from "./app.js";
import env from "./config/env.js";



let server: Server;

const startServer = async () => {

    try {
        server = app.listen(env.port, () => {
        console.log(`Server is running on port ${env.port}`);
    })
    } catch (error) {
        console.error("Error starting server:", error);
    }
    
}

(async () => {
    await startServer()
})()
