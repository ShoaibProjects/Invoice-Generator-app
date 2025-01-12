import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import invoiceRoutes from './routes/invoiceRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
//   origin: 'http://localhost:5173',  // Frontend URL
  origin: ['https://invoice-generator-app-assignment.vercel.app'],
}));
app.use(json());


// MongoDB connection
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.use('/api', async(req,res)=>{
    res.send('hmm')
});

// // Serve static files from the 'build' directory for frontend
// app.use(express.static(path.join(__dirname, 'dist')));

// // Catch-all handler for any route not matching the API, serve the frontend React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   });

app.get('*', (req,res)=>{
  res.send('ok5')
})

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;
