export interface LessonItem {
  period: number;
  time: string;
  subject: string;
  teacher: string;
  teacherAvatar?: string;
  isMinistryWinner?: boolean;
  room: string;
  type: 'Aniq fanlar' | 'Tabiiy fanlar' | 'Tillar' | 'Gumanitar' | 'STEAM & IT' | 'San\'at & Sport';
  notes?: string;
}

export interface DaySchedule {
  dayName: 'Dushanba' | 'Seshanba' | 'Chorshanba' | 'Payshanba' | 'Juma' | 'Shanba';
  dayIndex: number; // 1 = Dushanba, ..., 6 = Shanba
  lessons: LessonItem[];
}

export interface ClassStreamInfo {
  grade: number; // 5 - 11
  stream: string; // 'A', 'B', 'V', 'G'
  displayName: string; // "10-A sinfi"
  specialization: string; // "Aniq fanlar va IT yo'nalishi"
  classTeacher: string; // "Fazliddin Kenjayev"
  classTeacherRole: string; // "Tarix fani o'qituvchisi"
  classTeacherAvatar: string;
  isTeacherMinistryWinner: boolean;
  homeRoom: string; // "204-xona"
  shift: 1 | 2;
  studentsCount: number;
  schedule: DaySchedule[];
}

// Reusable bell schedules
export const PERIOD_TIMES_SHIFT_1: Record<number, string> = {
  1: '08:00 - 08:45',
  2: '08:50 - 09:35',
  3: '09:45 - 10:30', // Katta tanaffus 10 min
  4: '10:40 - 11:25',
  5: '11:35 - 12:20',
  6: '12:25 - 13:10'
};

export const PERIOD_TIMES_SHIFT_2: Record<number, string> = {
  1: '13:30 - 14:15',
  2: '14:20 - 15:05',
  3: '15:15 - 16:00', // Katta tanaffus
  4: '16:10 - 16:55',
  5: '17:00 - 17:45',
  6: '17:50 - 18:35'
};

export const SUBJECT_TYPE_COLORS: Record<string, { bg: string; text: string; border: string; darkBg: string; darkText: string; darkBorder: string }> = {
  'Aniq fanlar': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    darkBg: 'bg-blue-950/40',
    darkText: 'text-blue-300',
    darkBorder: 'border-blue-800'
  },
  'Tabiiy fanlar': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    darkBg: 'bg-emerald-950/40',
    darkText: 'text-emerald-300',
    darkBorder: 'border-emerald-800'
  },
  'Tillar': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    darkBg: 'bg-indigo-950/40',
    darkText: 'text-indigo-300',
    darkBorder: 'border-indigo-800'
  },
  'Gumanitar': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    darkBg: 'bg-amber-950/40',
    darkText: 'text-amber-300',
    darkBorder: 'border-amber-800'
  },
  'STEAM & IT': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    darkBg: 'bg-purple-950/40',
    darkText: 'text-purple-300',
    darkBorder: 'border-purple-800'
  },
  'San\'at & Sport': {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    darkBg: 'bg-rose-950/40',
    darkText: 'text-rose-300',
    darkBorder: 'border-rose-800'
  }
};

// All available Grades and Streams in 1-Maktab
export const AVAILABLE_GRADES = [5, 6, 7, 8, 9, 10, 11];
export const AVAILABLE_STREAMS = [
  { id: 'A', label: 'A guruhi', desc: 'Aniq fanlar va Matematika' },
  { id: 'B', label: 'B guruhi', desc: 'STEAM va Robototexnika' },
  { id: 'V', label: 'V guruhi', desc: 'Tabiiy fanlar (Kimyo/Biologiya)' },
  { id: 'G', label: 'G guruhi', desc: 'Ijtimoiy-gumanitar va Xorijiy tillar' },
];

