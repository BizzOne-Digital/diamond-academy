require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Course = require('./src/models/Course');

const courses = [
  {
    title: 'Diamond Grading: Fundamentals',
    slug: 'diamond-grading-fundamentals',
    description: 'Beyond Grading Certificates—learn how diamonds are truly assessed through light, structure, and visual intelligence. We teach you what you were never taught to see. This course covers the complete fundamentals of diamond grading including the 4Cs, light performance, and visual evaluation techniques used by professional gemologists.',
    shortDescription: 'Learn how diamonds are truly assessed through light, structure, and visual intelligence.',
    level: 'Beginner',
    price: 399,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
    whatYouLearn: [
      'Understand diamond light performance beyond the 4Cs',
      'Evaluate cut quality using visual intelligence',
      'Read and interpret grading reports accurately',
      'Identify diamond characteristics under magnification',
      'Apply grading skills in a digital marketplace',
      'Spot real value as a buyer, seller, or enthusiast',
    ],
    requirements: ['No prior experience required', 'Basic computer and internet access', 'Willingness to learn visual skills'],
    isActive: true,
    isFeatured: true,
    sessions: [
      {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '7:00 PM',
        timezone: 'EST',
        duration: '90 minutes',
        zoomLink: 'https://zoom.us/j/example1',
        zoomPassword: 'diamond',
      },
      {
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '7:00 PM',
        timezone: 'EST',
        duration: '90 minutes',
        zoomLink: 'https://zoom.us/j/example2',
        zoomPassword: 'diamond',
      },
    ],
  },
  {
    title: 'Diamond Grading: Intelligence',
    slug: 'diamond-grading-intelligence',
    description: 'Designed for learners who already understand the fundamentals, this program builds visual accuracy, consistency, and confidence in applying the 4Cs within today\'s global diamond trade. Applied understanding of the 4Cs in a digital environment.',
    shortDescription: 'Build visual accuracy and confidence applying the 4Cs in today\'s global diamond trade.',
    level: 'Intermediate',
    price: 699,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    whatYouLearn: [
      'Apply 4Cs with professional accuracy in digital environments',
      'Develop consistent grading judgment across stone types',
      'Evaluate diamonds using advanced visual techniques',
      'Understand global market standards and pricing logic',
      'Build confidence for real-world trade situations',
    ],
    requirements: ['Completion of Diamond Grading: Fundamentals or equivalent knowledge', 'Access to Zoom for live sessions'],
    isActive: true,
    isFeatured: true,
    sessions: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@americandiamondacademy.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'admin@americandiamondacademy.com',
        password: 'Admin@12345',
        role: 'admin',
      });
      console.log('✅ Admin user created: admin@americandiamondacademy.com / Admin@12345');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create courses
    for (const courseData of courses) {
      const existing = await Course.findOne({ slug: courseData.slug });
      if (!existing) {
        await Course.create(courseData);
        console.log(`✅ Course created: ${courseData.title}`);
      } else {
        console.log(`ℹ️  Course already exists: ${courseData.title}`);
      }
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log('Admin Login: admin@americandiamondacademy.com / Admin@12345');
    console.log('⚠️  Change the admin password after first login!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
