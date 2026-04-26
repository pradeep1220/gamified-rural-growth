const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/users',       require('./routes/userRoutes'));
app.use('/api/courses',     require('./routes/courseRoutes'));
app.use('/api/lessons',     require('./routes/lessonRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/progress',    require('./routes/progressRoutes'));
app.use('/api/comments',    require('./routes/commentRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/youtube',     require('./routes/youtubeRoutes'));
app.use('/api/admin',       require('./routes/adminRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'EduFlow LMS API Running ✅' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 LMS Server running on port ${PORT}`));
