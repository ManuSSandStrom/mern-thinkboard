import express from "express";
import notesRoutes from "../src/routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
}));
app.use(express.json()); // Middleware to parse JSON bodies

app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});