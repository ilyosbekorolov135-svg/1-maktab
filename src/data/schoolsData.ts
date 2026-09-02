import { School, Review, OlympiadWinner, MediaItem } from '../types';
import { angorSchoolFacade, angorSchoolLogo, angorSchoolCampus } from '../assets/images/images';

export const SCHOOLS_DATA: School[] = [
  {
    id: 1,
    slug: 'angor-1-maktab',
    name: 'Angor Tumani 1-Maktab',
    fullName: 'Surxondaryo viloyati Angor tumani 1-sonli umumiy o\'rta ta\'lim maktabi',
    type: 'Davlat',
    region: 'Surxondaryo',
    district: 'Angor tumani',
    location: 'Angor shaharchasi',
    address: 'Surxondaryo viloyati, Angor tumani, Mustaqillik ko\'chasi, 12-uy',
    phone: '+998 (76) 242-15-40',
    email: 'angor1maktab@maktab.uz',
    establishedYear: 1968,
    director: 'Qobilov Rustam Ergashevich',
    positivePercent: 98,
    reviewsCount: 186,
    rank: 1,
    districtRank: 1,
    studentsCount: 1280,
    teachersCount: 88,
    higherEducationAdmissionRate: 91.5,
    olympiadWinnersCount: 34,
    ratingBreakdown: {
      education: 4.9,
      teachers: 5.0,
      facilities: 4.7,
      discipline: 4.9,
      canteen: 4.6,
      sports: 4.8
    },
    achievements: [
      'Surxondaryo viloyati bo\'yicha "Yilning eng namunali umumta\'lim maktabi" g\'olibi',
      'Tuman "Zakovat" intellektual turnirlari doimiy mezbon markazi',
      'Al-Xorazmiy nomidagi yosh matematiklar va iqtidorli yoshlar olimpiadasi tayanch maktabi',
      'Maktab o\'quvchilarining ijodiy maqola va she\'rlari "Gulxan" va "G\'uncha" jurnallarida chop etilgan',
      '2 nafar tarix fani o\'qituvchisi Vazir jamg\'armasining oylik 100% ustamasiga sazovor bo\'lgan'
    ],
    notableTeachers: [
      {
        id: 101,
        name: 'Fazliddin Kenjayev',
        subject: 'Tarix fani o\'qituvchisi',
        role: 'Oliy toifali pedagog, Metodist',
        experience: '18 yil',
        award: 'Vazir jamg\'armasi 100% ustamasi sohibi, "Xalq ta\'limi a\'lochisi"',
        isMinistryFundWinner: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'O\'quvchilari respublika va viloyat tarix fan olimpiadalari g\'olibi. Yangi pedagogik texnologiyalar bo\'yicha bir qancha uslubiy qo\'llanmalar muallifi.',
        rating: 5.0
      },
      {
        id: 102,
        name: 'Guliston Kuvatova',
        subject: 'Tarix fani o\'qituvchisi',
        role: 'Oliy toifali o\'qituvchi',
        experience: '16 yil',
        award: 'Vazir jamg\'armasi ustamasi sohibi, Tuman ilg\'or o\'qituvchisi',
        isMinistryFundWinner: true,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        bio: 'Interaktiv dars usullari va milliy tariximizni o\'rganish bo\'yicha viloyat miqyosida ochiq darslar tashkilotchisi.',
        rating: 4.9
      },
      {
        id: 103,
        name: 'Shoxista Madiyeva',
        subject: 'Ona tili va adabiyot',
        role: 'To\'garak rahbari, Ijodiy ustoz',
        experience: '12 yil',
        award: 'Angor tumani "Zakovat" klubi faoli, "Eng yaxshi to\'garak rahbari"',
        isMinistryFundWinner: false,
        avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
        bio: 'O\'quvchilarni adabiy ijodga va intellektual o\'yinlarga tayyorlaydi. O\'quvchilari respublika gazeta-jurnallarida ijodiy ishlari bilan muntazam qatnashadi.',
        rating: 4.9
      },
      {
        id: 104,
        name: 'Sherzod Norboyev',
        subject: 'Matematika va Informatika',
        role: 'Oliy toifali o\'qituvchi',
        experience: '14 yil',
        award: 'Al-Xorazmiy olimpiadasi tuman koordinatori',
        isMinistryFundWinner: false,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        bio: 'Robototexnika va dasturlash bo\'yicha ixtisoslashgan to\'garak rahbari. 10 dan ortiq o\'quvchilari IT olimpiadalarda g\'olib bo\'lgan.',
        rating: 4.8
      }
    ],
    clubs: [
      {
        id: 1,
        name: 'Zakovat Intellektual Klubi',
        leader: 'Shoxista Madiyeva',
        schedule: 'Seshanba, Payshanba 14:30',
        icon: 'brain',
        description: 'Mantiqiy fikrlash, zakovat bellashuvlari va breyn-ring musobaqalariga tayyorgarlik.',
        studentsCount: 45
      },
      {
        id: 2,
        name: 'Al-Xorazmiy Yosh Matematiklar',
        leader: 'Sherzod Norboyev',
        schedule: 'Dushanba, Chorshanba 15:00',
        icon: 'calculator',
        description: 'Murakkab olimpiada masalalari va xalqaro matematik bellashuvlarga tayyorlov.',
        studentsCount: 38
      },
      {
        id: 3,
        name: 'Yosh Qalamkashlar & Jurnalistika',
        leader: 'Guliston Kuvatova',
        schedule: 'Juma 14:00',
        icon: 'pen',
        description: 'Insho, badiiy ijod, maqola yozish mahorati va "Gulxan" jurnali tahririyati bilan hamkorlik.',
        studentsCount: 30
      },
      {
        id: 4,
        name: 'Future IT & Robototexnika',
        leader: 'Jamshid Rahimov',
        schedule: 'Shanba 11:00',
        icon: 'cpu',
        description: 'Python dasturlash, veb-dasturlash asoslari va robot yasash amaliyotlari.',
        studentsCount: 52
      }
    ],
    gallery: [
      angorSchoolFacade,
      angorSchoolCampus,
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80'
    ],
    videos: [
      {
        id: 'v_yosh_dasturchilar',
        title: "Yosh dasturchilar va robototexniklar ko'rigi",
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80',
        category: 'Tadbir',
        duration: '1:38 daq',
        description: "Angor 1-maktabining IT va robototexnika to'garagi o'quvchilari — yosh ixtirochilar va dasturchilar faoliyati haqida MY5 telekanali 'Hudud' dasturida maxsus lavha.",
        date: '2026-08-25'
      },
      {
        id: 'v1',
        title: "Angor 1-maktab — Kampus bo'ylab 3D Virtual Ekskursiya",
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: angorSchoolFacade,
        category: 'Virtual Tur',
        duration: '4:20 daq',
        description: "Maktab binosi, zamonaviy jihozlangan sinfxonalar, axborot-resurs markazi, sport majmuasi va faollar zali bo'ylab to'liq video tanishtiruv.",
        date: '2026-08-20'
      },
      {
        id: 'v2',
        title: "Tuman \"Zakovat\" intellektual turniri va g'oliblik shukuhi",
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80',
        category: 'Zakovat',
        duration: '3:15 daq',
        description: "Angor tuman maktablari o'rtasida o'tkazilgan intellektual turnir, murosasiz savol-javoblar va faxrli 1-o'rin sohiblarini taqdirlash marosimi.",
        date: '2026-08-15'
      },
      {
        id: 'v3',
        title: "STEAM va Fan laboratoriyalarida amaliy darslar",
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1000&auto=format&fit=crop&q=80',
        category: 'Dars jarayoni',
        duration: '2:45 daq',
        description: "Kimyo, biologiya va fizika fanlaridan laboratoriya tajribalari hamda o'quvchilarning mustaqil ilmiy izlanishlari jarayoni.",
        date: '2026-08-10'
      },
      {
        id: 'v_insta_surxon',
        title: 'Surxon Kelajak Markazi — Jonli efir va yangiliklar',
        url: 'https://www.instagram.com/surxon_kelajak_markazi?igsh=MXkxdTFmcWU5MGVncg%3D%3D&utm_source=qr',
        thumbnail: angorSchoolCampus,
        category: 'Virtual Tur',
        duration: 'Instagram',
        description: "Surxon Kelajak Markazi rasmiy sahifasi orqali maktabimizdagi zamonaviy ta'lim jarayonlari, to'garaklar va e'lonlarni kuzating.",
        date: '2026-08-05'
      }
    ],
    bannerImage: angorSchoolFacade,
    logoImage: angorSchoolLogo,
    logoBg: 'bg-blue-900 text-white',
    isFeatured: true
  },
  {
    id: 2,
    slug: 'al-xorazmiy-it-maktabi',
    name: 'Al-Xorazmiy IT Maktabi',
    fullName: 'Muhammad al-Xorazmiy nomidagi axborot-kommunikatsiya texnologiyalari yo\'nalishiga oid fanlarni chuqurlashtirib o\'qitishga ixtisoslashtirilgan tayanch maktabi',
    type: 'Ixtisoslashgan',
    region: 'Toshkent',
    district: 'Yashnobod tumani',
    location: 'Toshkent shahri',
    address: 'Toshkent shahri, Yashnobod tumani, Maxtumquli ko\'chasi, 1-a uy',
    phone: '+998 (71) 207-00-50',
    email: 'info@ictschool.uz',
    establishedYear: 2017,
    director: 'Nurmamatov Bobur Shokirovich',
    positivePercent: 97,
    reviewsCount: 142,
    rank: 2,
    districtRank: 1,
    studentsCount: 960,
    teachersCount: 78,
    higherEducationAdmissionRate: 98.2,
    olympiadWinnersCount: 52,
    ratingBreakdown: {
      education: 4.9,
      teachers: 4.9,
      facilities: 5.0,
      discipline: 4.8,
      canteen: 4.7,
      sports: 4.6
    },
    achievements: [
      'Xalqaro IT va dasturlash olimpiadasi g\'oliblari',
      '100% kompyuterlashtirilgan zamonaviy STEAM laboratoriyalari',
      'O\'quvchilari AQSH, Germaniya va Yaponiya nufuzli OTMlariga grant yutgan'
    ],
    notableTeachers: [
      {
        id: 201,
        name: 'Sunnatullo Qosimov',
        subject: 'Sun\'iy intellekt va Robototexnika',
        experience: '10 yil',
        award: 'Xalqaro IT murabbiyi',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        bio: 'Xalqaro musobaqalarga tayyorlovchi yetakchi ekspert.',
        rating: 4.9
      }
    ],
    clubs: [],
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    logoBg: 'bg-emerald-600 text-white'
  },
  {
    id: 3,
    slug: 'termiz-prezident-maktabi',
    name: 'Prezident Maktabi (Termiz)',
    fullName: 'Surxondaryo viloyati Termiz shahridagi Prezident maktabi',
    type: 'Prezident',
    region: 'Surxondaryo',
    district: 'Termiz shahri',
    location: 'Termiz shahri',
    address: 'Surxondaryo viloyati, Termiz shahri, Al-Hakim at-Termiziy shox ko\'chasi',
    phone: '+998 (76) 228-01-01',
    email: 'termiz@piima.uz',
    establishedYear: 2021,
    director: 'James Anderson / Mahmudov Otabek',
    positivePercent: 99,
    reviewsCount: 88,
    rank: 3,
    districtRank: 1,
    studentsCount: 168,
    teachersCount: 38,
    higherEducationAdmissionRate: 100,
    olympiadWinnersCount: 41,
    ratingBreakdown: {
      education: 5.0,
      teachers: 5.0,
      facilities: 5.0,
      discipline: 4.9,
      canteen: 4.9,
      sports: 4.9
    },
    achievements: [
      'Cambridge xalqaro ta\'lim dasturi bo\'yicha to\'liq akkreditatsiya',
      'O\'quvchilar IELTS o\'rtacha ko\'rsatkichi 7.5+',
      'Xalqaro fan olimpiadalari g\'oliblari'
    ],
    notableTeachers: [],
    clubs: [],
    gallery: [
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&auto=format&fit=crop&q=80',
    logoBg: 'bg-purple-600 text-white'
  },
  {
    id: 4,
    slug: 'termiz-1-idum',
    name: 'Termiz 1-IDUM',
    fullName: 'Termiz shahri 1-sonli davlat ixtisoslashtirilgan umumta\'lim maktab-internati',
    type: 'Ixtisoslashgan',
    region: 'Surxondaryo',
    district: 'Termiz shahri',
    location: 'Termiz shahri',
    address: 'Termiz shahri, Navoiy ko\'chasi, 45-uy',
    phone: '+998 (76) 223-45-12',
    email: 'termiz1idum@surxon.uz',
    establishedYear: 1994,
    director: 'Berdiyev Sobir Mamatovich',
    positivePercent: 94,
    reviewsCount: 76,
    rank: 4,
    districtRank: 2,
    studentsCount: 1050,
    teachersCount: 76,
    higherEducationAdmissionRate: 89.0,
    olympiadWinnersCount: 22,
    ratingBreakdown: {
      education: 4.7,
      teachers: 4.8,
      facilities: 4.5,
      discipline: 4.6,
      canteen: 4.4,
      sports: 4.5
    },
    achievements: [
      'Aniq fanlar bo\'yicha viloyat yetakchilaridan biri',
      'Har yili 50+ nafar bitiruvchi C1/B2 chet tili sertifikatiga ega bo\'ladi'
    ],
    notableTeachers: [],
    clubs: [],
    gallery: [],
    bannerImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    logoBg: 'bg-indigo-600 text-white'
  },
  {
    id: 5,
    slug: 'ziyo-zukko-maktabi',
    name: 'Ziyo Zukko Maktabi',
    fullName: 'Ziyo Zukko zamonaviy xususiy nodavlat ta\'lim muassasasi',
    type: 'Xususiy',
    region: 'Toshkent',
    district: 'Mirzo Ulug\'bek tumani',
    location: 'Toshkent shahri',
    address: 'Toshkent shahri, Mirzo Ulug\'bek tumani, Ziyolilar ko\'chasi, 33',
    phone: '+998 (71) 200-88-00',
    email: 'contact@ziyozukko.uz',
    establishedYear: 2019,
    director: 'G\'aniyeva Nilufar Ilhomovna',
    positivePercent: 96,
    reviewsCount: 54,
    rank: 5,
    districtRank: 2,
    studentsCount: 520,
    teachersCount: 48,
    higherEducationAdmissionRate: 95.0,
    olympiadWinnersCount: 18,
    ratingBreakdown: {
      education: 4.8,
      teachers: 4.9,
      facilities: 4.9,
      discipline: 4.7,
      canteen: 4.9,
      sports: 4.8
    },
    achievements: [
      '3 mahal organik issiq ovqat va shaxsiy basseyn',
      'Ingliz va nemis tillarini xorijiy mutaxassislar o\'qitadi'
    ],
    notableTeachers: [],
    clubs: [],
    gallery: [],
    bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    logoBg: 'bg-amber-600 text-white'
  },
  {
    id: 6,
    slug: 'denov-2-maktab',
    name: 'Denov 2-maktab',
    fullName: 'Surxondaryo viloyati Denov tumani 2-sonli umumiy o\'rta ta\'lim maktabi',
    type: 'Davlat',
    region: 'Surxondaryo',
    district: 'Denov tumani',
    location: 'Denov shahri',
    address: 'Surxondaryo viloyati, Denov shahri, Sh. Rashidov ko\'chasi',
    phone: '+998 (76) 362-11-20',
    email: 'denov2maktab@surxon.uz',
    establishedYear: 1974,
    director: 'Xoliqov Bahrom Rustamovich',
    positivePercent: 92,
    reviewsCount: 42,
    rank: 6,
    districtRank: 1,
    studentsCount: 1140,
    teachersCount: 72,
    higherEducationAdmissionRate: 85.4,
    olympiadWinnersCount: 16,
    ratingBreakdown: {
      education: 4.6,
      teachers: 4.6,
      facilities: 4.4,
      discipline: 4.5,
      canteen: 4.2,
      sports: 4.7
    },
    achievements: [
      'Sport va yengil atletika bo\'yicha viloyat chempioni maktab',
      'Kimyo va biologiya laboratoriyalari namunaviy jihozlangan'
    ],
    notableTeachers: [],
    clubs: [],
    gallery: [],
    bannerImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80',
    logoBg: 'bg-teal-600 text-white'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Fazliddin Kenjayev",
    role: "Ustoz",
    tagNumber: "#14",
    schoolId: 1,
    schoolName: "Angor 1-maktab",
    authorDetail: "Tarix fani o'qituvchisi, Vazir jamg'armasi ustamasi sohibi",
    time: "Kecha, 18:40",
    content: "Angor 1-maktabimizda o'quvchilarning ilmga chanqoqligi bizni har kuni yangi metodlar ustida ishlashga undaydi. Maktabimizda o'tkazilgan tuman Zakovat intellektual bellashuvi va Al-Xorazmiy olimpiadasi saralash bosqichlari juda yuqori saviyada bo'lib o'tdi. Ilm yo'lida barchaga omad! 👏📚",
    sentiment: "Ijobiy",
    category: "Ta'lim",
    upvotes: 42,
    downvotes: 1,
    score: "41 ball",
    userVoted: 'up',
    comments: [
      {
        id: 101,
        author: "Shoxista Madiyeva",
        role: "Ustoz",
        date: "Kecha, 19:15",
        content: "Haqiqatan ham, Fazliddin aka! O'quvchilarimiz Zakovat to'garagida ajoyib natijalar ko'rsatmoqda.",
        upvotes: 12
      },
      {
        id: 102,
        author: "Alisher Nurmatov",
        role: "Ota-ona",
        date: "Bugun, 09:30",
        content: "Farzandim shu maktabda o'qiyotganidan faxrlanaman, ustozlarga ming rahmat!",
        upvotes: 8
      }
    ]
  },
  {
    id: 2,
    author: "Ziyoda Xudoyberdiyeva",
    role: "O'quvchi",
    tagNumber: "#88",
    schoolId: 1,
    schoolName: "Angor 1-maktab",
    authorDetail: "9-'A' sinf o'quvchisi, Zakovat jamoasi sardori",
    time: "2 kun oldin",
    content: "Maktabimizda Shoxista Madiyeva va Guliston Kuvatova ustozlarimiz boshchiligidagi ijodiy to'garaklar juda zo'r! O'tgan oy yozgan insho va she'rlarimiz 'Gulxan' jurnalida chop etildi. Bizning maktab eng zo'ri! ✨🏆",
    sentiment: "Ijobiy",
    category: "Tadbirlar",
    upvotes: 35,
    downvotes: 0,
    score: "35 ball",
    comments: []
  },
  {
    id: 3,
    author: "Dilmurod Rahmonov",
    role: "Ota-ona",
    tagNumber: "#104",
    schoolId: 1,
    schoolName: "Angor 1-maktab",
    authorDetail: "5-sinf o'quvchisi otasi, Angor tumani",
    time: "3 kun oldin",
    content: "Ta'lim sifati va intizomga gap yo'q, o'qituvchilar talabchan. Faqat sport maydonchasi sun'iy qoplamasini yangilash va qishki isitish tizimiga qo'shimcha e'tibor qaratilsa nur ustiga a'lo bo'lar edi.",
    sentiment: "Taklif",
    category: "Sharoit",
    upvotes: 19,
    downvotes: 2,
    score: "17 ball",
    comments: []
  },
  {
    id: 4,
    author: "Jasur Bekmirzayev",
    role: "Bitiruvchi",
    tagNumber: "#202",
    schoolId: 2,
    schoolName: "Al-Xorazmiy IT Maktabi",
    authorDetail: "TATU talabasi, 2023-yil bitiruvchisi",
    time: "5 kun oldin",
    content: "Dasturlash va matematika bo'yicha berilgan poydevor universitetda juda qo'l kelmoqda. Laboratoriyalar zamonaviy, faqat oshxonadagi tushlik menyusini yanada boyitish kerak deb o'ylayman.",
    sentiment: "Taklif",
    category: "Oshxona",
    upvotes: 24,
    downvotes: 3,
    score: "21 ball",
    comments: []
  },
  {
    id: 5,
    author: "Malika Yusupova",
    role: "Ota-ona",
    tagNumber: "#310",
    schoolId: 3,
    schoolName: "Prezident Maktabi (Termiz)",
    authorDetail: "8-sinf o'quvchisi onasi",
    time: "1 hafta oldin",
    content: "Cambridge tizimi bo'yicha berilayotgan darslar darajasi xalqaro standartda. Xorijiy ustozlar dars beradi, bolalar ingliz tilida erkin fikrlay oladi.",
    sentiment: "Ijobiy",
    category: "Ta'lim",
    upvotes: 48,
    downvotes: 1,
    score: "47 ball",
    comments: []
  }
];

export const OLYMPIAD_WINNERS: OlympiadWinner[] = [
  {
    id: 1,
    studentName: "Mironshox Kenjayev",
    grade: "10-sinf",
    subject: "Tarix",
    competition: "Respublika Fan Olimpiadasi",
    place: "1-o'rin (Oltin medal)",
    schoolName: "Angor 1-maktab",
    teacherName: "Fazliddin Kenjayev",
    year: "2024"
  },
  {
    id: 2,
    studentName: "Mohinur Boboyeva",
    grade: "9-sinf",
    subject: "Ona tili va adabiyot",
    competition: "Viloyat 'Zakovat' va Insholar tanlovi",
    place: "1-o'rin",
    schoolName: "Angor 1-maktab",
    teacherName: "Shoxista Madiyeva",
    year: "2024"
  },
  {
    id: 3,
    studentName: "Akromjon Saidov",
    grade: "11-sinf",
    subject: "Informatika va Dasturlash",
    competition: "Xalqaro IT Olimpiadasi",
    place: "2-o'rin (Kumush medal)",
    schoolName: "Al-Xorazmiy IT Maktabi",
    teacherName: "Sunnatullo Qosimov",
    year: "2024"
  },
  {
    id: 4,
    studentName: "Shahzoda Ortiqova",
    grade: "8-sinf",
    subject: "Matematika",
    competition: "Al-Xorazmiy tuman olimpiadasi",
    place: "1-o'rin",
    schoolName: "Angor 1-maktab",
    teacherName: "Sherzod Norboyev",
    year: "2024"
  }
];

export const ANGOR_MEDIA_GALLERY: MediaItem[] = [
  {
    id: 'm1',
    type: 'image',
    url: angorSchoolFacade,
    title: 'Maktab binosi va bosh fasad ko\'rinishi',
    description: 'Angor 1-sonli maktabning obodonlashtirilgan hududi va zamonaviy o\'quv binosi',
    category: 'Umumiy',
    uploadedAt: '2026-08-26',
    authorName: 'Maktab Ma\'muriyati'
  },
  {
    id: 'm_campus',
    type: 'image',
    url: angorSchoolCampus,
    title: 'Maktab hovlisi va obod bog\' hududi',
    description: 'Yashil makon umummilliy loyihasi doirasida obodonlashtirilgan maktab hududi va sport maydonchalari',
    category: 'Umumiy',
    uploadedAt: '2026-08-25',
    authorName: 'Maktab Ma\'muriyati'
  },
  {
    id: 'm2',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80',
    title: 'Tuman "Zakovat" intellektual turniri final bosqichi',
    description: 'Angor 1-maktabi jamoasining tuman bosqichidagi yorqin g\'alabasi va taqdirlash marosimi',
    category: 'Zakovat',
    uploadedAt: '2026-08-15',
    authorName: 'Shoxista Madiyeva',
    videoDuration: '3:45'
  },
  {
    id: 'm3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&auto=format&fit=crop&q=80',
    title: 'Tarix fani ochiq darsi jarayoni',
    description: 'Fazliddin Kenjayev va Guliston Kuvatova tomonidan o\'tkazilgan qadimiy Surxondaryo tarixi darsi',
    category: 'Dars jarayoni',
    uploadedAt: '2026-08-10',
    authorName: 'Fazliddin Kenjayev'
  },
  {
    id: 'm4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80',
    title: '1-Sinf o\'quvchilariga "Alifbe" bayrami va "Bilimlar kuni"',
    description: 'Yangi o\'quv yili boshlanishiga bag\'ishlangan bayram tantanasi',
    category: 'Tadbir',
    uploadedAt: '2026-08-01',
    authorName: 'Ota-onalar qo\'mitasi'
  },
  {
    id: 'm5',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80',
    title: 'Robototexnika va IT to\'garagi amaliy loyihalari',
    description: 'O\'quvchilar yasagan aqlli robotlar va dasturlash namunalarining namoyishi',
    category: 'Olimpiada',
    uploadedAt: '2026-07-28',
    authorName: 'Sherzod Norboyev',
    videoDuration: '2:15'
  },
  {
    id: 'm6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
    title: 'Tumanlararo mini-futbol va voleybol chempionati',
    description: 'Maktab sport zalida o\'quvchilar o\'rtasida o\'tkazilgan "Besh tashabbus" sport bellashuvlari',
    category: 'Sport',
    uploadedAt: '2026-07-15',
    authorName: 'Jismoniy tarbiya fani birlashmasi'
  }
];

