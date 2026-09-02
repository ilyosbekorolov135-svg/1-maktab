import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite ma'lumotlar bazasiga Prisma ORM orqali ulanish
const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  // Rasm yuklash uchun multer sozlamalari
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'public', 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });

  // Yuklangan fayllarni public qilib ochish
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

  // =====================
  // XAVFSIZLIK (Security)
  // =====================
  const adminOnly = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization'];
    if (token !== 'Bearer admin-token-123') {
      return res.status(403).json({ error: 'Ruxsat yo\'q. Avval tizimga kiring.' });
    }
    next();
  };

  // Rasm yuklash API'si
  app.post('/api/upload', adminOnly, upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Rasm yuklanmadi' });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // =====================
  // SAYT SOZLAMALARI (SITE SETTINGS) API
  // =====================

  const DEFAULT_SETTINGS: Record<string, string> = {
    siteName: '1-Maktab',
    siteBadge: 'ANGOR TUMANI',
    siteTagline: "Surxondaryo viloyati 1-sonli maktab portali",
    headerLogo: '/uploads/angor_1_maktab_official_logo.jpg',
    heroBadge1: "Surxondaryo #1 Tayanch Maktabi",
    heroBadge2: "Vazir Jamg'armasi 100% Ustamasi",
  };

  // Barcha sozlamalarni olish (hamma ko'rishi mumkin)
  app.get('/api/settings', async (req, res) => {
    try {
      const rows = await prisma.siteSettings.findMany();
      const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
      for (const row of rows) {
        settings[row.key] = row.value;
      }
      res.json(settings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server xatosi' });
    }
  });

  // Sozlamani yangilash yoki yaratish (faqat admin)
  app.put('/api/settings', adminOnly, async (req, res) => {
    try {
      const updates: Record<string, string> = req.body;
      for (const [key, value] of Object.entries(updates)) {
        await prisma.siteSettings.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sozlamani saqlashda xatolik' });
    }
  });

  // =====================
  // MAKTABLAR (SCHOOLS) API
  // =====================
  
  // 1. Barcha maktablarni olish
  app.get('/api/schools', async (req, res) => {
    try {
      const schools = await prisma.school.findMany({ orderBy: { id: 'asc' } });
      
      // JSON satrlarini yana haqiqiy JSON obyektlariga aylantiramiz (frontend xatosiz o'qishi uchun)
      const formattedSchools = schools.map(s => ({
        ...s,
        ratingBreakdown: JSON.parse(s.ratingBreakdown),
        achievements: JSON.parse(s.achievements),
        notableTeachers: JSON.parse(s.notableTeachers),
        talentedStudents: JSON.parse(s.talentedStudents || '[]'),
        clubs: JSON.parse(s.clubs),
        gallery: JSON.parse(s.gallery),
        videos: s.videos ? JSON.parse(s.videos) : undefined
      }));
      
      res.json(formattedSchools);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server xatosi' });
    }
  });

  // 2. Yangi maktab qo'shish (HIMOYALANGAN)
  app.post('/api/schools', adminOnly, async (req, res) => {
    try {
      const data = req.body;
      const newSchool = await prisma.school.create({
        data: {
          slug: data.slug || `maktab-${Date.now()}`,
          name: data.name,
          fullName: data.fullName,
          type: data.type,
          region: data.region,
          district: data.district,
          location: data.location,
          address: data.address,
          phone: data.phone,
          email: data.email || 'info@maktab.uz',
          establishedYear: data.establishedYear,
          director: data.director || '',
          positivePercent: data.positivePercent || 95,
          reviewsCount: data.reviewsCount || 0,
          rank: data.rank || 0,
          districtRank: data.districtRank || 0,
          studentsCount: data.studentsCount || 0,
          teachersCount: data.teachersCount || 0,
          higherEducationAdmissionRate: data.higherEducationAdmissionRate || 0,
          olympiadWinnersCount: data.olympiadWinnersCount || 0,
          ratingBreakdown: JSON.stringify(data.ratingBreakdown || {}),
          achievements: JSON.stringify(data.achievements || []),
          notableTeachers: JSON.stringify(data.notableTeachers || []),
          talentedStudents: JSON.stringify(data.talentedStudents || []),
          clubs: JSON.stringify(data.clubs || []),
          gallery: JSON.stringify(data.gallery || []),
          videos: data.videos ? JSON.stringify(data.videos) : null,
          bannerImage: data.bannerImage,
          logoImage: data.logoImage || null,
          logoBg: data.logoBg || 'bg-blue-600 text-white',
          isFeatured: data.isFeatured || false,
        }
      });
      res.json(newSchool);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Maktab qo\'shishda xatolik' });
    }
  });

  // 3. Maktabni tahrirlash (HIMOYALANGAN)
  app.put('/api/schools/:id', adminOnly, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updatedSchool = await prisma.school.update({
        where: { id },
        data: {
          name: data.name,
          fullName: data.fullName,
          type: data.type,
          region: data.region,
          district: data.district,
          address: data.address,
          director: data.director,
          phone: data.phone,
          studentsCount: data.studentsCount,
          teachersCount: data.teachersCount,
          establishedYear: data.establishedYear,
          bannerImage: data.bannerImage,
          logoImage: data.logoImage
        }
      });
      res.json(updatedSchool);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Maktab tahrirlashda xatolik' });
    }
  });

  // 4. Maktabni o'chirish (HIMOYALANGAN)
  app.delete('/api/schools/:id', adminOnly, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await prisma.review.deleteMany({ where: { schoolId: id } });
      await prisma.school.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Maktabni o\'chirishda xatolik' });
    }
  });

  // =====================
  // FAXRIY USTOZLAR (TEACHERS) API
  // =====================
  
  // Barcha faxriy ustozlar ro'yxatini olish
  app.get('/api/teachers', async (req, res) => {
    try {
      const schools = await prisma.school.findMany();
      let allTeachers: any[] = [];
      for (const s of schools) {
        try {
          const teachers = JSON.parse(s.notableTeachers || '[]');
          teachers.forEach((t: any) => {
            allTeachers.push({
              ...t,
              schoolId: s.id,
              schoolName: s.name
            });
          });
        } catch {}
      }
      res.json(allTeachers);
    } catch (error) {
      res.status(500).json({ error: 'Ustozlar ro\'yxatini olishda xatolik' });
    }
  });

  // Yangi ustoz qo'shish (HIMOYALANGAN)
  app.post('/api/teachers', adminOnly, async (req, res) => {
    try {
      const { schoolId = 1, name, subject, role, experience, award, isMinistryFundWinner, avatar, bio, rating } = req.body;
      const school = await prisma.school.findUnique({ where: { id: Number(schoolId) } });
      if (!school) {
        return res.status(404).json({ error: 'Maktab topilmadi' });
      }
      const teachers = JSON.parse(school.notableTeachers || '[]');
      const newTeacher = {
        id: Date.now(),
        name,
        subject,
        role: role || subject,
        experience: experience || '10+ yil',
        award: award || 'Faxriy pedagog',
        isMinistryFundWinner: Boolean(isMinistryFundWinner),
        avatar: avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        bio: bio || '',
        rating: Number(rating) || 5.0
      };
      teachers.unshift(newTeacher);
      await prisma.school.update({
        where: { id: Number(schoolId) },
        data: { notableTeachers: JSON.stringify(teachers) }
      });
      res.json({ ...newTeacher, schoolId: school.id, schoolName: school.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ustoz qo\'shishda xatolik' });
    }
  });

  // Ustoz ma'lumotlarini tahrirlash (HIMOYALANGAN)
  app.put('/api/teachers/:id', adminOnly, async (req, res) => {
    try {
      const teacherId = Number(req.params.id);
      const data = req.body;
      const schools = await prisma.school.findMany();
      let updated = false;
      let updatedTeacher = null;

      for (const s of schools) {
        let teachers = JSON.parse(s.notableTeachers || '[]');
        const idx = teachers.findIndex((t: any) => t.id === teacherId);
        if (idx !== -1) {
          teachers[idx] = {
            ...teachers[idx],
            name: data.name ?? teachers[idx].name,
            subject: data.subject ?? teachers[idx].subject,
            role: data.role ?? teachers[idx].role,
            experience: data.experience ?? teachers[idx].experience,
            award: data.award ?? teachers[idx].award,
            isMinistryFundWinner: data.isMinistryFundWinner !== undefined ? Boolean(data.isMinistryFundWinner) : teachers[idx].isMinistryFundWinner,
            avatar: data.avatar ?? teachers[idx].avatar,
            bio: data.bio ?? teachers[idx].bio,
            rating: data.rating ? Number(data.rating) : teachers[idx].rating,
          };
          updatedTeacher = teachers[idx];
          await prisma.school.update({
            where: { id: s.id },
            data: { notableTeachers: JSON.stringify(teachers) }
          });
          updated = true;
          break;
        }
      }

      if (!updated) {
        return res.status(404).json({ error: 'Ustoz topilmadi' });
      }
      res.json(updatedTeacher);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ustozni tahrirlashda xatolik' });
    }
  });

  // Ustozni o'chirish (HIMOYALANGAN)
  app.delete('/api/teachers/:id', adminOnly, async (req, res) => {
    try {
      const teacherId = Number(req.params.id);
      const schools = await prisma.school.findMany();
      let deleted = false;

      for (const s of schools) {
        let teachers = JSON.parse(s.notableTeachers || '[]');
        const filtered = teachers.filter((t: any) => t.id !== teacherId);
        if (filtered.length !== teachers.length) {
          await prisma.school.update({
            where: { id: s.id },
            data: { notableTeachers: JSON.stringify(filtered) }
          });
          deleted = true;
          break;
        }
      }

      if (!deleted) {
        return res.status(404).json({ error: 'Ustoz topilmadi' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ustozni o\'chirishda xatolik' });
    }
  });

  // =====================
  // FIKRLAR (REVIEWS) API
  // =====================

  app.get('/api/reviews', async (req, res) => {
    try {
      const reviews = await prisma.review.findMany({ orderBy: { id: 'desc' } });
      const formattedReviews = reviews.map(r => ({
        ...r,
        comments: r.comments ? JSON.parse(r.comments) : undefined
      }));
      res.json(formattedReviews);
    } catch (error) {
      res.status(500).json({ error: 'Server xatosi' });
    }
  });

  app.post('/api/reviews', async (req, res) => {
    try {
      const data = req.body;
      const newReview = await prisma.review.create({
        data: {
          author: data.author,
          role: data.role,
          tagNumber: data.tagNumber,
          schoolId: data.schoolId,
          schoolName: data.schoolName,
          authorDetail: data.authorDetail,
          time: data.time,
          content: data.content,
          sentiment: data.sentiment,
          category: data.category,
          upvotes: data.upvotes || 0,
          downvotes: data.downvotes || 0,
          score: data.score,
          saved: data.saved || false,
          comments: data.comments ? JSON.stringify(data.comments) : null
        }
      });
      res.json(newReview);
    } catch (error) {
      res.status(500).json({ error: 'Fikr qo\'shishda xatolik' });
    }
  });

  // Fikrni o'chirish (HIMOYALANGAN - faqat admin)
  app.delete('/api/reviews/:id', adminOnly, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await prisma.review.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Fikrni o\'chirishda xatolik' });
    }
  });

  // ADMIN LOGIN
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      res.json({ success: true, token: 'admin-token-123' });
    } else {
      res.status(401).json({ success: false, message: 'Xato login yoki parol' });
    }
  });

  // --- TALENTED STUDENTS ENDPOINTS ---

  // Get all talented students
  app.get('/api/students', async (req, res) => {
    try {
      const schools = await prisma.school.findMany();
      let allStudents: any[] = [];
      for (const s of schools) {
        try {
          const students = JSON.parse(s.talentedStudents || '[]');
          students.forEach((st: any) => {
            allStudents.push({ ...st, schoolId: s.id, schoolName: s.name });
          });
        } catch (e) {}
      }
      res.json(allStudents.sort((a, b) => b.id - a.id));
    } catch (error) {
      res.status(500).json({ error: 'O\'quvchilarni olishda xatolik' });
    }
  });

  // Add talented student (HIMOYALANGAN - admin)
  app.post('/api/students', adminOnly, async (req, res) => {
    try {
      const { schoolId, name, grade, achievements, avatar, bio } = req.body;
      const school = await prisma.school.findUnique({ where: { id: Number(schoolId) } });
      if (!school) return res.status(404).json({ error: 'Maktab topilmadi' });
      
      const students = JSON.parse(school.talentedStudents || '[]');
      const newStudent = { id: Date.now(), name, grade, achievements, avatar, bio };
      students.unshift(newStudent);
      
      await prisma.school.update({
        where: { id: Number(schoolId) },
        data: { talentedStudents: JSON.stringify(students) }
      });
      res.json({ ...newStudent, schoolId: school.id, schoolName: school.name });
    } catch (error) {
      res.status(500).json({ error: 'O\'quvchi qo\'shishda xatolik' });
    }
  });

  // Edit talented student (HIMOYALANGAN - admin)
  app.put('/api/students/:id', adminOnly, async (req, res) => {
    try {
      const studentId = Number(req.params.id);
      const data = req.body;
      const schools = await prisma.school.findMany();
      let updatedStudent = null;

      for (const s of schools) {
        let students = JSON.parse(s.talentedStudents || '[]');
        const idx = students.findIndex((st: any) => st.id === studentId);
        if (idx !== -1) {
          students[idx] = {
            ...students[idx],
            name: data.name ?? students[idx].name,
            grade: data.grade ?? students[idx].grade,
            achievements: data.achievements ?? students[idx].achievements,
            avatar: data.avatar ?? students[idx].avatar,
            bio: data.bio ?? students[idx].bio
          };
          updatedStudent = students[idx];
          await prisma.school.update({
            where: { id: s.id },
            data: { talentedStudents: JSON.stringify(students) }
          });
          break;
        }
      }
      if (updatedStudent) res.json(updatedStudent);
      else res.status(404).json({ error: 'O\'quvchi topilmadi' });
    } catch (error) {
      res.status(500).json({ error: 'O\'quvchini tahrirlashda xatolik' });
    }
  });

  // Delete talented student (HIMOYALANGAN - admin)
  app.delete('/api/students/:id', adminOnly, async (req, res) => {
    try {
      const studentId = Number(req.params.id);
      const schools = await prisma.school.findMany();
      let deleted = false;

      for (const s of schools) {
        let students = JSON.parse(s.talentedStudents || '[]');
        const filtered = students.filter((st: any) => st.id !== studentId);
        if (filtered.length !== students.length) {
          await prisma.school.update({
            where: { id: s.id },
            data: { talentedStudents: JSON.stringify(filtered) }
          });
          deleted = true;
          break;
        }
      }
      if (deleted) res.json({ success: true });
      else res.status(404).json({ error: 'O\'quvchi topilmadi' });
    } catch (error) {
      res.status(500).json({ error: 'O\'quvchini o\'chirishda xatolik' });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
