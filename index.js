import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js';
import purokRoutes from './routes/itemRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';
import infantRoutes from './routes/infantRoutes.js';
import healthworkerRoutes from './routes/healthworkerRoutes.js';
import vaccinationRoutes from './routes/vaccinationRoutes.js';

dotenv.config();




const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/purok', purokRoutes);
app.use('/api/infant', infantRoutes);
app.use('/api/vaccine', vaccineRoutes);
app.use('/api/health', healthworkerRoutes);
app.use('/api/vaccination', vaccinationRoutes);



app.listen(PORT, '0.0.0.0', () => {
    console.log('Gaganassss');
    console.log(`Server running on port http://localhost:${PORT}`);
  });