export const ALL_CLASSES_SCHEDULE: ClassStreamInfo[] = [
  // ================= 10-A SINFI (Specialized Exact Sciences) =================
  {
    grade: 10,
    stream: 'A',
    displayName: '10-A sinfi',
    specialization: 'Aniq fanlar va Al-Xorazmiy olimpiada tayanch guruhi',
    classTeacher: 'Sherzod Norboyev',
    classTeacherRole: 'Matematika va Informatika ustozi (Oliy toifa)',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: false,
    homeRoom: '208-xona (Aniq fanlar)',
    shift: 1,
    studentsCount: 32,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Algebra va Analiz', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Geometriya', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'O\'zbekiston Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Informatika & Python', teacher: 'Jamshid Rahimov', room: 'IT Markazi-1', type: 'STEAM & IT' },
          { period: 5, time: '11:35 - 12:20', subject: 'Ingliz Tili (IELTS prep)', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport majmuasi', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Fizika (Nazariya)', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Fizika (Laboratoriya)', teacher: 'Alisher Xoliqov', room: 'Fizika Lab.', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Ona Tili va Adabiyot', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Kimyo', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Jahon Tarixi', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Tarbiya soati', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Algebra (Olimpiada masalalari)', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Informatika & Veb-dasturlash', teacher: 'Jamshid Rahimov', room: 'IT Markazi-1', type: 'STEAM & IT' },
          { period: 3, time: '09:45 - 10:30', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Biologiya (Genetika)', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Geometriya', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Chizmachilik', teacher: 'Mansur Hakimov', room: 'San\'at xonasi', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Fizika (Mexanika & Termodinamika)', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'O\'zbekiston Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Ona Tili (Grammatika va Insho)', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Algebra va Analiz', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Robototexnika va Sun\'iy Intellekt', teacher: 'Jamshid Rahimov', room: 'STEAM Lab', type: 'STEAM & IT' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zali', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Ingliz Tili (Speaking & Listening)', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Adabiyot (O\'zbek va Jahon)', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Geometriya (Fazoviy shakllar)', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Kimyo (Organik birikmalar)', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Iqtisodiy bilim asoslari', teacher: 'Bahodir Ergashev', room: '106-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Zakovat va Mantiqiy Fikrlash', teacher: 'Shoxista Madiyeva', room: 'Faollar zali', type: 'STEAM & IT' },
          { period: 2, time: '08:50 - 09:35', subject: 'IT Loyihalar Taqdimoti', teacher: 'Jamshid Rahimov', room: 'IT Markazi-1', type: 'STEAM & IT' },
          { period: 3, time: '09:45 - 10:30', subject: 'CHQBT (Harbiy vatanparvarlik)', teacher: 'Olim Panjiyev', room: 'CHQBT xonasi', type: 'Gumanitar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Sinf soati & Haftalik yakun', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Gumanitar' },
        ]
      }
    ]
  },

  // ================= 11-A SINFI (Graduation Academic Class) =================
  {
    grade: 11,
    stream: 'A',
    displayName: '11-A sinfi',
    specialization: 'DTM va OTMga chuqurlashtirilgan tayyorgarlik (Aniq fanlar)',
    classTeacher: 'Fazliddin Kenjayev',
    classTeacherRole: 'Tarix fani o\'qituvchisi (Vazir jamg\'armasi ustamasi)',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: true,
    homeRoom: '204-xona (Tarix va Milliy g\'oya)',
    shift: 1,
    studentsCount: 30,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'O\'zbekiston Tarixi (DTM Test)', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Jahon Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Matematika (Murakkab integrallar)', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Fizika', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Ingliz Tili (IELTS / CEFR)', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport maydoni', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Algebra va Matematik Mantiq', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Ona Tili (Milliy sertifikat)', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 3, time: '09:45 - 10:30', subject: 'O\'zbekiston Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Informatika & Kiberxavfsizlik', teacher: 'Jamshid Rahimov', room: 'IT Markazi-1', type: 'STEAM & IT' },
          { period: 5, time: '11:35 - 12:20', subject: 'Kimyo', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 6, time: '12:25 - 13:10', subject: 'CHQBT', teacher: 'Olim Panjiyev', room: 'CHQBT xonasi', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Fizika (Kvant fizikasi)', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Geometriya', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Huquqshunoslik asoslari', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Biologiya', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'O\'zbekiston Tarixi (Manbashunoslik)', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Algebra va Analiz', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Adabiyot', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Fizika (Masalalar yechish)', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Tadbirkorlik va Biznes', teacher: 'Bahodir Ergashev', room: '106-xona', type: 'Gumanitar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport majmuasi', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Ingliz Tili (Mock Test)', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Matematika (DTM Blok test)', teacher: 'Sherzod Norboyev', room: '208-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Jahon Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Ona Tili va Adabiyot', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Astronomiya', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Kasbga yo\'naltirish va Motivatsiya', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 2, time: '08:50 - 09:35', subject: 'IT va Dasturiy ta\'minot', teacher: 'Jamshid Rahimov', room: 'IT Markazi-1', type: 'STEAM & IT' },
          { period: 3, time: '09:45 - 10:30', subject: 'Sinf rahbarlik soati', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
        ]
      }
    ]
  },

  // ================= 9-B SINFI (STEAM & Robototexnika) =================
  {
    grade: 9,
    stream: 'B',
    displayName: '9-B sinfi',
    specialization: 'STEAM, Robototexnika va Amaliy fanlar',
    classTeacher: 'Jamshid Rahimov',
    classTeacherRole: 'Informatika va Robototexnika ustozi',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: false,
    homeRoom: 'IT Markazi (STEAM Lab)',
    shift: 1,
    studentsCount: 31,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Informatika (Python)', teacher: 'Jamshid Rahimov', room: 'IT Lab-1', type: 'STEAM & IT' },
          { period: 2, time: '08:50 - 09:35', subject: 'Robototexnika & Arduino', teacher: 'Jamshid Rahimov', room: 'STEAM Lab', type: 'STEAM & IT' },
          { period: 3, time: '09:45 - 10:30', subject: 'Algebra', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Ona Tili', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Fizika', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Geometriya', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'O\'zbekiston Tarixi', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Kimyo (Laboratoriya)', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Biologiya', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: '3D Modellashtirish va Grafika', teacher: 'Jamshid Rahimov', room: 'IT Lab-2', type: 'STEAM & IT' },
          { period: 2, time: '08:50 - 09:35', subject: 'Algebra', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Adabiyot', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Fizika (Laboratoriya)', teacher: 'Alisher Xoliqov', room: 'Fizika Lab.', type: 'Aniq fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Jahon Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Ingliz Tili (Tech English)', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Geometriya', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Informatika (Veb sayt yaratish)', teacher: 'Jamshid Rahimov', room: 'IT Lab-1', type: 'STEAM & IT' },
          { period: 4, time: '10:40 - 11:25', subject: 'Geografiya', teacher: 'Hamid Oripov', room: '102-xona', type: 'Tabiiy fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Texnologiya (Mehnat)', teacher: 'Sardor Qodirov', room: 'Ustaxona', type: 'STEAM & IT' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Algebra', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Ona Tili', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Kimyo', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Tarbiya', teacher: 'Jamshid Rahimov', room: 'STEAM Lab', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Robototexnika Musobaqa Tayyorgarligi', teacher: 'Jamshid Rahimov', room: 'STEAM Lab', type: 'STEAM & IT' },
          { period: 2, time: '08:50 - 09:35', subject: 'Chizmachilik', teacher: 'Mansur Hakimov', room: 'San\'at xonasi', type: 'San\'at & Sport' },
          { period: 3, time: '09:45 - 10:30', subject: 'Sinf soati', teacher: 'Jamshid Rahimov', room: 'STEAM Lab', type: 'Gumanitar' },
        ]
      }
    ]
  },

  // ================= 8-A SINFI =================
  {
    grade: 8,
    stream: 'A',
    displayName: '8-A sinfi',
    specialization: 'Matematika va Xorijiy tillar guruhi',
    classTeacher: 'Guliston Kuvatova',
    classTeacherRole: 'Tarix fani o\'qituvchisi (Oliy toifa)',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: true,
    homeRoom: '203-xona',
    shift: 1,
    studentsCount: 29,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Algebra', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'O\'zbekiston Tarixi', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '203-xona', type: 'Gumanitar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Fizika', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Ona Tili', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 6, time: '12:25 - 13:10', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Geometriya', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Biologiya', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Jahon Tarixi', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '203-xona', type: 'Gumanitar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Kimyo', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Informatika', teacher: 'Jamshid Rahimov', room: 'IT Lab-1', type: 'STEAM & IT' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Algebra', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Adabiyot', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Geografiya', teacher: 'Hamid Oripov', room: '102-xona', type: 'Tabiiy fanlar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Musiqa va San\'at', teacher: 'Zarina Yusupova', room: 'Musiqa xonasi', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Fizika', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'O\'zbekiston Tarixi', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '203-xona', type: 'Gumanitar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Geometriya', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Ona Tili', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 5, time: '11:35 - 12:20', subject: 'Texnologiya', teacher: 'Sardor Qodirov', room: 'Ustaxona', type: 'STEAM & IT' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Algebra', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '08:50 - 09:35', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 3, time: '09:45 - 10:30', subject: 'Kimyo', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 4, time: '10:40 - 11:25', subject: 'Tarbiya', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '203-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '08:00 - 08:45', subject: 'Zakovat o\'yinlari', teacher: 'Shoxista Madiyeva', room: 'Faollar zali', type: 'STEAM & IT' },
          { period: 2, time: '08:50 - 09:35', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
          { period: 3, time: '09:45 - 10:30', subject: 'Sinf soati', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '203-xona', type: 'Gumanitar' },
        ]
      }
    ]
  },

  // ================= 7-A SINFI (Shift 2 example) =================
  {
    grade: 7,
    stream: 'A',
    displayName: '7-A sinfi',
    specialization: 'Iqtidorli bolalar va Aniq fanlar',
    classTeacher: 'Dilfuza Eshmurodova',
    classTeacherRole: 'Matematika fani ustozi',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: false,
    homeRoom: '105-xona',
    shift: 2,
    studentsCount: 33,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Ona Tili', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 3, time: '15:15 - 16:00', subject: 'O\'zbekiston Tarixi', teacher: 'Guliston Kuvatova', isMinistryWinner: true, room: '203-xona', type: 'Gumanitar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 5, time: '17:00 - 17:45', subject: 'Fizika', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Biologiya', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Informatika', teacher: 'Jamshid Rahimov', room: 'IT Lab-1', type: 'STEAM & IT' },
          { period: 4, time: '16:10 - 16:55', subject: 'Adabiyot', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 5, time: '17:00 - 17:45', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Geografiya', teacher: 'Hamid Oripov', room: '102-xona', type: 'Tabiiy fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Jahon Tarixi', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Fizika', teacher: 'Alisher Xoliqov', room: '302-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ona Tili', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Texnologiya', teacher: 'Sardor Qodirov', room: 'Ustaxona', type: 'STEAM & IT' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Adabiyot', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Kimyo asoslari', teacher: 'Zuhra Normurodova', room: 'Kimyo Lab.', type: 'Tabiiy fanlar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Tarbiya', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Tasviriy San\'at', teacher: 'Mansur Hakimov', room: 'San\'at xonasi', type: 'San\'at & Sport' },
          { period: 2, time: '14:20 - 15:05', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
          { period: 3, time: '15:15 - 16:00', subject: 'Sinf soati', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Gumanitar' },
        ]
      }
    ]
  },

  // ================= 6-A SINFI =================
  {
    grade: 6,
    stream: 'A',
    displayName: '6-A sinfi',
    specialization: 'Matematika va Tabiiy fanlar integratsiyasi',
    classTeacher: 'Nodira Haydarova',
    classTeacherRole: 'Ona tili va adabiyot ustozi',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: false,
    homeRoom: '202-xona',
    shift: 2,
    studentsCount: 30,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Ona Tili', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Tarix (Qadimgi dunyo)', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 5, time: '17:00 - 17:45', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Botanika', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Informatika', teacher: 'Jamshid Rahimov', room: 'IT Lab-1', type: 'STEAM & IT' },
          { period: 4, time: '16:10 - 16:55', subject: 'Adabiyot', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Geografiya', teacher: 'Hamid Oripov', room: '102-xona', type: 'Tabiiy fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Musiqa', teacher: 'Zarina Yusupova', room: 'Musiqa xonasi', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Tarix', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ona Tili', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Texnologiya', teacher: 'Sardor Qodirov', room: 'Ustaxona', type: 'STEAM & IT' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Adabiyot', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Tillar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Tabiiy fan (Science)', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Tarbiya', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Tasviriy San\'at', teacher: 'Mansur Hakimov', room: 'San\'at xonasi', type: 'San\'at & Sport' },
          { period: 2, time: '14:20 - 15:05', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
          { period: 3, time: '15:15 - 16:00', subject: 'Sinf soati', teacher: 'Nodira Haydarova', room: '202-xona', type: 'Gumanitar' },
        ]
      }
    ]
  },

  // ================= 5-A SINFI (Elementary Transition) =================
  {
    grade: 5,
    stream: 'A',
    displayName: '5-A sinfi',
    specialization: 'Boshlang\'ichdan yuqori bosqichga moslashuv guruhi',
    classTeacher: 'Sanobar To\'rayeva',
    classTeacherRole: 'Biologiya va Tabiiy fanlar ustozi',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    isTeacherMinistryWinner: false,
    homeRoom: '304-xona (Tabiatshunoslik)',
    shift: 2,
    studentsCount: 34,
    schedule: [
      {
        dayName: 'Dushanba',
        dayIndex: 1,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Ona Tili', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Tarixdan hikoyalar', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 5, time: '17:00 - 17:45', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Seshanba',
        dayIndex: 2,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Tabiiy fan (Science)', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Adabiyot', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Informatika savodxonligi', teacher: 'Jamshid Rahimov', room: 'IT Lab-1', type: 'STEAM & IT' },
        ]
      },
      {
        dayName: 'Chorshanba',
        dayIndex: 3,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Ona Tili', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Musiqa madaniyati', teacher: 'Zarina Yusupova', room: 'Musiqa xonasi', type: 'San\'at & Sport' },
        ]
      },
      {
        dayName: 'Payshanba',
        dayIndex: 4,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Matematika', teacher: 'Dilfuza Eshmurodova', room: '105-xona', type: 'Aniq fanlar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Tabiiy fan (Science)', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Tabiiy fanlar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Ona Tili', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Texnologiya (Mehnat)', teacher: 'Sardor Qodirov', room: 'Ustaxona', type: 'STEAM & IT' },
        ]
      },
      {
        dayName: 'Juma',
        dayIndex: 5,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Ingliz Tili', teacher: 'Nilufar Bobomurodova', room: '305-xona', type: 'Tillar' },
          { period: 2, time: '14:20 - 15:05', subject: 'Adabiyot', teacher: 'Shoxista Madiyeva', room: '201-xona', type: 'Tillar' },
          { period: 3, time: '15:15 - 16:00', subject: 'Tarixdan hikoyalar', teacher: 'Fazliddin Kenjayev', isMinistryWinner: true, room: '204-xona', type: 'Gumanitar' },
          { period: 4, time: '16:10 - 16:55', subject: 'Tarbiya', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Gumanitar' },
        ]
      },
      {
        dayName: 'Shanba',
        dayIndex: 6,
        lessons: [
          { period: 1, time: '13:30 - 14:15', subject: 'Tasviriy San\'at', teacher: 'Mansur Hakimov', room: 'San\'at xonasi', type: 'San\'at & Sport' },
          { period: 2, time: '14:20 - 15:05', subject: 'Jismoniy Tarbiya', teacher: 'Rustam Karimov', room: 'Sport zal', type: 'San\'at & Sport' },
          { period: 3, time: '15:15 - 16:00', subject: 'Sinf soati', teacher: 'Sanobar To\'rayeva', room: '304-xona', type: 'Gumanitar' },
        ]
      }
    ]
  }
];

