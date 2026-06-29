import { PrismaClient, Role, CourseType, CourseLevel, EnrollmentStatus, EvaluationType, ArabicGrade, BlogCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

async function main() {
  console.log('🌱 Starting seed...');

  // ── 1. Create Super Admin ──────────────────────
  const superadmin = await prisma.user.upsert({
    where: { email: 'admin@qlms.com' },
    update: { passwordHash: hashPassword('admin123') },
    create: {
      email: 'admin@qlms.com',
      passwordHash: hashPassword('admin123'),
      name: 'Super Admin',
      role: Role.SUPERADMIN,
      country: 'USA',
    },
  });
  console.log(`✅ Super Admin created: ${superadmin.email}`);

  // ── 2. Create Teachers ─────────────────────────
  const teachersData = [
    { name: 'Sheikh Ahmad', email: 'ahmad@qlms.com', country: 'Egypt', specialisations: ['Tajweed', 'Hifz'], years: 10 },
    { name: 'Ustadh Omar', email: 'omar@qlms.com', country: 'Jordan', specialisations: ['Arabic_Language', 'Islamic_Studies'], years: 5 },
    { name: 'Ustadha Fatima', email: 'fatima@qlms.com', country: 'UK', specialisations: ['Quran_Reading', 'Tajweed'], years: 8 },
    { name: 'Sheikh Abdullah', email: 'abdullah@qlms.com', country: 'Saudi Arabia', specialisations: ['Hifz', 'Tajweed'], years: 15 },
    { name: 'Ustadha Aisha', email: 'aisha@qlms.com', country: 'Pakistan', specialisations: ['Quran_Reading', 'Islamic_Studies'], years: 6 },
  ];

  const teachers = [];
  for (const t of teachersData) {
    const user = await prisma.user.upsert({
      where: { email: t.email },
      update: { passwordHash: hashPassword('teacher123') },
      create: {
        email: t.email,
        passwordHash: hashPassword('teacher123'),
        name: t.name,
        role: Role.TEACHER,
        country: t.country,
        teacherProfile: {
          create: {
            bio: `Experienced teacher from ${t.country} specializing in ${t.specialisations.join(' and ')}.`,
            specialisations: t.specialisations,
            yearsExperience: t.years,
            rating: 4.8 + Math.random() * 0.2, // Random rating between 4.8 and 5.0
            studentCount: Math.floor(Math.random() * 50) + 10,
            isApproved: true,
          }
        }
      },
    });
    teachers.push(user);
  }
  console.log(`✅ ${teachers.length} Teachers created`);

  // ── 3. Create Courses ──────────────────────────
  const coursesData = [
    { title: 'Quran Reading for Beginners', slug: 'quran-reading-beginners', type: CourseType.QURAN_READING, level: CourseLevel.BEGINNER, price: 50 },
    { title: 'Mastering Tajweed Rules', slug: 'mastering-tajweed', type: CourseType.TAJWEED, level: CourseLevel.INTERMEDIATE, price: 80 },
    { title: 'Intensive Hifz Program', slug: 'intensive-hifz', type: CourseType.HIFZ, level: CourseLevel.ADVANCED, price: 100 },
    { title: 'Conversational Arabic', slug: 'conversational-arabic', type: CourseType.ARABIC_LANGUAGE, level: CourseLevel.BEGINNER, price: 60 },
    { title: 'Advanced Arabic Grammar', slug: 'advanced-arabic-grammar', type: CourseType.ARABIC_LANGUAGE, level: CourseLevel.ADVANCED, price: 90 },
    { title: 'Introduction to Islamic Studies', slug: 'intro-islamic-studies', type: CourseType.ISLAMIC_STUDIES, level: CourseLevel.BEGINNER, price: 40 },
    { title: 'Quran Memorization for Kids', slug: 'hifz-kids', type: CourseType.HIFZ, level: CourseLevel.BEGINNER, price: 70 },
    { title: 'Advanced Tajweed and Qiraat', slug: 'advanced-tajweed', type: CourseType.TAJWEED, level: CourseLevel.ADVANCED, price: 120 },
  ];

  const courses = [];
  for (const [index, c] of coursesData.entries()) {
    // Assign 1 or 2 random teachers to each course
    const assignedTeachers = [teachers[index % teachers.length]];
    if (index % 2 === 0) {
      assignedTeachers.push(teachers[(index + 1) % teachers.length]);
    }

    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title,
        slug: c.slug,
        description: `This is a comprehensive course on ${c.title}. Ideal for ${c.level} level students.`,
        type: c.type,
        level: c.level,
        price: c.price,
        isPublished: true,
        enrolledCount: Math.floor(Math.random() * 100) + 20,
        rating: 4.5 + Math.random() * 0.5,
        totalRatings: Math.floor(Math.random() * 50) + 10,
        teachers: {
          connect: assignedTeachers.map(t => ({ userId: t.id }))
        }
      },
    });
    courses.push(course);
  }
  console.log(`✅ ${courses.length} Courses created`);

  // ── 4. Create Students & Enrollments ───────────
  const students = [];
  for (let i = 1; i <= 15; i++) {
    const user = await prisma.user.upsert({
      where: { email: `student${i}@qlms.com` },
      update: { passwordHash: hashPassword('student123') },
      create: {
        email: `student${i}@qlms.com`,
        passwordHash: hashPassword('student123'),
        name: `Student ${i}`,
        role: Role.STUDENT,
        country: ['USA', 'UK', 'Canada', 'Australia', 'Pakistan'][i % 5],
        studentProfile: {
          create: {
            timezone: 'UTC',
            streak: Math.floor(Math.random() * 10),
          }
        }
      },
    });
    students.push(user);

    // Enroll in 1 or 2 random courses
    await prisma.enrollment.upsert({
      where: {
        studentId_courseId: {
          studentId: user.id,
          courseId: courses[i % courses.length].id,
        }
      },
      update: {},
      create: {
        studentId: user.id,
        courseId: courses[i % courses.length].id,
        status: EnrollmentStatus.ACTIVE,
        progress: Math.floor(Math.random() * 100),
      }
    });
  }
  console.log(`✅ 15 Students created and enrolled in courses`);

  // ── 5. Create Sample Blog Posts ────────────────
  const blogPostsData = [
    { title: '5 Tips for Memorizing the Quran', slug: '5-tips-hifz', category: BlogCategory.QURAN_LEARNING_TIPS },
    { title: 'The Importance of Tajweed', slug: 'importance-of-tajweed', category: BlogCategory.ISLAMIC_ARTICLES },
    { title: 'Teacher Spotlight: Sheikh Abdullah', slug: 'spotlight-sheikh-abdullah', category: BlogCategory.TEACHER_SPOTLIGHT },
  ];

  for (const b of blogPostsData) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        title: b.title,
        slug: b.slug,
        excerpt: `Discover our latest thoughts on ${b.title}...`,
        content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Sample blog post content goes here.' }] }] }, // Basic tiptap json
        category: b.category,
        authorId: superadmin.id,
        isPublished: true,
        publishedAt: new Date(),
      }
    });
  }
  console.log(`✅ ${blogPostsData.length} Blog Posts created`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
