const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors'); // Import cors
const authRoute = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();


const app = express();

// Enable CORS for all routes
app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan('dev'));  // Logging middleware

// MongoDB connection
mongoose.connect('mongodb+srv://ECSDB:ECS-Project@cluster.8szfy.mongodb.net/Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoute);               // Admin routes
app.use('/api/patients', patientRoutes);        // Patient routes
app.use('/api/prescriptions', prescriptionRoutes); // Prescription routes
app.use('/api/reports', reportRoutes);          // Report routes
app.use('/api/health', healthRoutes);          // Health routes
// Error handling middleware
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
