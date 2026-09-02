export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Oson' | 'O\'rta' | 'Qiyin';
  points: number;
}

export interface QuizCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badge: string;
  questionsCount: number;
  timePerQuestion: number; // seconds
  description: string;
  questions: QuizQuestion[];
}

export interface QuizLeader {
  id: number;
  name: string;
  school: string;
  score: number;
  accuracy: number;
  category: string;
  timeSpent: string;
  avatarBg: string;
  date: string;
}

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'zakovat',
    title: 'Zakovat & Mantiqiy Savollar',
    subtitle: 'Angor 1-maktab tuman chempionati savollari',
    icon: 'Brain',
    color: 'from-amber-500 to-orange-600',
    badge: 'Angor Tanlovi ⭐',
    questionsCount: 8,
    timePerQuestion: 40,
    description: 'Kreativ fikrlash, zakovat fokuslari va mashhur intellektual o\'yinlar savollari to\'plami.',
    questions: [
      {
        id: 1,
        question: 'Al-Hakim at-Termiziy majmuasi qad rostlagan qadimiy shahar qaysi daryo bo\'yida joylashgan?',
        options: ['Amudaryo', 'Sirdaryo', 'Zarafshon', 'Surxondaryo'],
        correctIndex: 0,
        explanation: 'Termiz shahri va mashhur Hakim at-Termiziy me\'moriy obidasi bevosita Amudaryo sohilida joylashgan.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 2,
        question: 'U kishi qanchalik ko\'p olsa, shunchalik kattalashadi. Bu nima?',
        options: ['Chuqur (O\'ra)', 'Bilim', 'Soyabon', 'Dengiz'],
        correctIndex: 0,
        explanation: 'Mantiqiy topishmoq: chuqurdan qancha ko\'p tuproq olinsa, chuqurning hajmi shuncha kattalashadi.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 3,
        question: 'Qadimgi Rimda biror kishi qonun loyihasini taklif qilganda, bo\'yniga arqon taqib turgan. Agar loyiha rad etilsa, uni nima kutgan?',
        options: ['Dorga osish', 'Qamoq jazosi', 'Rimdan surgun', 'Katta jarima'],
        correctIndex: 0,
        explanation: 'Bu g\'alati odat bekorchi yoki xalqqa zararli qonunlar chiqishining oldini olish uchun joriy qilingan edi.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 4,
        question: '1 tonna paxta og\'irmi yoki 1 tonna temirmi?',
        options: ['Ikkalasi teng og\'irlikda', 'Temir og\'ir', 'Paxta og\'ir', 'Havo namligiga bog\'liq'],
        correctIndex: 0,
        explanation: 'Ikkalasi ham aynan 1 tonna (1000 kg) bo\'lgani uchun massalari mutlaqo tengdir.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 5,
        question: 'Angor 1-maktabining "Yosh Zakovat" jamoasi tuman miqyosida nechanchi o\'rinni egallagan?',
        options: ['Faxrli 1-o\'rin', '2-o\'rin', '3-o\'rin', 'Maxsus mukofot'],
        correctIndex: 0,
        explanation: 'Angor 1-maktabi Surxondaryo tumanlararo Zakovat turnirida mutlaq g\'oliblikni qo\'lga kiritgan.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 6,
        question: 'Qaysi oyda 28 kun bor?',
        options: ['Barcha oylarda', 'Faqat Fevralda', 'Faqat kabisa yilida', 'Hech qaysi oyda'],
        correctIndex: 0,
        explanation: 'Yilning barcha 12 oyida kamida 28 kun mavjud!',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 7,
        question: 'Shaxmat taxtasida jami nechta oq va qora kataklar mavjud?',
        options: ['64 ta', '32 ta', '100 ta', '48 ta'],
        correctIndex: 0,
        explanation: 'Standart shaxmat taxtasi 8x8 o\'lchamda bo\'lib, 32 ta oq va 32 ta qora katak, jami 64 ta kvadratdan iborat.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 8,
        question: 'U o\'zida dunyodagi barcha shaharlarni, daryolarni va tog\'larni jamlagan, ammo unda bironta ham uy yoki daraxt yo\'q. U nima?',
        options: ['Geografik Xarita (Globus)', 'Ensiklopedik kitob', 'Kamera', 'Ko\'zgu'],
        correctIndex: 0,
        explanation: 'Geografik xaritada butun dunyo tasvirlanadi, ammo jismoniy binolar va daraxtlar bo\'lmaydi.',
        difficulty: 'O\'rta',
        points: 15
      }
    ]
  },
  {
    id: 'matematika',
    title: 'Matematika & Al-Xorazmiy',
    subtitle: 'Mantiqiy hisob-kitoblar va olimpiada masalalari',
    icon: 'Calculator',
    color: 'from-blue-600 to-indigo-700',
    badge: 'Olimpiada 🏆',
    questionsCount: 6,
    timePerQuestion: 45,
    description: 'Tenglamalar, mantiqiy hisoblashlar va algebra/geometriya intellektual sinovlari.',
    questions: [
      {
        id: 101,
        question: 'Agar 5 ta mushuk 5 daqiqada 5 ta sichqonni tutsa, 100 ta mushuk 100 ta sichqonni necha daqiqada tutadi?',
        options: ['5 daqiqada', '100 daqiqada', '20 daqiqada', '1 daqiqada'],
        correctIndex: 0,
        explanation: '1 ta mushuk 1 ta sichqonni tutishiga 5 daqiqa ketadi. Shuning uchun 100 ta mushuk 100 ta sichqonni parallel ravishda aynan 5 daqiqada tutadi.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 102,
        question: 'Dunyodagi eng mashhur son π (Pi) ning dastlabki ikki o\'nlik belgisi qanday?',
        options: ['3.14', '3.16', '2.71', '1.61'],
        correctIndex: 0,
        explanation: 'Pi soni taxminan 3.14159265... ga teng bo\'lib, aylananing uzunligini uning diametriga nisbatidir.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 103,
        question: 'Uchburchakning ichki burchaklari yig\'indisi har doim necha gradusga teng?',
        options: ['180°', '360°', '90°', '270°'],
        correctIndex: 0,
        explanation: 'Evklid geometriyasida istalgan tekislikdagi uchburchak ichki burchaklari yig\'indisi 180 gradusga teng bo\'ladi.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 104,
        question: 'Nolga bo\'lish amali matematikada...',
        options: ['Mumkin emas (aniqlanmagan)', 'Har doim 0 ga teng', 'Cheksizlikka teng', '1 ga teng'],
        correctIndex: 0,
        explanation: 'Matematik qonunlarga ko\'ra sonni nolga bo\'lish operatsiyasi ma\'noga ega emas (aniqlanmagan).',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 105,
        question: '7 ning kubi (7³) nechaga teng?',
        options: ['343', '243', '49', '512'],
        correctIndex: 0,
        explanation: '7 * 7 * 7 = 49 * 7 = 343.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 106,
        question: 'Ketma-ketlikdagi keyingi sonni toping: 1, 1, 2, 3, 5, 8, 13, ?',
        options: ['21', '19', '20', '24'],
        correctIndex: 0,
        explanation: 'Bu mashhur Fibonachchi sonlar qatori bo\'lib, har bir keyingi son oldingi ikki sonning yig\'indisiga teng (8 + 13 = 21).',
        difficulty: 'O\'rta',
        points: 15
      }
    ]
  },
  {
    id: 'it',
    title: 'Informatika & Robototexnika',
    subtitle: 'Dasturlash, AI va kompyuter savodxonligi',
    icon: 'Cpu',
    color: 'from-emerald-500 to-teal-700',
    badge: 'IT & STEAM 💻',
    questionsCount: 6,
    timePerQuestion: 35,
    description: 'Angor 1-maktab IT to\'garagi o\'quvchilari uchun maxsus tayyorlangan dasturlash va texnologiya testi.',
    questions: [
      {
        id: 201,
        question: 'Python dasturlash tilida ekranga matn chiqarish uchun qaysi funksiya ishlatiladi?',
        options: ['print()', 'echo()', 'System.out.println()', 'console.log()'],
        correctIndex: 0,
        explanation: 'Python tilida matn yoki ma\'lumotni konsolga chiqarish uchun print() standart funksiyasidan foydalaniladi.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 202,
        question: 'Kompyuter xotirasidagi 1 Kilobayt (KB) necha baytga teng?',
        options: ['1024 bayt', '1000 bayt', '512 bayt', '2048 bayt'],
        correctIndex: 0,
        explanation: 'Ikkilik sanoq tizimida 1 KB = 2^10 = 1024 baytga teng.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 203,
        question: 'Sun\'iy intellekt (AI) tizimlarining asosi bo\'lgan algoritmlar qaysi buyuk allomamiz nomiga qo\'yilgan?',
        options: ['Muhammad al-Xorazmiy', 'Abu Rayhon Beruniy', 'Ibn Sino', 'Mirzo Ulug\'bek'],
        correctIndex: 0,
        explanation: '"Algoritm" so\'zi vatandoshimiz Al-Xorazmiy nomi lotincha "Algorithmi" tarzida talaffuz qilinishidan kelib chiqqan.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 204,
        question: 'HTML nima uchun ishlatiladi?',
        options: ['Veb-sahifalarning tuzilishi va strukturasini yaratish uchun', 'Ma\'lumotlar bazasini boshqarish uchun', 'Operatsion tizim o\'rnatish uchun', 'Faqat o\'yinlar grafikasini chizish uchun'],
        correctIndex: 0,
        explanation: 'HTML (HyperText Markup Language) butun dunyo veb-saytlarining skeletini yaratuvchi gipermatnli belgilash tilidir.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 205,
        question: 'Robototexnikada sensor (datchik) qanday vazifani bajaradi?',
        options: ['Atrof-muhit ma\'lumotlarini (masofa, yorug\'lik, harorat) sezish va qabul qilish', 'Robotga elektr toki berish', 'Robotning dasturini o\'chirib tashlash', 'Faqat ovoz chiqarish'],
        correctIndex: 0,
        explanation: 'Sensorlar robotning "ko\'zi va qulog\'i" hisoblanib, tashqi dunyodagi fizik o\'lchamlarni elektr signallariga aylantiradi.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 206,
        question: 'Kompyuterning asosiy "miyasi" deb hisoblanadigan qurilma qaysi?',
        options: ['CPU (Markaziy protsessor)', 'RAM (Tezkor xotira)', 'HDD (Qattiq disk)', 'Monitor'],
        correctIndex: 0,
        explanation: 'CPU (Central Processing Unit) barcha hisoblash amallari va buyruqlarni bajaruvchi asosiy protsessordir.',
        difficulty: 'Oson',
        points: 10
      }
    ]
  },
  {
    id: 'history',
    title: 'Tarix & Surxondaryo Merosi',
    subtitle: 'Vazir jamg\'armasi ustozlari uslubidagi savollar',
    icon: 'Landmark',
    color: 'from-purple-600 to-pink-600',
    badge: 'Tarixiy Meros 🏛️',
    questionsCount: 6,
    timePerQuestion: 40,
    description: 'Surxondaryo qadimiy sivilizatsiyalari, Fayoztepa, Dalvarzintepa va buyuk allomalar tarixi.',
    questions: [
      {
        id: 301,
        question: 'Surxondaryo viloyatidagi dunyoga mashhur budda ibodatxonasi qoldig\'i qaysi majmuada joylashgan?',
        options: ['Fayoztepa va Qoratepa', 'Afrosiyob', 'Ko\'hna Urganch', 'Shohi Zinda'],
        correctIndex: 0,
        explanation: 'Termiz yaqinidagi Fayoztepa va Qoratepa qadimiy Kushon podsholigi davriga oid eng yirik budda majmualaridir.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 302,
        question: 'Angor 1-maktabida Vazir jamg\'armasi ustamasiga ega bo\'lgan tarix fani o\'qituvchilari kimlar?',
        options: ['Fazliddin Kenjayev va Guliston Kuvatova', 'Sunnatullo Qosimov', 'Bobur Shokirovich', 'Otabek Mahmudov'],
        correctIndex: 0,
        explanation: 'Angor 1-maktabining faxri bo\'lgan Fazliddin Kenjayev va Guliston Kuvatova nufuzli Vazir ustamasiga loyiq ko\'rilgan.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 303,
        question: 'Amir Temur nechanchi yilda tavallud topgan?',
        options: ['1336-yil 9-aprel', '1441-yil 9-fevral', '1370-yil 1-may', '1220-yil 15-mart'],
        correctIndex: 0,
        explanation: 'Sohibqiron Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xo\'ja Ilg\'or qishlog\'ida tug\'ilgan.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 304,
        question: 'Dunyoga mashhur "Oltin odam" va eng qadimiy shaxmat donalari O\'zbekistonning qaysi hududidan topilgan?',
        options: ['Surxondaryo (Dalvarzintepa)', 'Buxoro', 'Xorazm', 'Farg\'ona'],
        correctIndex: 0,
        explanation: 'Dalvarzintepa (Sho\'rchi tumani) arxeologik yodgorligidan mashhur oltin xazinalar va qadimiy shaxmat donalari topilgan.',
        difficulty: 'Qiyin',
        points: 20
      },
      {
        id: 305,
        question: 'Alisher Navoiy qaysi asarni 5 ta doston (Xamsa) qilib turkiy tilda yaratgan birinchi shoirdir?',
        options: ['Xamsa', 'Muhokamat ul-lug\'atayn', 'Lison ut-tayr', 'Mahbub ul-qulub'],
        correctIndex: 0,
        explanation: 'Alisher Navoiy 1483-1485 yillarda turkiy tilda birinchi bo\'lib to\'liq 5 dostonli "Xamsa" yaratgan.',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 306,
        question: 'Angor tumani qachon alohida tuman sifatida tashkil etilgan?',
        options: ['1952-yilda', '1991-yilda', '1924-yilda', '1979-yilda'],
        correctIndex: 0,
        explanation: 'Surxondaryo viloyatining Angor tumani 1952-yil 16-aprelda tashkil topgan bo\'lib, boy dehqonchilik va madaniy an\'analarga ega.',
        difficulty: 'O\'rta',
        points: 15
      }
    ]
  },
  {
    id: 'english',
    title: 'Ingliz Tili & IELTS Vocabulary',
    subtitle: 'Chet tili sertifikatlari va grammatika sinovi',
    icon: 'Languages',
    color: 'from-rose-500 to-red-700',
    badge: 'IELTS / CEFR 🌐',
    questionsCount: 6,
    timePerQuestion: 30,
    description: 'Grammar, essential idioms, and vocabulary tailored for aspiring IELTS test-takers.',
    questions: [
      {
        id: 401,
        question: 'Choose the correct synonym for the word "ENORMOUS":',
        options: ['Huge / Gigantic', 'Tiny', 'Fragile', 'Fast'],
        correctIndex: 0,
        explanation: '"Enormous" means extremely large in size or amount (Huge, Gigantic, Immense).',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 402,
        question: 'Identify the correct sentence in Present Perfect tense:',
        options: ['She has finished her homework.', 'She finished her homework yesterday.', 'She is finishing her homework.', 'She will finish her homework.'],
        correctIndex: 0,
        explanation: 'Present Perfect tense formula: Subject + have/has + Past Participle (V3).',
        difficulty: 'Oson',
        points: 10
      },
      {
        id: 403,
        question: 'What does the idiom "Break a leg" mean?',
        options: ['Good luck!', 'Get injured', 'Stop moving', 'Dance joyfully'],
        correctIndex: 0,
        explanation: '"Break a leg" is a widely used theatrical idiom that means wishing someone good luck.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 404,
        question: 'Which word means "a person who loves books and reading"?',
        options: ['Bibliophile (Bookworm)', 'Philanthropist', 'Polyglot', 'Botanist'],
        correctIndex: 0,
        explanation: 'A bibliophile is a person who loves or collects books.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 405,
        question: 'Complete the sentence: If I _____ harder, I would pass the exam.',
        options: ['studied', 'study', 'had studied', 'will study'],
        correctIndex: 0,
        explanation: 'Second Conditional structure: If + Past Simple, would + base verb.',
        difficulty: 'O\'rta',
        points: 15
      },
      {
        id: 406,
        question: 'What is the antonym of "ANCIENT"?',
        options: ['Modern / Contemporary', 'Historic', 'Old-fashioned', 'Primitive'],
        correctIndex: 0,
        explanation: '"Ancient" means belonging to the distant past, so its exact antonym is "Modern".',
        difficulty: 'Oson',
        points: 10
      }
    ]
  }
];

