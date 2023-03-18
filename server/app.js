import express from 'express';
import fileUpload from 'express-fileupload';
import moviesRoutes from './routes/movies.routes.js';

const app = express();

// middleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

// routes
app.use(moviesRoutes)

export default app