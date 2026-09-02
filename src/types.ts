export type SchoolType = 'Davlat' | 'Ixtisoslashgan' | 'Prezident' | 'Xususiy';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  role?: string;
  experience: string;
  award: string;
  isMinistryFundWinner?: boolean;
  avatar: string;
  bio: string;
  rating: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: 'Tadbir' | 'Dars jarayoni' | 'Zakovat' | 'Olimpiada' | 'Sport' | 'Umumiy';
  uploadedAt: string;
  authorName?: string;
  videoDuration?: string;
}

export interface SchoolVideo {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  category: 'Virtual Tur' | 'Tadbir' | 'Dars jarayoni' | 'Zakovat' | 'Sport';
  duration?: string;
  description?: string;
  date?: string;
}

export interface Club {
  id: number;
  name: string;
  leader: string;
  schedule: string;
  icon: string;
  description: string;
  studentsCount: number;
}

export interface Student {
  id: number;
  name: string;
  grade: string;
  achievements: string;
  avatar: string;
  bio: string;
}

export interface School {
  id: number;
  slug: string;
  name: string;
  fullName: string;
  type: SchoolType;
  region: string;
  district: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  establishedYear: number;
  director: string;
  positivePercent: number;
  reviewsCount: number;
  rank: number;
  districtRank: number;
  studentsCount: number;
  teachersCount: number;
  higherEducationAdmissionRate: number; // e.g. 88%
  olympiadWinnersCount: number;
  ratingBreakdown: {
    education: number; // max 5
    teachers: number;
    facilities: number;
    discipline: number;
    canteen: number;
    sports: number;
  };
  achievements: string[];
  notableTeachers: Teacher[];
  talentedStudents: Student[];
  clubs: Club[];
  gallery: string[];
  videos?: SchoolVideo[];
  bannerImage: string;
  logoImage?: string;
  logoBg: string;
  isFeatured?: boolean;
}

export interface ReviewComment {
  id: number;
  author: string;
  role: string;
  date: string;
  content: string;
  upvotes: number;
}

export interface Review {
  id: number;
  author: string;
  role: 'O\'quvchi' | 'Ota-ona' | 'Bitiruvchi' | 'Ustoz' | 'Mehmon';
  tagNumber: string;
  schoolId: number;
  schoolName: string;
  authorDetail: string;
  time: string;
  content: string;
  sentiment: 'Ijobiy' | 'Salbiy' | 'Taklif';
  category?: 'Ta\'lim' | 'O\'qituvchilar' | 'Sharoit' | 'Oshxona' | 'Tadbirlar';
  upvotes: number;
  downvotes: number;
  score: string;
  userVoted?: 'up' | 'down';
  saved?: boolean;
  comments?: ReviewComment[];
}

export interface OlympiadWinner {
  id: number;
  studentName: string;
  grade: string;
  subject: string;
  competition: string;
  place: string;
  schoolName: string;
  teacherName: string;
  year: string;
}