// Helper to generate dynamic schedule for any grade/stream combination if not directly explicitly static
export const getScheduleForGradeAndStream = (grade: number, stream: string): ClassStreamInfo => {
  const directMatch = ALL_CLASSES_SCHEDULE.find(c => c.grade === grade && c.stream === stream);
  if (directMatch) return directMatch;

  // Fallback template builder dynamically generated
  const baseGrade = ALL_CLASSES_SCHEDULE.find(c => c.grade === grade) || ALL_CLASSES_SCHEDULE[0];
  const streamInfo = AVAILABLE_STREAMS.find(s => s.id === stream) || AVAILABLE_STREAMS[0];

  return {
    grade,
    stream,
    displayName: `${grade}-${stream} sinfi`,
    specialization: `${streamInfo.desc} guruhi`,
    classTeacher: stream === 'B' ? 'Jamshid Rahimov' : stream === 'V' ? 'Zuhra Normurodova' : stream === 'G' ? 'Guliston Kuvatova' : baseGrade.classTeacher,
    classTeacherRole: stream === 'B' ? 'Informatika ustozi' : stream === 'V' ? 'Kimyo ustozi' : stream === 'G' ? 'Tarix ustozi' : baseGrade.classTeacherRole,
    classTeacherAvatar: baseGrade.classTeacherAvatar,
    isTeacherMinistryWinner: stream === 'G' || baseGrade.isTeacherMinistryWinner,
    homeRoom: `${grade >= 8 ? '20' + (grade - 5) : '10' + (grade)} - xona`,
    shift: (grade >= 8) ? 1 : 2,
    studentsCount: 30 + (grade % 4),
    schedule: baseGrade.schedule
  };
};