export const INITIAL_LEADERS: QuizLeader[] = [
  {
    id: 1,
    name: 'Jasurbek Qosimov',
    school: 'Angor 1-maktab (10-A sinf)',
    score: 95,
    accuracy: 100,
    category: 'Zakovat & Mantiq',
    timeSpent: '1:45 daqiqa',
    avatarBg: 'bg-blue-600',
    date: 'Bugun'
  },
  {
    id: 2,
    name: 'Mohinur Shokirova',
    school: 'Angor 1-maktab (11-B sinf)',
    score: 90,
    accuracy: 94,
    category: 'Matematika & Al-Xorazmiy',
    timeSpent: '2:10 daqiqa',
    avatarBg: 'bg-purple-600',
    date: 'Bugun'
  },
  {
    id: 3,
    name: 'Sardor Rustamov',
    school: 'Termiz Prezident Maktabi',
    score: 85,
    accuracy: 90,
    category: 'Informatika & Robototexnika',
    timeSpent: '1:55 daqiqa',
    avatarBg: 'bg-emerald-600',
    date: 'Kecha'
  },
  {
    id: 4,
    name: 'Dilrabo Xoliqova',
    school: 'Angor 1-maktab (9-A sinf)',
    score: 80,
    accuracy: 88,
    category: 'Tarix & Surxondaryo Merosi',
    timeSpent: '2:30 daqiqa',
    avatarBg: 'bg-amber-600',
    date: 'Kecha'
  },
  {
    id: 5,
    name: 'Azizbek Normurodov',
    school: 'Al-Xorazmiy IT Maktabi',
    score: 80,
    accuracy: 88,
    category: 'Ingliz Tili & IELTS',
    timeSpent: '1:30 daqiqa',
    avatarBg: 'bg-rose-600',
    date: '3 kun oldin'
  }
];
