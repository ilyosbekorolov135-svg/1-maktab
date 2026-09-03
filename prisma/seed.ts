import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { SCHOOLS_DATA, INITIAL_REVIEWS } from '../src/data/schoolsData';

const prisma = new PrismaClient();

async function resetSequence(table: string) {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 1))`
  );
}

async function main() {
  console.log('Seeding data into Neon PostgreSQL...');

  // Seed Schools
  for (const school of SCHOOLS_DATA) {
    await prisma.school.upsert({
      where: { slug: school.slug },
      update: {},
      create: {
        id: school.id,
        slug: school.slug,
        name: school.name,
        fullName: school.fullName,
        type: school.type,
        region: school.region,
        district: school.district,
        location: school.location,
        address: school.address,
        phone: school.phone,
        email: school.email,
        establishedYear: school.establishedYear,
        director: school.director,
        positivePercent: school.positivePercent,
        reviewsCount: school.reviewsCount,
        rank: school.rank,
        districtRank: school.districtRank,
        studentsCount: school.studentsCount,
        teachersCount: school.teachersCount,
        higherEducationAdmissionRate: school.higherEducationAdmissionRate,
        olympiadWinnersCount: school.olympiadWinnersCount,
        ratingBreakdown: JSON.stringify(school.ratingBreakdown),
        achievements: JSON.stringify(school.achievements),
        notableTeachers: JSON.stringify(school.notableTeachers),
        talentedStudents: JSON.stringify((school as any).talentedStudents || []),
        clubs: JSON.stringify(school.clubs),
        gallery: JSON.stringify(school.gallery),
        videos: school.videos ? JSON.stringify(school.videos) : null,
        bannerImage: school.bannerImage,
        logoImage: school.logoImage,
        logoBg: school.logoBg,
        isFeatured: school.isFeatured || false,
      },
    });
  }

  console.log('Schools seeded successfully.');

  // Seed Reviews
  for (const review of INITIAL_REVIEWS) {
    // Check if review already exists by id to avoid duplicates on re-run
    const existing = await prisma.review.findUnique({ where: { id: review.id } });
    if (!existing) {
      await prisma.review.create({
        data: {
          id: review.id,
          author: review.author,
          role: review.role,
          tagNumber: review.tagNumber,
          schoolId: review.schoolId,
          schoolName: review.schoolName,
          authorDetail: review.authorDetail,
          time: review.time,
          content: review.content,
          sentiment: review.sentiment,
          category: review.category,
          upvotes: review.upvotes,
          downvotes: review.downvotes,
          score: review.score,
          saved: review.saved || false,
          comments: review.comments ? JSON.stringify(review.comments) : null,
        },
      });
    }
  }

  console.log('Reviews seeded successfully.');

  await resetSequence('School');
  await resetSequence('Review');
  await resetSequence('SiteSettings');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
