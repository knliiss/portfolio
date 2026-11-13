export type Language = 'en' | 'uk';
export type ProjectSlug = 'mnemos' | 'wavecode' | 'c7xbotmanager' | 'studium';

export type ProjectCopy = {
  category: string;
  subtitle: string;
  description: string;
  challengeTitle: string;
  challenge: string;
  solutionTitle: string;
  solution: string;
  resultsTitle: string;
  results: string;
  highlights: string[];
  resultLabel: string;
  role: string;
  status: string;
  details: string[];
};

export type Project = {
  slug: ProjectSlug;
  order: string;
  technologies: string[];
  repo: string;
  secondRepo?: string;
  cover?: string;
  live?: string;
  gallery?: string[];
  metric?: string;
  visual: 'mnemos' | 'wavecode' | 'c7x' | 'studium';
  copy: Record<Language, ProjectCopy>;
};

export const languages: Language[] = ['en', 'uk'];

export const profile = {
  name: 'Vitalii Lototskyi',
  city: 'Lviv, Ukraine',
  email: 'vitallot21@gmail.com',
  github: 'https://github.com/knliiss',
  linkedin: 'https://www.linkedin.com/in/vitalii-lototskyi-20aa25374/',
  phone: '+380506899458'
};

export const ui = {
  en: {
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    switchTheme: 'Switch color theme',
    switchLanguage: 'Switch to Ukrainian',
    eyebrow: 'Software engineer / Lviv, Ukraine',
    headline: 'Software, thoughtfully engineered.',
    intro: 'Kotlin and Java software engineering, with experience spanning distributed services, realtime applications, network automation and full-stack products. Independent projects include active users and paid features.',
    explore: 'Explore selected work',
    viewResume: 'Résumé',
    viewWork: 'View project',
    featuredLabel: '01 / Selected work',
    featuredIntro: 'Four projects. Different challenges. The same focus on building things that work.',
    focusLabel: '02 / Expertise',
    focusHeadline: 'A broader view of engineering.',
    focusIntro: 'Kotlin and Java are the primary languages. Additional work includes Rust, Go, TypeScript and frontend development.',
    focusItems: [
      ['Backend & distributed systems', 'Service boundaries, asynchronous messaging, reliability and security.'],
      ['Systems & tooling', 'Concurrent connections, protocol integrations and performance-oriented design.'],
      ['Product development', 'Complete applications with thoughtful interfaces and maintainable architecture.']
    ],
    awardsLabel: '03 / Recognition',
    awardsHeading: 'Selected recognition',
    awardsIntro: 'BEST Engineering Competition · BEST Lviv',
    awards: [
      ['2026', '1st place · Innovative Design', 'Airlogix “Most Creative Approach” award'],
      ['2025', '2nd place · Team Design', '']
    ],
    education: 'Education',
    school: 'Lviv Polytechnic National University',
    studying: 'Software Engineering · Third-year student',
    contactLabel: '04 / Contact',
    contactTitle: 'Have something in mind?',
    contactIntro: 'Open to junior software engineering opportunities, backend roles and full-stack product teams.',
    emailMe: 'Get in touch',
    footerNote: 'Vitalii Lototskyi · Software Engineer',
    openSource: 'Source code',
    nextProject: 'Next project',
    overview: 'Overview',
    engineering: 'Engineering',
    outcome: 'Outcome',
    coreTech: 'Technologies',
    visit: 'View website',
    backToWork: 'All work',
    overviewMeta: 'Project overview',
    role: 'Role',
    status: 'Status',
    source: 'Repository',
    caseStudy: 'Engineering case study',
    moreProject: 'Additional repository',
    resumeTitle: 'Résumé',
    resumeSummary: 'Software Engineer focused on Kotlin and Java, with independent experience building, operating and improving products used by real people. Background in distributed services, network automation, systems programming and full-stack development.',
    resumeFocus: 'Technical skills',
    resumeExperiences: 'Selected projects',
    resumeAchievements: 'Achievements',
    resumeEducation: 'Education & languages',
    printResume: 'Print / Save as PDF',
    resumeLanguage: 'Ukrainian (native) · English (B1)',
    notFoundTitle: 'This page does not exist.',
    notFoundBack: 'Return home'
  },
  uk: {
    navWork: 'Проєкти',
    navAbout: 'Про мене',
    navContact: 'Контакти',
    switchTheme: 'Змінити тему',
    switchLanguage: 'Перемкнути на англійську',
    eyebrow: 'Software Engineer / Львів, Україна',
    headline: 'Програмні системи, продумані до деталей.',
    intro: 'Розробка на Kotlin і Java: розподілені сервіси, realtime-застосунки, мережева автоматизація та full-stack продукти. Серед проєктів — рішення з активними користувачами й платними можливостями.',
    explore: 'Переглянути проєкти',
    viewResume: 'Резюме',
    viewWork: 'Детальніше',
    featuredLabel: '01 / Вибрані роботи',
    featuredIntro: 'Чотири проєкти. Різні задачі. Спільний підхід до якості реалізації.',
    focusLabel: '02 / Спеціалізація',
    focusHeadline: 'Інженерний погляд на розробку.',
    focusIntro: 'Основні мови — Kotlin і Java. Суміжні напрями — Rust, Go, TypeScript і frontend-розробка.',
    focusItems: [
      ['Backend і розподілені системи', 'Межі сервісів, асинхронна взаємодія, надійність і безпека.'],
      ['Системне програмування', 'Паралельні з’єднання, інтеграція протоколів та оптимізація ресурсів.'],
      ['Розробка продуктів', 'Повноцінні застосунки зі зрозумілим інтерфейсом і підтримуваною архітектурою.']
    ],
    awardsLabel: '03 / Досягнення',
    awardsHeading: 'Відзнаки',
    awardsIntro: 'BEST Engineering Competition · BEST Lviv',
    awards: [
      ['2026', '1-ше місце · Innovative Design', 'Відзнака Airlogix «Найкреативніший підхід»'],
      ['2025', '2-ге місце · Team Design', '']
    ],
    education: 'Освіта',
    school: 'Національний університет «Львівська політехніка»',
    studying: 'Інженерія програмного забезпечення · 3-й курс',
    contactLabel: '04 / Контакти',
    contactTitle: 'Маєте цікаву ідею?',
    contactIntro: 'Відкритий до Junior Software Engineer вакансій та цікавих технічних задач.',
    emailMe: 'Зв’язатися',
    footerNote: 'Дизайн і розробка — Віталій Лотоцький.',
    openSource: 'Вихідний код',
    nextProject: 'Наступний проєкт',
    overview: 'Огляд',
    engineering: 'Технічні рішення',
    outcome: 'Результат',
    coreTech: 'Технології',
    visit: 'Відкрити сайт',
    backToWork: 'Усі проєкти',
    overviewMeta: 'Про проєкт',
    role: 'Роль',
    status: 'Стан',
    source: 'Репозиторій',
    caseStudy: 'Інженерний кейс',
    moreProject: 'Додатковий репозиторій',
    resumeTitle: 'Резюме',
    resumeSummary: 'Software Engineer із фокусом на Kotlin та Java. Самостійно створюю, підтримую та вдосконалюю продукти, якими користуються реальні люди. Досвід розподілених сервісів, мережевої автоматизації, системного програмування та full-stack розробки.',
    resumeFocus: 'Технічні навички',
    resumeExperiences: 'Вибрані проєкти',
    resumeAchievements: 'Досягнення',
    resumeEducation: 'Освіта та мови',
    printResume: 'Друкувати / Зберегти PDF',
    resumeLanguage: 'Українська (рідна) · Англійська (B1)',
    notFoundTitle: 'Сторінку не знайдено.',
    notFoundBack: 'На головну'
  }
} as const;

