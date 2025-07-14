import express from 'express';
import dotenv from 'dotenv';
import averageRoute from './routes/averageRoute';
import { loggingMiddleware } from './middlewares/loggingmiddleware';
import urlRoutes from "./routes/urlRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(loggingMiddleware);
app.use(urlRoutes);
app.use('/api', averageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
