require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_enterprise');
  console.log('✅ Connected to MongoDB');
};

const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const { Enrollment, Progress, Assignment } = require('./models/index');

async function seed() {
  await connectDB();

  // Clear existing data
  await Promise.all([User.deleteMany(), Course.deleteMany(), Lesson.deleteMany(), Enrollment.deleteMany(), Progress.deleteMany(), Assignment.deleteMany()]);
  console.log('🗑️  Cleared existing data');

  // Create Users
  const users = await User.create([
    { name: 'Admin User', email: 'admin@lms.com', password: 'admin123', role: 'admin' },
    { name: 'Sarah Johnson', email: 'instructor@lms.com', password: 'instructor123', role: 'instructor', bio: 'Full-stack developer with 10 years of experience.' },
    { name: 'Alex Kumar', email: 'instructor2@lms.com', password: 'instructor123', role: 'instructor', bio: 'Data scientist and ML engineer.' },
    { name: 'John Learner', email: 'learner@lms.com', password: 'learner123', role: 'learner' },
    { name: 'Priya Singh', email: 'learner2@lms.com', password: 'learner123', role: 'learner' },
  ]);
  console.log(`✅ Created ${users.length} users`);

  const instructor = users.find(u => u.role === 'instructor');
  const instructor2 = users.find(u => u.email === 'instructor2@lms.com');
  const learner = users.find(u => u.email === 'learner@lms.com');
  const learner2 = users.find(u => u.email === 'learner2@lms.com');

  // Create Courses
  const courses = await Course.create([
    {
      title: 'Complete React Developer Course 2024',
      description: 'Learn React from scratch to advanced concepts including Hooks, Context API, Redux, and building real-world projects.',
      instructorId: instructor._id,
      category: 'Web Development',
      level: 'Intermediate',
      tags: ['React', 'JavaScript', 'Frontend'],
      isPublished: true,
      enrollmentCount: 0,
    },
    {
      title: 'Node.js & Express.js Masterclass',
      description: 'Build scalable backend APIs using Node.js, Express, MongoDB, and JWT authentication.',
      instructorId: instructor._id,
      category: 'Web Development',
      level: 'Intermediate',
      tags: ['Node.js', 'Express', 'Backend', 'API'],
      isPublished: true,
      enrollmentCount: 0,
    },
    {
      title: 'Python for Data Science & Machine Learning',
      description: 'Master Python for data analysis, visualization, and machine learning with real datasets.',
      instructorId: instructor2._id,
      category: 'Data Science',
      level: 'Beginner',
      tags: ['Python', 'ML', 'Data Science'],
      isPublished: true,
      enrollmentCount: 0,
    },
    {
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of user interface and user experience design using Figma and modern design systems.',
      instructorId: instructor2._id,
      category: 'Design',
      level: 'Beginner',
      tags: ['Design', 'Figma', 'UI', 'UX'],
      isPublished: true,
    },
  ]);
  console.log(`✅ Created ${courses.length} courses`);

  // Create Lessons
  const reactCourse = courses[0];
  const nodeCourse = courses[1];

  const lessons = await Lesson.create([
    // React Course Lessons
    { courseId: reactCourse._id, title: 'Introduction to React', type: 'youtube', youtubeVideoId: 'Ke90Tje7VS0', contentUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0', duration: 45, order: 1 },
    { courseId: reactCourse._id, title: 'JSX and Components', type: 'youtube', youtubeVideoId: 'w7ejDZ8SWv8', contentUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8', duration: 30, order: 2 },
    { courseId: reactCourse._id, title: 'React Hooks - useState & useEffect', type: 'youtube', youtubeVideoId: 'O6P86uwfdR0', contentUrl: 'https://www.youtube.com/embed/O6P86uwfdR0', duration: 40, order: 3 },
    { courseId: reactCourse._id, title: 'React Router & Navigation', type: 'youtube', youtubeVideoId: 'Law7wfdg2NI', contentUrl: 'https://www.youtube.com/embed/Law7wfdg2NI', duration: 35, order: 4 },
    { courseId: reactCourse._id, title: 'State Management with Context API', type: 'youtube', youtubeVideoId: 'HYKDUF8X3qI', contentUrl: 'https://www.youtube.com/embed/HYKDUF8X3qI', duration: 50, order: 5 },
    // Node Course Lessons
    { courseId: nodeCourse._id, title: 'Node.js Fundamentals', type: 'youtube', youtubeVideoId: 'TlB_eWDSMt4', contentUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: 60, order: 1 },
    { courseId: nodeCourse._id, title: 'Building REST APIs with Express', type: 'youtube', youtubeVideoId: '-MTSQjw5DrM', contentUrl: 'https://www.youtube.com/embed/-MTSQjw5DrM', duration: 55, order: 2 },
    { courseId: nodeCourse._id, title: 'MongoDB & Mongoose Integration', type: 'youtube', youtubeVideoId: 'ExcRbA7fy_A', contentUrl: 'https://www.youtube.com/embed/ExcRbA7fy_A', duration: 45, order: 3 },
  ]);
  console.log(`✅ Created ${lessons.length} lessons`);

  // Enroll learners
  await Enrollment.create([
    { userId: learner._id, courseId: reactCourse._id },
    { userId: learner._id, courseId: nodeCourse._id },
    { userId: learner2._id, courseId: reactCourse._id },
    { userId: learner2._id, courseId: courses[2]._id },
  ]);
  await Course.findByIdAndUpdate(reactCourse._id, { enrollmentCount: 2 });
  await Course.findByIdAndUpdate(nodeCourse._id, { enrollmentCount: 1 });
  await Course.findByIdAndUpdate(courses[2]._id, { enrollmentCount: 1 });
  console.log('✅ Created enrollments');

  // Create some progress
  const reactLessons = lessons.filter(l => l.courseId.toString() === reactCourse._id.toString());
  await Progress.create({
    userId: learner._id, courseId: reactCourse._id,
    completedLessons: reactLessons.slice(0, 3).map(l => l._id),
    completionPercentage: 60,
    lastAccessedLesson: reactLessons[2]._id,
  });
  await Progress.create({ userId: learner._id, courseId: nodeCourse._id, completedLessons: [], completionPercentage: 0 });
  console.log('✅ Created progress data');

  // Create Assignments
  await Assignment.create([
    {
      courseId: reactCourse._id, instructorId: instructor._id,
      title: 'Build a Todo App with React Hooks',
      description: 'Create a fully functional Todo application using React Hooks (useState, useEffect). Include add, delete, and toggle completion features.',
      type: 'assignment', totalMarks: 100,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      courseId: reactCourse._id, instructorId: instructor._id,
      title: 'React Fundamentals Quiz',
      description: 'Test your understanding of React core concepts.',
      type: 'quiz', totalMarks: 50,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      questions: [
        { questionText: 'What hook is used to manage state in React?', options: ['useEffect', 'useState', 'useContext', 'useRef'], correctAnswer: 1, marks: 10 },
        { questionText: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Script Extension', 'JSON XML', 'JavaScript X'], correctAnswer: 0, marks: 10 },
        { questionText: 'Which method is used to perform side effects in React?', options: ['useState', 'useContext', 'useEffect', 'useMemo'], correctAnswer: 2, marks: 10 },
        { questionText: 'Props in React are:', options: ['Mutable', 'Immutable', 'Optional always', 'State variables'], correctAnswer: 1, marks: 10 },
        { questionText: 'React was developed by?', options: ['Google', 'Microsoft', 'Facebook/Meta', 'Twitter'], correctAnswer: 2, marks: 10 },
      ],
    },
    {
      courseId: nodeCourse._id, instructorId: instructor._id,
      title: 'Build a REST API with Authentication',
      description: 'Create a complete REST API with user registration, login using JWT, and CRUD operations for a resource of your choice.',
      type: 'assignment', totalMarks: 100,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  ]);
  console.log('✅ Created assignments');

  console.log('\n🎉 Database seeded successfully!\n');
  console.log('Demo Accounts:');
  console.log('  👨‍💼 Admin:      admin@lms.com      / admin123');
  console.log('  👨‍🏫 Instructor: instructor@lms.com / instructor123');
  console.log('  🎓 Learner:    learner@lms.com    / learner123\n');

  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1); });