export const projects: Project[] = [
  {
    slug: 'mnemos',
    order: '01',
    technologies: ['Kotlin', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Keycloak', 'React'],
    repo: 'https://github.com/knliiss/Mnemos',
        metric: '~150',
    visual: 'mnemos',
    copy: {
      en: {
        category: 'Distributed systems / Product',
        subtitle: 'Real-time events, subscriptions, profiles and accounts for Cristalix SAO.',
        description: 'An independent event-driven platform that brings together live event data, notifications, user accounts, and a real-time interface.',
        challengeTitle: 'The challenge',
        challenge: 'Multiple sources produce changing event data. Users need timely notifications and consistent account state, while services must remain independent and recover from delivery failures.',
        solutionTitle: 'The engineering',
        solution: 'I designed domain-oriented Kotlin/Spring services connected through Apache Kafka, with explicit transport contracts, transactional outbox publishing and consumer-side inbox/deduplication. The platform also includes Keycloak authentication, PostgreSQL persistence, WebSockets and a React/TypeScript interface.',
        resultsTitle: 'What it became',
        results: 'An actively used independent product with approximately 150 users and paid features. I own its architecture, implementation, deployment and ongoing maintenance.',
        highlights: ['Event-driven microservices with explicit bounded contexts', 'Reliable message processing and realtime WebSocket updates', 'End-to-end product design, infrastructure and deployment'],
        resultLabel: 'Approximately 150 users',
        role: 'Independent developer',
        status: 'Active product',
        details: ['Event subscriptions and notifications', 'Accounts, profiles and social features', 'Realtime collection and projection of events']
      },
      uk: {
        category: 'Розподілені системи / Продукт',
        subtitle: 'Події Cristalix SAO в реальному часі, підписки, профілі та акаунти.',
        description: 'Самостійно розроблена event-driven платформа, що об’єднує події в реальному часі, сповіщення, облікові записи та інтерактивний інтерфейс.',
        challengeTitle: 'Задача',
        challenge: 'Із кількох джерел надходять події, що постійно змінюються. Користувачі мають отримувати своєчасні сповіщення, а сервіси — зберігати незалежність і витримувати збої доставки.',
        solutionTitle: 'Технічне рішення',
        solution: 'Спроєктував доменно-орієнтовані Kotlin/Spring сервіси з Apache Kafka, явними контрактами подій, transactional outbox та inbox/deduplication. Також реалізовані Keycloak, PostgreSQL, WebSocket та інтерфейс на React/TypeScript.',
        resultsTitle: 'Результат',
        results: 'Продукт досі використовується приблизно 150 людьми, має платні функції. Повністю відповідаю за архітектуру, реалізацію, розгортання й підтримку.',
        highlights: ['Мікросервіси, розділені за доменними відповідальностями', 'Надійна обробка повідомлень і WebSocket-оновлення', 'Повний цикл розробки та експлуатації продукту'],
        resultLabel: 'Приблизно 150 користувачів',
        role: 'Самостійна розробка',
        status: 'Активний продукт',
        details: ['Підписки на події та сповіщення', 'Облікові записи, профілі та соціальні функції', 'Збирання та обробка подій у реальному часі']
      }
    }
  },
  {
    slug: 'wavecode',
    order: '02',
    technologies: ['Rust', 'WebAssembly', 'TypeScript', 'React'],
    repo: 'https://github.com/knliiss/WaveCode',
    secondRepo: 'https://github.com/knliiss/WaveCode-Web',
    cover: 'media/wavecode/example.svg',
    live: 'https://wavecode.knalis.rest/',
    visual: 'wavecode',
    copy: {
      en: {
        category: 'Systems programming / Open source',
        subtitle: 'An open optical code for media links, with a Rust SDK and web scanner.',
        description: 'WaveCode encodes supported media identities and optional native timestamps into a compact optical mark. The Rust core powers a CLI, native bindings and a mobile-first browser scanner.',
        challengeTitle: 'The challenge',
        challenge: 'Represent music references from different services in a small visual code that can be decoded reliably, without a proprietary link database or duplicated implementations across platforms.',
        solutionTitle: 'The engineering',
        solution: 'Developed the optical encoding format and Rust library, including versioning, CRC validation, Reed–Solomon error correction and image decoding. Exposed native/FFI and WebAssembly interfaces; the separate React/TypeScript web application uses the same Rust decoder for on-device scanning.',
        resultsTitle: 'Current state',
        results: 'The library, command-line tools and web scanner are functional and under active improvement. The optical scanner remains experimental and success varies with image quality.',
        highlights: ['Deterministic optical encoding for supported music and video services', 'Shared Rust implementation across native and WebAssembly targets', 'Mobile-first camera, image scanning and code generation'],
        resultLabel: 'Open-source SDK + scanner',
        role: 'Creator / sole developer',
        status: 'Active development',
        details: ['Track and optional timestamp support', 'Error correction and orientation recovery', 'Browser-based scanning without remote image uploads']
      },
      uk: {
        category: 'Системне програмування / Open source',
        subtitle: 'Оптичний код для музики та відео, Rust SDK і вебсканер.',
        description: 'WaveCode кодує ідентифікатори підтримуваних медіа та необов’язкові таймкоди у компактний оптичний знак. Rust-ядро використовується CLI, нативними прив’язками та мобільним вебсканером.',
        challengeTitle: 'Задача',
        challenge: 'Подати посилання з різних музичних сервісів у невеликому візуальному коді, який можна надійно декодувати без власної бази ідентифікаторів та дублювання алгоритмів між платформами.',
        solutionTitle: 'Технічне рішення',
        solution: 'Розробив формат і Rust-бібліотеку з версіонуванням, CRC-перевіркою, корекцією помилок Reed–Solomon та розпізнаванням зображень. Надав нативні/FFI та WebAssembly інтерфейси. Окремий застосунок на React/TypeScript використовує той самий Rust-декодер локально в браузері.',
        resultsTitle: 'Поточний стан',
        results: 'Бібліотека, CLI та вебсканер працюють і активно вдосконалюються. Оптичне розпізнавання поки експериментальне й залежить від якості зображення.',
        highlights: ['Детерміноване кодування для музики та вибраних відеоплатформ', 'Спільна реалізація на Rust для native та WebAssembly', 'Мобільне сканування камерою й генерація кодів'],
        resultLabel: 'Open-source SDK та сканер',
        role: 'Автор і розробник',
        status: 'Активна розробка',
        details: ['Посилання на трек і таймкод', 'Корекція помилок та визначення орієнтації', 'Сканування у браузері без завантаження фото на сервер']
      }
    }
  },
  {
    slug: 'c7xbotmanager',
    order: '03',
    technologies: ['Java', 'Go', 'NIO', 'WebView2'],
    repo: 'https://github.com/knliiss/C7xBotManager',
    metric: '500',
    visual: 'c7x',
    copy: {
      en: {
        category: 'Networking / Developer tooling',
        subtitle: 'A desktop manager for up to 500 headless Cristalix client sessions.',
        description: 'A specialized desktop tool for managing many headless client sessions, combining a Java runtime with a native Go desktop shell.',
        challengeTitle: 'The challenge',
        challenge: 'Maintain numerous concurrent client connections while controlling resource use, state transitions, network errors and proxy behavior through a usable desktop application.',
        solutionTitle: 'The engineering',
        solution: 'Structured and expanded a custom protocol integration into a modular Java backend, shared NIO transport, session lifecycle management, reconnect handling, proxy pools and automation features. Built a native Go/Win32/WebView2 desktop shell. Initial token protocol research was contributed by another person; the architecture and subsequent development are mine.',
        resultsTitle: 'Outcome',
        results: 'The tool was used by roughly ten customers and distributed through one-time purchases; configurations with up to 500 concurrent sessions were used.',
        highlights: ['Shared NIO transport and headless client sessions', 'Proxy pools, health checks and connection recovery', 'Native desktop management over a modular backend'],
        resultLabel: 'Up to 500 concurrent sessions',
        role: 'Lead developer / architecture',
        status: 'Independent product',
        details: ['Network protocol and session lifecycle', 'Resource-conscious concurrent client runtime', 'Bulk operations and diagnostics']
      },
      uk: {
        category: 'Мережі / Інструменти розробника',
        subtitle: 'Десктопний менеджер для керування до 500 headless-сесіями Cristalix.',
        description: 'Спеціалізований десктопний інструмент керування багатьма headless-клієнтами на основі Java runtime та нативної оболонки на Go.',
        challengeTitle: 'Задача',
        challenge: 'Підтримувати численні паралельні підключення з контрольованим використанням ресурсів, правильною обробкою станів, мережевих помилок і проксі через зручний десктопний застосунок.',
        solutionTitle: 'Технічне рішення',
        solution: 'Структурував і розвинув інтеграцію власного протоколу в модульний Java backend зі спільним NIO transport, керуванням життєвим циклом сесій, відновленням з’єднань, проксі-пулами й автоматизацією. Побудував нативну десктопну оболонку на Go/Win32/WebView2. Початкову частину дослідження протоколу токенів надав інший розробник; архітектура та подальша розробка — мої.',
        resultsTitle: 'Результат',
        results: 'Програмою користувалися близько десяти клієнтів із разовою оплатою; використовувалися конфігурації з підтримкою до 500 одночасних сесій.',
        highlights: ['Спільний NIO transport та headless-сесії', 'Проксі-пули, перевірка здоров’я з’єднань і відновлення', 'Нативне десктопне керування модульним backend'],
        resultLabel: 'До 500 одночасних сесій',
        role: 'Основний розробник / архітектура',
        status: 'Самостійний продукт',
        details: ['Мережевий протокол і життєвий цикл сесій', 'Ресурсно-ефективний конкурентний runtime', 'Масові операції та діагностика']
      }
    }
  },
  {
    slug: 'studium',
    order: '04',
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Kafka'],
    repo: 'https://github.com/knliiss/Studium',
    cover: 'media/studium/student.png',
    gallery: [
      'media/studium/teacher.png',
      'media/studium/admin.png'
    ],
    visual: 'studium',
    copy: {
      en: {
        category: 'Full-stack / Academic project',
        subtitle: 'A learning platform for students, teachers and administrators.',
        description: 'A self-developed learning management platform covering students, teachers and administrators. It connects assignments, tests, schedules, files and notifications in one application.',
        challengeTitle: 'The challenge',
        challenge: 'Model different academic workflows with consistent authorization, file handling and maintainable boundaries between functional areas.',
        solutionTitle: 'The engineering',
        solution: 'Built a Java 21/Spring Boot microservice backend behind Spring Cloud Gateway and a React/TypeScript frontend. Implemented role-aware interfaces, REST APIs, PostgreSQL-backed services and asynchronous Kafka events, with security and test coverage in the repository.',
        resultsTitle: 'Outcome',
        results: 'A substantial independently developed academic software project that runs in a test environment. It is not presented as a commercial deployment.',
        highlights: ['Role-based workflows for students, educators and administrators', 'Gateway-based microservice architecture and REST APIs', 'Full-stack UI, persistence, testing and integration'],
        resultLabel: 'Full-stack academic application',
        role: 'Sole developer',
        status: 'Test environment',
        details: ['Assignments, submissions, grades and testing', 'Separate student, teacher and admin workspaces', 'Files, schedules, auditing and notifications']
      },
      uk: {
        category: 'Full-stack / Навчальний проєкт',
        subtitle: 'Навчальна платформа для студентів, викладачів та адміністраторів.',
        description: 'Самостійно розроблена навчальна платформа для студентів, викладачів та адміністраторів. Об’єднує завдання, тести, розклади, файли та сповіщення.',
        challengeTitle: 'Задача',
        challenge: 'Змоделювати різні навчальні процеси зі зрозумілою авторизацією, роботою з файлами та підтримуваними межами між функціональними модулями.',
        solutionTitle: 'Технічне рішення',
        solution: 'Реалізував Java 21/Spring Boot backend із мікросервісами за Spring Cloud Gateway і frontend на React/TypeScript. Передбачив рольові інтерфейси, REST API, PostgreSQL та асинхронні події Kafka, систему безпеки й тести.',
        resultsTitle: 'Результат',
        results: 'Великий самостійно реалізований навчальний застосунок, який працює в тестовому середовищі. Не подається як комерційне розгортання.',
        highlights: ['Рольові сценарії студентів, викладачів і адміністраторів', 'Мікросервісна архітектура з gateway та REST API', 'Full-stack інтерфейс, дані, тестування та інтеграції'],
        resultLabel: 'Повноцінний навчальний застосунок',
        role: 'Самостійна розробка',
        status: 'Тестове середовище',
        details: ['Завдання, здачі, оцінки й тести', 'Окремі кабінети студента, викладача та адміністратора', 'Файли, розклад, аудит і сповіщення']
      }
    }
  }
];

export function localizedProject(lang: Language, slug: ProjectSlug) {
  const project = projects.find(p => p.slug === slug);
  if (!project) throw new Error('Unknown project: ' + slug);
  return { ...project, text: project.copy[lang] };
}

export function pathFor(path: string) {
  const prefix = import.meta.env.BASE_URL.replace(/\/$/, '');
  return prefix + '/' + path.replace(/^\/+/, '');
}

export function alternateLanguage(lang: Language): Language {
  return lang === 'en' ? 'uk' : 'en';
}
