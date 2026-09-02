import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, Users, MessageSquare, Plus, Edit2, Trash2, X, Database, 
  BarChart3, School as SchoolIcon, CheckCircle2, Lock, Sparkles, AlertCircle, Save, Award, Star, Heart,
  Settings, Globe, Layout, Palette, Image as ImageIcon, Check, Upload, Tag, PenLine, GraduationCap
} from 'lucide-react';
import { School, Review, Teacher, Student } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  isDarkMode: boolean;
  schools: School[];
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onClose, 
  isDarkMode,
  schools,
  setSchools,
  reviews,
  setReviews
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schools' | 'teachers' | 'students' | 'reviews' | 'settings'>('dashboard');

  // Modal for adding / editing school
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState<boolean>(false);
  const [editingSchoolId, setEditingSchoolId] = useState<number | null>(null);
  const [schoolFormData, setSchoolFormData] = useState({
    name: '',
    fullName: '',
    type: 'Davlat' as School['type'],
    region: 'Surxondaryo',
    district: 'Angor tumani',
    address: "Surxondaryo viloyati, Angor tumani, Mustaqillik ko'chasi, 12-uy",
    director: '',
    phone: '',
    studentsCount: 1000,
    teachersCount: 60,
    establishedYear: 2000,
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    logoImage: ''
  });

  // Modal for adding / editing teacher
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [editingTeacherId, setEditingTeacherId] = useState<number | null>(null);
  const [teacherFormData, setTeacherFormData] = useState({
    name: '',
    subject: 'Tarix',
    schoolId: 1,
    experience: '10+ yil',
    award: 'Vazir jamg\'armasi ustamasi sohibi',
    isMinistryFundWinner: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: '',
    rating: 5.0
  });

  // Teachers list
  // === STUDENT MODAL STATE ===
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    grade: '10',
    achievements: 'Respublika olimpiadasi g\'olibi',
    avatar: 'https://via.placeholder.com/150',
    bio: '',
    schoolId: 1
  });

  const allTeachers = useMemo(() => {
    const list: (Teacher & { schoolName: string; schoolId: number })[] = [];
    schools.forEach(s => {
      if (s.notableTeachers && Array.isArray(s.notableTeachers)) {
        s.notableTeachers.forEach(t => {
          list.push({
            ...t,
            schoolName: s.name,
            schoolId: s.id
          });
        });
      }
    });
    return list;
  }, [schools]);

  const handleOpenAddTeacher = () => {
    setEditingTeacherId(null);
    setTeacherFormData({
      name: '',
      subject: 'Tarix',
      schoolId: schools[0]?.id || 1,
      experience: '12 yil',
      award: 'Vazir jamg\'armasi ustamasi sohibi',
      isMinistryFundWinner: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: '',
      rating: 5.0
    });
    setIsTeacherModalOpen(true);
  };

  const handleOpenEditTeacher = (teacher: Teacher & { schoolId?: number }) => {
    setEditingTeacherId(teacher.id);
    setTeacherFormData({
      name: teacher.name,
      subject: teacher.subject,
      schoolId: teacher.schoolId || schools[0]?.id || 1,
      experience: teacher.experience || '10+ yil',
      award: teacher.award || '',
      isMinistryFundWinner: Boolean(teacher.isMinistryFundWinner),
      avatar: teacher.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: teacher.bio || '',
      rating: teacher.rating || 5.0
    });
    setIsTeacherModalOpen(true);
  };


  const safeArray = (val: any): any[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try { const p = JSON.parse(val); return Array.isArray(p) ? p : []; } catch { return []; }
    }
    return [];
  };

  const allStudents = useMemo(() => {
    const list: (Student & { schoolName: string; schoolId: number })[] = [];
    schools.forEach(s => {
      safeArray(s.talentedStudents).forEach((st: any) => {
        list.push({ ...st, schoolName: s.name, schoolId: s.id });
      });
    });
    return list;
  }, [schools]);

  const handleOpenAddStudent = () => {
    setEditingStudentId(null);
    setStudentFormData({
      name: '',
      grade: '10',
      schoolId: schools[0]?.id || 1,
      achievements: 'Xalqaro olimpiada sovrindori',
      avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
      bio: ''
    });
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student: Student & { schoolId?: number }) => {
    setEditingStudentId(student.id);
    setStudentFormData({
      name: student.name,
      grade: student.grade,
      schoolId: student.schoolId || schools[0]?.id || 1,
      achievements: student.achievements || '',
      avatar: student.avatar || '',
      bio: student.bio || ''
    });
    setIsStudentModalOpen(true);
  };

  const handleOpenAddSchool = () => {
    setEditingSchoolId(null);
    setSchoolFormData({
      name: '',
      fullName: '',
      type: 'Davlat',
      region: 'Surxondaryo',
      district: 'Angor tumani',
      address: "Surxondaryo viloyati, Angor tumani, Mustaqillik ko'chasi, 12-uy",
      director: '',
      phone: '+998 (76) 220-00-00',
      studentsCount: 950,
      teachersCount: 55,
      establishedYear: 1980,
      bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
      logoImage: ''
    });
    setIsSchoolModalOpen(true);
  };

  const handleOpenEditSchool = (school: School) => {
    setEditingSchoolId(school.id);
    setSchoolFormData({
      name: school.name,
      fullName: school.fullName,
      type: school.type,
      region: school.region,
      district: school.district,
      address: school.address || "Surxondaryo viloyati, Angor tumani, Mustaqillik ko'chasi, 12-uy",
      director: school.director || '',
      phone: school.phone || '',
      studentsCount: school.studentsCount,
      teachersCount: school.teachersCount,
      establishedYear: school.establishedYear,
      bannerImage: school.bannerImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
      logoImage: school.logoImage || ''
    });
    setIsSchoolModalOpen(true);
  };

  // Session dan token olish yordamchi funksiya
  const authHeader = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('admin_token') || ''}`
  });

  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState<boolean>(false);

  // --- SAYT SOZLAMALARI (SITE SETTINGS) STATE ---
  const [siteSettingsForm, setSiteSettingsForm] = useState({
    siteName: '1-Maktab',
    siteBadge: 'ANGOR TUMANI',
    siteTagline: 'Surxondaryo viloyati 1-sonli maktab portali',
    headerLogo: '',
    heroBadge1: 'Surxondaryo #1 Tayanch Maktabi',
    heroBadge2: "Vazir Jamg'armasi 100% Ustamasi",
    // Navigation labels
    navMain: '1-Maktab Asosiy',
    navTeachers: 'Fidoiy Ustozlar',
    navTalented: "Iqtidorli O'quvchilar",
    navSchedule: 'Dars Jadvali',
    navScheduleBadge: '2026',
    navReviews: 'Fikr va Takliflar',
  });
  const [isUploadingHeaderLogo, setIsUploadingHeaderLogo] = useState<boolean>(false);
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [settingsSuccess, setSettingsSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSiteSettingsForm(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleHeaderLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHeaderLogo(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('admin_token') || ''}`
        },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setSiteSettingsForm(prev => ({ ...prev, headerLogo: data.url }));
      } else {
        alert('Logotip yuklashda xatolik yuz berdi.');
      }
    } catch {
      alert('Server bilan aloqa yo\'q (logotip yuklashda).');
    } finally {
      setIsUploadingHeaderLogo(false);
    }
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(siteSettingsForm),
      });
      if (res.ok) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      } else {
        alert('Sozlamalarni saqlashda xatolik yuz berdi.');
      }
    } catch {
      alert('Server bilan aloqa yo\'q.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('admin_token') || ''}`
        },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setSchoolFormData(prev => ({ ...prev, bannerImage: data.url }));
      } else {
        alert('Rasm yuklashda xatolik yuz berdi.');
      }
    } catch {
      alert('Server bilan aloqa yo\'q (rasm yuklashda).');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('admin_token') || ''}`
        },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setSchoolFormData(prev => ({ ...prev, logoImage: data.url }));
      } else {
        alert('Logotip yuklashda xatolik yuz berdi.');
      }
    } catch {
      alert('Server bilan aloqa yo\'q (logotip yuklashda).');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSaveSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolFormData.name.trim()) return;

    if (editingSchoolId) {
      // --- Mavjud maktabni API orqali tahrirlash ---
      try {
        const res = await fetch(`/api/schools/${editingSchoolId}`, {
          method: 'PUT',
          headers: authHeader(),
          body: JSON.stringify({
            name: schoolFormData.name,
            fullName: schoolFormData.fullName || schoolFormData.name,
            type: schoolFormData.type,
            region: schoolFormData.region,
            district: schoolFormData.district,
            address: schoolFormData.address,
            director: schoolFormData.director,
            phone: schoolFormData.phone,
            studentsCount: Number(schoolFormData.studentsCount),
            teachersCount: Number(schoolFormData.teachersCount),
            establishedYear: Number(schoolFormData.establishedYear),
            bannerImage: schoolFormData.bannerImage,
            logoImage: schoolFormData.logoImage,
          }),
        });
        if (res.ok) {
          // Muvaffaqiyatli bo'lsa, local state ni yangilaymiz
          setSchools(prev => prev.map(s => {
            if (s.id !== editingSchoolId) return s;
            return {
              ...s,
              name: schoolFormData.name,
              fullName: schoolFormData.fullName || schoolFormData.name,
              type: schoolFormData.type,
              region: schoolFormData.region,
              district: schoolFormData.district,
              address: schoolFormData.address,
              director: schoolFormData.director,
              phone: schoolFormData.phone,
              studentsCount: Number(schoolFormData.studentsCount),
              teachersCount: Number(schoolFormData.teachersCount),
              establishedYear: Number(schoolFormData.establishedYear),
              bannerImage: schoolFormData.bannerImage,
              logoImage: schoolFormData.logoImage,
            };
          }));
        } else {
          alert('Xatolik: Maktabni tahrirlash amalga oshmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    } else {
      // --- Yangi maktabni API orqali qo'shish ---
      const payload = {
        slug: `maktab-${Date.now()}`,
        name: schoolFormData.name,
        fullName: schoolFormData.fullName || schoolFormData.name,
        type: schoolFormData.type,
        region: schoolFormData.region,
        district: schoolFormData.district,
        location: `${schoolFormData.region}, ${schoolFormData.district}`,
        address: `${schoolFormData.district}, Markaziy ko'cha`,
        phone: schoolFormData.phone,
        email: 'info@maktab.uz',
        establishedYear: Number(schoolFormData.establishedYear),
        director: schoolFormData.director,
        positivePercent: 95,
        reviewsCount: 0,
        rank: schools.length + 1,
        districtRank: 1,
        studentsCount: Number(schoolFormData.studentsCount),
        teachersCount: Number(schoolFormData.teachersCount),
        higherEducationAdmissionRate: 85,
        olympiadWinnersCount: 5,
        ratingBreakdown: { education: 4.8, teachers: 4.9, facilities: 4.6, discipline: 4.7, canteen: 4.5, sports: 4.6 },
        achievements: ['Zamonaviy axborot texnologiyalari xonalari'],
        notableTeachers: [],
        clubs: [],
        gallery: [],
        bannerImage: schoolFormData.bannerImage,
        logoBg: 'bg-blue-600 text-white',
      };
      try {
        const res = await fetch('/api/schools', {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          // Server qaytargan ID bilan qo'shamiz
          setSchools(prev => [{ ...payload, id: created.id } as any, ...prev]);
        } else {
          alert('Xatolik: Maktab qo\'shib bo\'lmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    }

    setIsSchoolModalOpen(false);
  };

  const handleDeleteSchool = async (id: number) => {
    if (id === 1) {
      alert("Angor 1-maktab asosiy tayanch maktab bo'lgani sababli o'chirilmaydi!");
      return;
    }
    if (window.confirm("Rostdan ham ushbu maktabni o'chirmoqchimisiz?")) {
      try {
        const res = await fetch(`/api/schools/${id}`, { method: 'DELETE', headers: authHeader() });
        if (res.ok) {
          setSchools(prev => prev.filter(s => s.id !== id));
        } else {
          alert('Xatolik: Maktabni o\'chirib bo\'lmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (window.confirm("Ushbu izohni o'chirishni tasdiqlaysizmi?")) {
      try {
        const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE', headers: authHeader() });
        if (res.ok) {
          setReviews(prev => prev.filter(r => r.id !== id));
        } else {
          alert('Xatolik: Fikrni o\'chirib bo\'lmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    }
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherFormData.name.trim()) return;

    if (editingTeacherId) {
      // Edit existing teacher
      try {
        const res = await fetch(`/api/teachers/${editingTeacherId}`, {
          method: 'PUT',
          headers: authHeader(),
          body: JSON.stringify(teacherFormData)
        });
        if (res.ok) {
          const updated = await res.json();
          setSchools(prev => prev.map(s => {
            if (!s.notableTeachers) return s;
            const updatedTeachers = s.notableTeachers.map(t => t.id === editingTeacherId ? { ...t, ...updated } : t);
            return { ...s, notableTeachers: updatedTeachers };
          }));
        } else {
          alert('Xatolik: Ustozni tahrirlash amalga oshmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    } else {
      // Add new teacher
      try {
        const res = await fetch('/api/teachers', {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(teacherFormData)
        });
        if (res.ok) {
          const created = await res.json();
          const targetSchoolId = Number(teacherFormData.schoolId) || schools[0]?.id || 1;
          setSchools(prev => prev.map(s => {
            if (s.id === targetSchoolId) {
              const currentTeachers = s.notableTeachers || [];
              return { ...s, notableTeachers: [created, ...currentTeachers] };
            }
            return s;
          }));
        } else {
          alert('Xatolik: Ustoz qo\'shib bo\'lmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    }

    setIsTeacherModalOpen(false);
  };

  const handleDeleteTeacher = async (id: number) => {
    if (window.confirm("Ushbu faxriy ustozni ro'yxatdan o'chirishni tasdiqlaysizmi?")) {
      try {
        const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE', headers: authHeader() });
        if (res.ok) {
          setSchools(prev => prev.map(s => {
            if (!s.notableTeachers) return s;
            return { ...s, notableTeachers: s.notableTeachers.filter(t => t.id !== id) };
          }));
        } else {
          alert('Xatolik: Ustozni o\'chirib bo\'lmadi.');
        }
      } catch {
        alert('Server bilan aloqa yo\'q.');
      }
    }
  };
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFormData.name.trim()) return;

    if (editingStudentId) {
      try {
        const res = await fetch(`/api/students/${editingStudentId}`, {
          method: 'PUT',
          headers: authHeader(),
          body: JSON.stringify(studentFormData)
        });
        if (res.ok) {
          const updated = await res.json();
          setSchools(prev => prev.map(s => {
            if (!s.talentedStudents) return s;
            const updatedStudents = s.talentedStudents.map(st => st.id === editingStudentId ? { ...st, ...updated } : st);
            return { ...s, talentedStudents: updatedStudents };
          }));
        }
      } catch {}
    } else {
      try {
        const targetSchoolId = studentFormData.schoolId || schools[0]?.id || 1;
        const res = await fetch('/api/students', {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(studentFormData)
        });
        if (res.ok) {
          const created = await res.json();
          setSchools(prev => prev.map(s => {
            if (s.id === targetSchoolId) {
              const currentStudents = s.talentedStudents || [];
              return { ...s, talentedStudents: [created, ...currentStudents] };
            }
            return s;
          }));
        }
      } catch {}
    }
    setIsStudentModalOpen(false);
  };

  const handleDeleteStudent = async (id: number) => {
    if (window.confirm("Ushbu o'quvchini ro'yxatdan o'chirishni tasdiqlaysizmi?")) {
      try {
        const res = await fetch(`/api/students/${id}`, { method: 'DELETE', headers: authHeader() });
        if (res.ok) {
          setSchools(prev => prev.map(s => {
            if (!s.talentedStudents) return s;
            return { ...s, talentedStudents: s.talentedStudents.filter(st => st.id !== id) };
          }));
        }
      } catch {}
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden animate-fadeIn">
      {/* Top Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 shadow-xs ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg">Maktablar Boshqaruv Markazi</h1>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Faol
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Angor 1-maktab & O'zbekiston Maktablari boshqaruvi</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            Chiqish
          </button>
          <button 
            onClick={onClose}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-md shadow-blue-500/20"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`w-64 border-r p-4 shrink-0 flex flex-col gap-2 ${
          isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
        }`}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Umumiy Dashboard
          </button>

          <button 
            onClick={() => setActiveTab('schools')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'schools'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
            }`}
          >
            <SchoolIcon className="w-4 h-4" />
            Maktablar Ro'yxati
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'schools' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}>
              {schools.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('teachers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'teachers'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
            }`}
          >
            <Award className="w-4 h-4" />
            Faxriy Ustozlar
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'teachers' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}>
              {allTeachers.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'students'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
            }`}
          >
            <Star className="w-4 h-4" />
            Iqtidorli O'quvchilar
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'students' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}>
              {allStudents.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'reviews'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Fikrlar va Baholar
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}>
              {reviews.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
            }`}
          >
            <Settings className="w-4 h-4" />
            Sayt Sozlamalari
          </button>

          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-xs text-blue-700 dark:text-blue-300">Tezkor Ma'lumot</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Barcha o'zgarishlar darhol saytda real vaqt rejimida aks etadi.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black">Tizim Ko'rsatkichlari</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Portalning umumiy statistikasi va monitoring</p>
                  </div>
                  <button 
                    onClick={handleOpenAddSchool}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Yangi Maktab Qo'shish
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className={`p-6 rounded-2xl border shadow-xs ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Jami Maktablar</span>
                      <SchoolIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-3xl font-black">{schools.length} ta</span>
                    <p className="text-xs text-emerald-500 font-semibold mt-2">Barcha hududlar bo'yicha</p>
                  </div>

                  <div className={`p-6 rounded-2xl border shadow-xs ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Jami Fikrlar & Baholar</span>
                      <MessageSquare className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-3xl font-black">{reviews.length} ta</span>
                    <p className="text-xs text-blue-500 font-semibold mt-2">Jamoatchilik izohlari</p>
                  </div>

                  <div className={`p-6 rounded-2xl border shadow-xs ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Angor 1-maktab Reytingi</span>
                      <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-3xl font-black text-amber-500">#1 O'rinda</span>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2">Surxondaryo viloyati</p>
                  </div>
                </div>

                {/* Quick Schools Table */}
                <div className={`rounded-2xl border overflow-hidden shadow-xs ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-sm">So'nggi ro'yxatga olingan maktablar</h3>
                    <button 
                      onClick={() => setActiveTab('schools')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-500"
                    >
                      Barchasini ko'rish &rarr;
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {schools.slice(0, 4).map(s => (
                      <div key={s.id} className="p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm">{s.name}</h4>
                          <p className="text-xs text-slate-400">{s.region}, {s.district} | O'quvchilar: {s.studentsCount} ta</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenEditSchool(s)}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100"
                          >
                            Tahrirlash
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SCHOOLS */}
            {activeTab === 'schools' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black">Maktablar Boshqaruvi</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Yangi maktab qo'shish, mavjudlarini tahrirlash va o'chirish</p>
                  </div>
                  <button 
                    onClick={handleOpenAddSchool}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Yangi Maktab Qo'shish
                  </button>
                </div>

                <div className={`rounded-2xl border overflow-hidden shadow-xs ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className={`border-b text-xs uppercase tracking-wider font-bold ${
                        isDarkMode ? 'bg-slate-800/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}>
                        <tr>
                          <th className="px-5 py-4">ID</th>
                          <th className="px-5 py-4">Maktab Nomi</th>
                          <th className="px-5 py-4">Turi</th>
                          <th className="px-5 py-4">Hudud & Tuman</th>
                          <th className="px-5 py-4">O'quvchilar</th>
                          <th className="px-5 py-4 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                        {schools.map(s => (
                          <tr key={s.id} className={isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}>
                            <td className="px-5 py-4 font-mono text-xs">#{s.id}</td>
                            <td className="px-5 py-4">
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {s.name}
                                {s.id === 1 && (
                                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">
                                    ASOSIY
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400">{s.director || 'Direktor kiritilmagan'}</p>
                            </td>
                            <td className="px-5 py-4">
                              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800">
                                {s.type}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-xs">
                              {s.region}, {s.district}
                            </td>
                            <td className="px-5 py-4 font-semibold text-xs">
                              {s.studentsCount} nafar
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleOpenEditSchool(s)}
                                  className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 rounded-lg transition-colors"
                                  title="Tahrirlash"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                {s.id !== 1 && (
                                  <button 
                                    onClick={() => handleDeleteSchool(s.id)}
                                    className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 rounded-lg transition-colors"
                                    title="O'chirish"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TEACHERS */}
            {activeTab === 'teachers' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-black flex items-center gap-2">
                      <Award className="w-6 h-6 text-amber-500" />
                      Faxriy Ustozlar Boshqaruvi
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Maktablarning yetakchi pedagoglari va Vazir jamg'armasi ustamasi sohiblarini boshqarish
                    </p>
                  </div>
                  <button 
                    onClick={handleOpenAddTeacher}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Yangi Ustoz Qo'shish
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTeachers.map(teacher => (
                    <div 
                      key={teacher.id}
                      className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:border-blue-500/40 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start gap-3.5 mb-3">
                          <img 
                            src={teacher.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'} 
                            alt={teacher.name} 
                            className="w-14 h-14 rounded-xl object-cover border border-blue-500/30 shrink-0 shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                {teacher.subject}
                              </span>
                              {teacher.isMinistryFundWinner && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                                  Vazir Ustamasi
                                </span>
                              )}
                            </div>
                            <h4 className="font-extrabold text-sm truncate">{teacher.name}</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{teacher.schoolName}</p>
                          </div>
                        </div>

                        {teacher.award && (
                          <div className="mb-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/40 dark:border-amber-900/30 text-[11px] text-amber-800 dark:text-amber-300 font-medium line-clamp-1">
                            🏆 {teacher.award}
                          </div>
                        )}

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                          {teacher.bio || `${teacher.experience || '10+ yil'} tajribaga ega pedagog.`}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-500">
                          ⭐ {teacher.rating || 5.0} / 5.0
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenEditTeacher(teacher)}
                            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold flex items-center gap-1 transition-colors"
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-bold flex items-center gap-1 transition-colors"
                            title="O'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {allTeachers.length === 0 && (
                  <div className="p-12 text-center text-slate-400">
                    <Award className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="font-bold text-base">Hozircha faxriy ustozlar kiritilmagan.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: STUDENTS */}
            {activeTab === 'students' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-black flex items-center gap-2">
                      <Star className="w-6 h-6 text-amber-500" />
                      Iqtidorli O'quvchilar
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Maktabning yutuqqa erishgan iqtidorli o'quvchilari ro'yxati</p>
                  </div>
                  <button 
                    onClick={handleOpenAddStudent}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Yangi O'quvchi Qo'shish
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allStudents.map(student => (
                    <div key={student.id} className={"p-5 rounded-3xl border flex items-start gap-4 transition-all hover:shadow-lg " + (isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm')}>
                      <img src={student.avatar || 'https://via.placeholder.com/150'} alt={student.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-blue-500">{student.grade} - sinf</span>
                            <h3 className="font-bold text-sm leading-tight mt-0.5">{student.name}</h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenEditStudent(student)} className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold" title="Tahrirlash"><PenLine className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDeleteStudent(student.id)} className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-bold" title="O'chirish"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2">{student.achievements}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black">Izohlar va Fikrlar Moderatsiyasi</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Jamoatchilik tomonidan yozilgan barcha fikrlarni nazorat qilish</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                    Jami: {reviews.length} ta fikr
                  </span>
                </div>

                <div className="grid gap-4">
                  {reviews.map(r => (
                    <div 
                      key={r.id} 
                      className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start justify-between gap-4 transition-all ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center shrink-0">
                          {r.author[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{r.author}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {r.role}
                            </span>
                            <span className="text-[10px] text-slate-400">{r.time}</span>
                          </div>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{r.schoolName}</p>
                          <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed max-w-3xl">{r.content}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDeleteReview(r.id)}
                        className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        O'chirish
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SITE SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-8 animate-fadeIn max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black">Sayt Sozlamalari</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Saytning yuqori qismi (Header), badgelar va rasmiy belgilarni boshqarish
                    </p>
                  </div>
                  {settingsSuccess && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30 animate-fadeIn">
                      <Check className="w-4 h-4" />
                      Sozlamalar muvaffaqiyatli saqlandi!
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveSiteSettings} className="space-y-6">
                  {/* Card 1: Header Sozlamalari */}
                  <div className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <div>
                        <h3 className="font-bold text-sm">Header (Saytning Yuqori Qismi)</h3>
                        <p className="text-xs text-slate-400">Logotip, sayt nomi va hudud belgisini o'zgartirish</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Sayt Asosiy Nomi</label>
                        <input 
                          type="text"
                          value={siteSettingsForm.siteName}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, siteName: e.target.value })}
                          placeholder="Masalan: 1-Maktab"
                          required
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Hudud / Tuman Belgisi (Badge)</label>
                        <input 
                          type="text"
                          value={siteSettingsForm.siteBadge}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, siteBadge: e.target.value })}
                          placeholder="Masalan: ANGOR TUMANI"
                          required
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Saytning To'liq Tavsifi (Tagline)</label>
                      <input 
                        type="text"
                        value={siteSettingsForm.siteTagline}
                        onChange={e => setSiteSettingsForm({ ...siteSettingsForm, siteTagline: e.target.value })}
                        placeholder="Masalan: Surxondaryo viloyati 1-sonli maktab portali"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Header Logotipi (Maxsus rasm)</label>
                      <div className="flex gap-3 items-center">
                        {siteSettingsForm.headerLogo && (
                          <img 
                            src={siteSettingsForm.headerLogo} 
                            alt="Header Logo" 
                            className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500 shrink-0" 
                          />
                        )}
                        <div className="flex-1 flex gap-2 items-center">
                          <input 
                            type="text"
                            value={siteSettingsForm.headerLogo}
                            onChange={e => setSiteSettingsForm({ ...siteSettingsForm, headerLogo: e.target.value })}
                            placeholder="Logo URL manzili yoki kompyuterdan tanlang..."
                            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                            }`}
                          />
                          <label className={`cursor-pointer px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center whitespace-nowrap transition-colors ${
                            isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}>
                            {isUploadingHeaderLogo ? 'Yuklanmoqda...' : 'Fayl tanlash'}
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleHeaderLogoUpload}
                              disabled={isUploadingHeaderLogo}
                            />
                          </label>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Agar bo'sh qoldirilsa, avtomatik standart rasmiy gerb ko'rinadi.</p>
                    </div>
                  </div>

                  {/* Card 2: Hero Badgelari */}
                  <div className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <Award className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="font-bold text-sm">Bosh Sahifa (Hero) Yutuq Belgilari (Badges)</h3>
                        <p className="text-xs text-slate-400">Bosh sahifa orqa fon rasmi ustidagi yorliqlar</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-amber-500 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          1-Badge Matni (Sariq Kubok belgisi bilan)
                        </label>
                        <input 
                          type="text"
                          value={siteSettingsForm.heroBadge1}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, heroBadge1: e.target.value })}
                          placeholder="Masalan: Surxondaryo #1 Tayanch Maktabi"
                          required
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-blue-400 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          2-Badge Matni (Vazir ustamasi belgisi bilan)
                        </label>
                        <input 
                          type="text"
                          value={siteSettingsForm.heroBadge2}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, heroBadge2: e.target.value })}
                          placeholder="Masalan: Vazir Jamg'armasi 100% Ustamasi"
                          required
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                    </div>
                  </div>


                  {/* Card 3: Navigatsiya Menyu Matnlari */}
                  <div className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <Layout className="w-5 h-5 text-indigo-500" />
                      <div>
                        <h3 className="font-bold text-sm">Navigatsiya Menyu Matnlari</h3>
                        <p className="text-xs text-slate-400">Saytning yuqori menyusidagi barcha tugmalar yozuvlarini o'zgartirish</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">🏫 Asosiy Sahifa tugmasi</label>
                        <input
                          type="text"
                          value={siteSettingsForm.navMain}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, navMain: e.target.value })}
                          placeholder="1-Maktab Asosiy"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">🎖️ Fidoiy Ustozlar tugmasi</label>
                        <input
                          type="text"
                          value={siteSettingsForm.navTeachers}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, navTeachers: e.target.value })}
                          placeholder="Fidoiy Ustozlar"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">🌟 Iqtidorli O'quvchilar tugmasi</label>
                        <input
                          type="text"
                          value={siteSettingsForm.navTalented}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, navTalented: e.target.value })}
                          placeholder="Iqtidorli O'quvchilar"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">📅 Dars Jadvali tugmasi matni</label>
                        <input
                          type="text"
                          value={siteSettingsForm.navSchedule}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, navSchedule: e.target.value })}
                          placeholder="Dars Jadvali"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">📅 Dars Jadvali badge (yil belgisi)</label>
                        <input
                          type="text"
                          value={siteSettingsForm.navScheduleBadge}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, navScheduleBadge: e.target.value })}
                          placeholder="2026"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">💬 Fikr va Takliflar tugmasi matni</label>
                        <input
                          type="text"
                          value={siteSettingsForm.navReviews}
                          onChange={e => setSiteSettingsForm({ ...siteSettingsForm, navReviews: e.target.value })}
                          placeholder="Fikr va Takliflar"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isSavingSettings ? 'Saqlanmoqda...' : 'Barcha Sozlamalarni Saqlash'}
                    </button>
                  </div>
                </form>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modal: Add or Edit School */}
      {isSchoolModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border my-8 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">
                {editingSchoolId ? 'Maktabni Tahrirlash' : 'Yangi Maktab Qo\'shish'}
              </h3>
              <button 
                onClick={() => setIsSchoolModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveSchool} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Maktab Qisqa Nomi</label>
                <input 
                  type="text" 
                  value={schoolFormData.name}
                  onChange={e => setSchoolFormData({ ...schoolFormData, name: e.target.value })}
                  placeholder="Masalan: Angor 1-maktab"
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Maktab To'liq Rasmiy Nomi</label>
                <input 
                  type="text" 
                  value={schoolFormData.fullName}
                  onChange={e => setSchoolFormData({ ...schoolFormData, fullName: e.target.value })}
                  placeholder="Surxondaryo viloyati Angor tumani 1-sonli..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Viloyat / Hudud</label>
                  <input 
                    type="text" 
                    value={schoolFormData.region}
                    onChange={e => setSchoolFormData({ ...schoolFormData, region: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Tuman / Shahar</label>
                  <input 
                    type="text" 
                    value={schoolFormData.district}
                    onChange={e => setSchoolFormData({ ...schoolFormData, district: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Maktab Manzili</label>
                <input 
                  type="text" 
                  value={schoolFormData.address}
                  onChange={e => setSchoolFormData({ ...schoolFormData, address: e.target.value })}
                  placeholder="Surxondaryo viloyati, Angor tumani, Mustaqillik ko'chasi, 12-uy"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Direktor F.I.SH</label>
                  <input 
                    type="text" 
                    value={schoolFormData.director}
                    onChange={e => setSchoolFormData({ ...schoolFormData, director: e.target.value })}
                    placeholder="Direktor ismi"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Telefon Raqami</label>
                  <input 
                    type="text" 
                    value={schoolFormData.phone}
                    onChange={e => setSchoolFormData({ ...schoolFormData, phone: e.target.value })}
                    placeholder="+998 (76) 220-00-00"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">O'quvchilar</label>
                  <input 
                    type="number" 
                    value={schoolFormData.studentsCount}
                    onChange={e => setSchoolFormData({ ...schoolFormData, studentsCount: Number(e.target.value) })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Ustozlar</label>
                  <input 
                    type="number" 
                    value={schoolFormData.teachersCount}
                    onChange={e => setSchoolFormData({ ...schoolFormData, teachersCount: Number(e.target.value) })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Tashkil yili</label>
                  <input 
                    type="number" 
                    value={schoolFormData.establishedYear}
                    onChange={e => setSchoolFormData({ ...schoolFormData, establishedYear: Number(e.target.value) })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Asosiy Rasm (Orqa fon)</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    value={schoolFormData.bannerImage}
                    onChange={e => setSchoolFormData({ ...schoolFormData, bannerImage: e.target.value })}
                    placeholder="URL manzili..."
                    className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <label className={`cursor-pointer px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center transition-colors ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}>
                    {isUploadingImage ? 'Yuklanmoqda...' : 'Fayl tanlash'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Maktab Logotipi</label>
                <div className="flex gap-3 items-center">
                  {schoolFormData.logoImage && (
                    <img
                      src={schoolFormData.logoImage}
                      alt="Logo preview"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shrink-0"
                    />
                  )}
                  <div className="flex-1 flex gap-2 items-center">
                    <input
                      type="text"
                      value={schoolFormData.logoImage}
                      onChange={e => setSchoolFormData({ ...schoolFormData, logoImage: e.target.value })}
                      placeholder="Logo URL manzili..."
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                    <label className={`cursor-pointer px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center whitespace-nowrap transition-colors ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}>
                      {isUploadingLogo ? 'Yuklanmoqda...' : 'Fayl tanlash'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                        disabled={isUploadingLogo}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsSchoolModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className={"w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border my-8 " + (isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900')}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black">
                {editingStudentId ? 'O\'quvchini Tahrirlash' : 'Yangi O\'quvchi Qo\'shish'}
              </h2>
              <button onClick={() => setIsStudentModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">O'quvchi Ism Sharifi</label>
                <input type="text" value={studentFormData.name} onChange={e => setStudentFormData({...studentFormData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-transparent font-medium" placeholder="Masalan: To'xtayev Sardor" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Sinf</label>
                  <input type="text" value={studentFormData.grade} onChange={e => setStudentFormData({...studentFormData, grade: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-transparent font-medium" placeholder="Masalan: 10" required />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Maktab</label>
                  <select value={studentFormData.schoolId} onChange={e => setStudentFormData({...studentFormData, schoolId: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border bg-transparent font-medium">
                    {schools.map(s => <option key={s.id} value={s.id} className="text-slate-900">{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Yutuqlari (Qisqacha)</label>
                <input type="text" value={studentFormData.achievements} onChange={e => setStudentFormData({...studentFormData, achievements: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-transparent font-medium" placeholder="Masalan: Respublika Matematika olimpiadasi g'olibi" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Rasm</label>
                {/* Preview */}
                {studentFormData.avatar && (
                  <img src={studentFormData.avatar} alt="preview" className="w-16 h-16 rounded-xl object-cover mb-2 border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <div className="flex gap-2">
                  <input type="text" value={studentFormData.avatar} onChange={e => setStudentFormData({...studentFormData, avatar: e.target.value})} className="flex-1 px-3 py-2.5 rounded-xl border bg-transparent font-medium text-xs" placeholder="https://... yoki fayl tanla" />
                  <label className="cursor-pointer px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 shrink-0">
                    📁 Fayl
                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setStudentFormData({...studentFormData, avatar: ev.target?.result as string});
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Batafsil ma'lumot</label>
                <textarea value={studentFormData.bio} onChange={e => setStudentFormData({...studentFormData, bio: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-transparent font-medium h-24 resize-none" placeholder="O'quvchi haqida qo'shimcha ma'lumotlar..."></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setIsStudentModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Bekor qilish</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Teacher */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border my-8 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                {editingTeacherId ? 'Ustoz Ma\'lumotlarini Tahrirlash' : 'Yangi Faxriy Ustoz Qo\'shish'}
              </h3>
              <button 
                onClick={() => setIsTeacherModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Ustoz F.I.SH (Ism Sharif)</label>
                <input 
                  type="text" 
                  value={teacherFormData.name}
                  onChange={e => setTeacherFormData({ ...teacherFormData, name: e.target.value })}
                  placeholder="Masalan: Fazliddin Kenjayev"
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Mutaxassislik Fani</label>
                  <input 
                    type="text" 
                    value={teacherFormData.subject}
                    onChange={e => setTeacherFormData({ ...teacherFormData, subject: e.target.value })}
                    placeholder="Masalan: Tarix fani"
                    required
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Ish Tajribasi</label>
                  <input 
                    type="text" 
                    value={teacherFormData.experience}
                    onChange={e => setTeacherFormData({ ...teacherFormData, experience: e.target.value })}
                    placeholder="Masalan: 15 yil"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Tegishli Maktab</label>
                <select
                  value={teacherFormData.schoolId}
                  onChange={e => setTeacherFormData({ ...teacherFormData, schoolId: Number(e.target.value) })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.district})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Mukofot va Unvonlar</label>
                <input 
                  type="text" 
                  value={teacherFormData.award}
                  onChange={e => setTeacherFormData({ ...teacherFormData, award: e.target.value })}
                  placeholder="Masalan: Vazir jamg'armasi 100% ustamasi sohibi"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Rasm (Avatar)</label>
                {/* Preview */}
                {teacherFormData.avatar && (
                  <img src={teacherFormData.avatar} alt="preview" className="w-16 h-16 rounded-xl object-cover mb-2 border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={teacherFormData.avatar}
                    onChange={e => setTeacherFormData({ ...teacherFormData, avatar: e.target.value })}
                    placeholder="https://... yoki fayl tanla"
                    className={`flex-1 px-3 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <label className="cursor-pointer px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 shrink-0">
                    📁 Fayl
                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setTeacherFormData({ ...teacherFormData, avatar: ev.target?.result as string });
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                <input 
                  type="checkbox" 
                  id="ministryFundTeacher"
                  checked={teacherFormData.isMinistryFundWinner}
                  onChange={e => setTeacherFormData({ ...teacherFormData, isMinistryFundWinner: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="ministryFundTeacher" className="text-xs font-bold text-amber-900 dark:text-amber-300 cursor-pointer">
                  Vazir Jamg'armasi 100% ustamasiga ega
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase text-slate-400">Qisqacha Ma'lumot / Bio</label>
                <textarea 
                  value={teacherFormData.bio}
                  onChange={e => setTeacherFormData({ ...teacherFormData, bio: e.target.value })}
                  placeholder="Ustozning o'quvchilari yutuqlari, olimpiada natijalari..."
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsTeacherModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
