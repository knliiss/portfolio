import type { Language, ProjectSlug } from './content';

export type Narrative = {
  kicker: string;
  overviewHeading: string;
  overview: string;
  context: string;
  scenarioLabel: string;
  scenarioHeading: string;
  scenario: string;
  steps: { number: string; title: string; description: string }[];
  decisionsHeading: string;
  decisions: { title: string; reason: string }[];
  outcomeHeading: string;
  outcome: string;
  note: string;
  mediaLabel: string;
  mediaDescription: string;
};

export const narratives: Record<ProjectSlug, Record<Language, Narrative>> = {
  mnemos: {
    en: {
      kicker: 'A real product · event-driven architecture',
      overviewHeading: 'One platform. Multiple independent domains.',
      overview: 'Mnemos tracks live game activity and connects it to accounts, notifications, player presence and social experiences. The user sees one product; the backend separates ownership of event ingestion, projections, user state and message delivery.',
      context: 'I developed the platform independently, including its backend services, web experience, authentication flows, infrastructure and operational tooling. Roughly 150 people have used the product; some features have been paid.',
      scenarioLabel: 'Example 01 · From observation to notification',
      scenarioHeading: 'What happens when two sources report the same event?',
      scenario: 'An event is observed by a collector. It should appear in the feed and reach users who subscribed to it, without creating duplicate notifications when the same source activity is reported more than once.',
      steps: [
        { number: '01', title: 'Observe', description: 'A separate collector sends an authenticated activity report to the realtime boundary.' },
        { number: '02', title: 'Normalize', description: 'The domain service validates, scopes and persists the event, with source-aware deduplication.' },
        { number: '03', title: 'Distribute', description: 'Kafka contracts carry the domain update to independently owned consumers.' },
        { number: '04', title: 'Deliver', description: 'Realtime projections refresh the web interface; the notification service evaluates subscriptions for Telegram delivery.' }
      ],
      decisionsHeading: 'The decisions that mattered',
      decisions: [
        { title: 'Boundaries by responsibility', reason: 'Events, profiles, notifications and realtime transport can evolve without depending on one shared domain model.' },
        { title: 'Outbox + inbox', reason: 'Persisting outgoing messages and deduplicating consumed ones reduces the impact of retries and at-least-once delivery.' },
        { title: 'Transport where it fits', reason: 'Kafka coordinates asynchronous changes; authenticated WebSockets provide low-latency client updates; HTTP is reserved for suitable synchronous reads.' }
      ],
      outcomeHeading: 'Beyond the prototype',
      outcome: 'An actively used, self-operated product with a backend designed for incremental features and changing external event streams. The system is maintained and improved as usage and requirements evolve.',
      note: 'The event journey is a conceptual simplification of an implemented system; internal credentials and production-only details are intentionally not shown.',
      mediaLabel: 'Architecture visualization',
      mediaDescription: 'The product repository is private. The illustration describes the real service responsibilities, not a screenshot of the product.'
    },
    uk: {
      kicker: 'Реальний продукт · event-driven архітектура',
      overviewHeading: 'Один продукт. Кілька незалежних доменів.',
      overview: 'Mnemos відстежує ігрову активність у реальному часі й пов’язує її з акаунтами, сповіщеннями, присутністю гравців та соціальними функціями. Для користувача це один продукт, але backend розділяє відповідальності за події, проєкції, дані користувачів і доставку повідомлень.',
      context: 'Самостійно розробив backend-сервіси, вебінтерфейс, авторизацію, інфраструктуру й експлуатаційні інструменти. Продуктом користувалися приблизно 150 людей, частина функцій була платною.',
      scenarioLabel: 'Приклад 01 · Від події до сповіщення',
      scenarioHeading: 'Що відбувається, якщо два джерела повідомили про ту саму подію?',
      scenario: 'Collector фіксує подію. Вона має з’явитися в стрічці та дійти до підписників без дублювання повідомлень, навіть якщо інформація про неї надійшла повторно.',
      steps: [
        { number: '01', title: 'Спостереження', description: 'Окремий collector надсилає автентифікований звіт до realtime-сервісу.' },
        { number: '02', title: 'Нормалізація', description: 'Доменний сервіс перевіряє, прив’язує до контексту й зберігає подію з дедуплікацією.' },
        { number: '03', title: 'Поширення', description: 'Контракти Kafka доставляють доменне оновлення незалежним споживачам.' },
        { number: '04', title: 'Доставка', description: 'Realtime оновлює інтерфейс; notification-service перевіряє підписки для доставки в Telegram.' }
      ],
      decisionsHeading: 'Ключові архітектурні рішення',
      decisions: [
        { title: 'Межі за відповідальністю', reason: 'Події, профілі, сповіщення й realtime змінюються незалежно, без спільної доменної моделі.' },
        { title: 'Outbox + inbox', reason: 'Збереження вихідних подій і дедуплікація отриманих зменшують наслідки повторної доставки.' },
        { title: 'Відповідний транспорт', reason: 'Kafka — для асинхронних змін, WebSocket — для оновлень клієнта, HTTP — для доречних синхронних запитів.' }
      ],
      outcomeHeading: 'Не просто прототип',
      outcome: 'Реальний продукт, який я самостійно розгортаю й підтримую. Архітектура дозволяє поступово додавати функції та адаптуватися до нових джерел подій.',
      note: 'Схема спрощує реальний процес. Секрети й приватні експлуатаційні деталі не публікуються.',
      mediaLabel: 'Архітектурна візуалізація',
      mediaDescription: 'Репозиторій продукту приватний. Ілюстрація показує реальні відповідальності сервісів, а не вигаданий скриншот.'
    }
  },
  wavecode: {
    en: {
      kicker: 'Open source · native SDK + web scanner',
      overviewHeading: 'A format, not another shortened URL.',
      overview: 'WaveCode is a small optical format for media identities: supported music tracks, videos, and optional native timestamps. The code stores the platform-specific identity directly, without a hosted track database.',
      context: 'I independently designed the optical geometry, binary layout and Rust implementation, then exposed the same decoder to native applications and the mobile-first web scanner through WebAssembly. Both the SDK and scanner work and are under active development.',
      scenarioLabel: 'Example 02 · From link to printable code',
      scenarioHeading: 'An actual decodable WaveCode, not a decorative logo.',
      scenario: 'The sample graphic below was generated by the official Rust encoder in the library repository. Its bar heights carry a real track identity. You can scan it in the live WaveCode app or create another code from your own media link.',
      steps: [
        { number: '01', title: 'Parse', description: 'Validate the media URL and extract the service-specific identity and an optional native timestamp.' },
        { number: '02', title: 'Encode', description: 'Build a versioned payload, add CRC-16 and Reed–Solomon parity, and map symbols to 36 optical columns.' },
        { number: '03', title: 'Render', description: 'Export an SVG or PNG with recognizable dual rails and a continuous quiet channel.' },
        { number: '04', title: 'Scan', description: 'Decode locally via the Rust implementation compiled to WebAssembly, then reconstruct a supported platform link.' }
      ],
      decisionsHeading: 'Why this architecture',
      decisions: [
        { title: 'One codec across platforms', reason: 'Rust owns the format; browser, native and language bindings reuse it rather than reimplementing the algorithm.' },
        { title: 'Resilience over aesthetics alone', reason: 'Orientation guards, CRC and error correction help distinguish valid frames and recover damaged symbols.' },
        { title: 'Private by default', reason: 'The browser scans photos and camera frames locally. No media image or identifier lookup service is required.' }
      ],
      outcomeHeading: 'Try the real implementation',
      outcome: 'The linked web app contains the live camera scanner, photo upload, code creation and SVG/PNG export. The portfolio intentionally delegates these operations to the working WaveCode app instead of displaying a non-functional imitation.',
      note: 'Optical recognition is experimental: blur, perspective, occlusion and poor contrast can affect scanning. V1 supports seven music services and selected video platforms, including YouTube, TikTok and Instagram Reels.',
      mediaLabel: 'Real V1 encoded frame',
      mediaDescription: 'Generated by the official Rust SDK; the code contains track identity data. It is not the WaveCode brand logo.'
    },
    uk: {
      kicker: 'Open source · нативний SDK і вебсканер',
      overviewHeading: 'Власний формат, а не ще один скорочувач посилань.',
      overview: 'WaveCode — компактний оптичний формат для ідентифікаторів медіа: підтримуваних музичних треків, відео та необов’язкових таймкодів. Код містить ідентифікатор платформи без власної серверної бази.',
      context: 'Самостійно розробив геометрію оптичного коду, бінарний формат і Rust-реалізацію, а потім використав той самий декодер у нативних інтерфейсах та мобільному вебсканері через WebAssembly. SDK і сканер працюють та активно вдосконалюються.',
      scenarioLabel: 'Приклад 02 · Від посилання до оптичного коду',
      scenarioHeading: 'Справжній декодований WaveCode, а не декоративний логотип.',
      scenario: 'Наведений нижче зразок згенерований офіційним Rust-кодером із репозиторію. Висоти смуг кодують справжній ідентифікатор треку. Його можна відсканувати у вебзастосунку або створити інший код.',
      steps: [
        { number: '01', title: 'Аналіз', description: 'Перевірка посилання й виділення ідентифікатора платформи та необов’язкового таймкоду.' },
        { number: '02', title: 'Кодування', description: 'Версіонований payload, CRC-16, Reed–Solomon і перетворення символів у 36 оптичних колонок.' },
        { number: '03', title: 'Відображення', description: 'SVG або PNG із двома рядами смуг та постійним центральним каналом.' },
        { number: '04', title: 'Сканування', description: 'Локальне декодування Rust-кодом у WebAssembly та відновлення посилання на платформу.' }
      ],
      decisionsHeading: 'Чому саме така архітектура',
      decisions: [
        { title: 'Один алгоритм для всіх платформ', reason: 'Rust відповідає за формат, а браузер і нативні прив’язки використовують ту саму реалізацію.' },
        { title: 'Не лише зовнішній вигляд', reason: 'Орієнтаційні маркери, CRC і корекція помилок допомагають розпізнати коректні кадри та відновити пошкоджені символи.' },
        { title: 'Приватність за замовчуванням', reason: 'Фотографії й кадри камери обробляються локально — без завантаження на сервер.' }
      ],
      outcomeHeading: 'Спробуй робочу реалізацію',
      outcome: 'Окремий вебзастосунок підтримує камеру, завантаження фото, генерацію кодів та експорт SVG/PNG. Портфоліо веде до нього, замість імітувати функції непрацюючим демо.',
      note: 'Оптичне сканування ще експериментальне: розмиття, перспектива, перекриття та слабкий контраст можуть впливати на результат. V1 підтримує сім музичних сервісів і деякі відеоплатформи, зокрема YouTube, TikTok та Instagram Reels.',
      mediaLabel: 'Справжній кадр V1',
      mediaDescription: 'Згенерований офіційним Rust SDK: смуги містять дані про трек, а не лише декоративну геометрію.'
    }
  },
  c7xbotmanager: {
    en: {
      kicker: 'Systems engineering · high-concurrency automation',
      overviewHeading: 'A native desktop shell around a headless runtime.',
      overview: 'C7xBotManager manages multiple headless Cristalix/Minecraft client sessions without running a graphical game client per account. The native shell, Java backend, protocol handling and network transport have clearly separated responsibilities.',
      context: 'I designed and extended the architecture, optimized concurrency and developed the automation features, account management and native desktop integration. The initial authentication-protocol foundation included external assistance.',
      scenarioLabel: 'Example 03 · Operating many sessions',
      scenarioHeading: 'One management action, many independent client states.',
      scenario: 'Imagine selecting a set of accounts and requesting a reconnect. The manager must coordinate commands, isolate failures and restore affected sessions without treating hundreds of connections as one blocking operation.',
      steps: [
        { number: '01', title: 'Command', description: 'The native Go/WebView2 shell forwards a bulk action through the local application API.' },
        { number: '02', title: 'Coordinate', description: 'Java application/runtime modules resolve selected accounts and manage their state transitions.' },
        { number: '03', title: 'Transport', description: 'A shared non-blocking Java NIO layer handles packet I/O and per-session protocol state.' },
        { number: '04', title: 'Recover', description: 'Proxy-pool checks, failover and reconnect logic isolate network problems; the UI reports current state and diagnostics.' }
      ],
      decisionsHeading: 'The hard parts',
      decisions: [
        { title: 'Headless by construction', reason: 'No full Minecraft client is launched per account; the runtime implements the required protocol/state directly.' },
        { title: 'Shared network I/O', reason: 'Non-blocking transport allows many connections without dedicating a heavyweight client process to each one.' },
        { title: 'Fault isolation', reason: 'Account states, proxy health and reconnection policies are tracked independently so one failure does not imply a full restart.' }
      ],
      outcomeHeading: 'From niche utility to used product',
      outcome: 'The application was distributed through one-time purchases to roughly ten users, with configurations supporting up to 500 concurrent client sessions. These are scale-of-use figures, not benchmark claims.',
      note: 'The architecture shown here is a simplified view of the actual repository modules (shell, app, core, protocol, navigation and automation). The source repository is private and no simulated UI screenshot is presented as genuine.',
      mediaLabel: 'Runtime responsibilities',
      mediaDescription: 'Readable architecture illustration based on repository modules. Not a product screenshot.'
    },
    uk: {
      kicker: 'Системна інженерія · конкурентна автоматизація',
      overviewHeading: 'Нативна оболонка навколо headless runtime.',
      overview: 'C7xBotManager керує багатьма headless-сесіями клієнтів Cristalix/Minecraft без запуску графічного ігрового клієнта для кожного акаунта. Нативна оболонка, Java backend, протокол і мережевий транспорт мають окремі відповідальності.',
      context: 'Я спроєктував і розвинув архітектуру, оптимізував конкурентну роботу й реалізував автоматизацію, керування акаунтами та інтеграцію нативного десктопного інтерфейсу. На ранньому етапі дослідження протоколу автентифікації допомагала інша людина.',
      scenarioLabel: 'Приклад 03 · Керування багатьма сесіями',
      scenarioHeading: 'Одна команда керування — багато незалежних станів.',
      scenario: 'Наприклад, вибрано групу акаунтів і запущено перепідключення. Менеджер має координувати команди, ізолювати збої й відновлювати сесії, не перетворюючи сотні підключень на одну блокувальну операцію.',
      steps: [
        { number: '01', title: 'Команда', description: 'Нативна Go/WebView2-оболонка передає масову дію через локальне API.' },
        { number: '02', title: 'Координація', description: 'Модулі Java app/runtime знаходять вибрані акаунти й керують переходами їхніх станів.' },
        { number: '03', title: 'Транспорт', description: 'Спільний неблокувальний Java NIO обробляє пакети та протокольний стан кожної сесії.' },
        { number: '04', title: 'Відновлення', description: 'Перевірки проксі, failover і reconnect локалізують збої; інтерфейс показує стани й діагностику.' }
      ],
      decisionsHeading: 'Найскладніші рішення',
      decisions: [
        { title: 'Headless за архітектурою', reason: 'Для кожного акаунта не запускається повноцінний Minecraft-клієнт; необхідний стан реалізований на рівні протоколу.' },
        { title: 'Спільний мережевий I/O', reason: 'Неблокувальний транспорт дозволяє підтримувати численні підключення без окремого важкого процесу на кожну сесію.' },
        { title: 'Ізоляція збоїв', reason: 'Стан акаунта, здоров’я проксі та reconnect-політики обліковуються незалежно.' }
      ],
      outcomeHeading: 'Від нішевого інструменту до продукту',
      outcome: 'Програма поширювалася з разовою оплатою серед приблизно десяти користувачів. Використовувалися конфігурації з підтримкою до 500 паралельних сесій — це дані про використання, а не результати синтетичного бенчмарку.',
      note: 'Схема спрощує реальні модулі репозиторію (shell, app, core, protocol, navigation та automation). Код приватний; вигаданих скриншотів інтерфейсу немає.',
      mediaLabel: 'Відповідальності runtime',
      mediaDescription: 'Читабельна архітектурна схема на основі модулів репозиторію, а не зображення інтерфейсу.'
    }
  },
  studium: {
    en: {
      kicker: 'Full-stack · academic system',
      overviewHeading: 'Three roles. One consistent workflow.',
      overview: 'Studium is a self-developed learning management system spanning students, instructors and administrators. It covers subjects, assignment submissions, tests, schedules, grades and notifications.',
      context: 'The project includes a React/TypeScript interface and a Java 21/Spring backend divided into domain services behind an API gateway. It was developed and tested as an academic system, not represented as a commercial product.',
      scenarioLabel: 'Example 04 · Student-to-teacher workflow',
      scenarioHeading: 'From a student submission to an evaluated result.',
      scenario: 'A learning platform is not a list of isolated CRUD screens. The same assignment passes through several roles, each of which needs different permissions and a consistent view of its current state.',
      steps: [
        { number: '01', title: 'Prepare', description: 'An instructor creates an assignment linked to a subject and a student group.' },
        { number: '02', title: 'Submit', description: 'The student sees the assignment in a role-specific dashboard and submits work.' },
        { number: '03', title: 'Review', description: 'The instructor reviews submissions and records grades or feedback.' },
        { number: '04', title: 'Reflect', description: 'The grade and related activity appear in the appropriate student views and notifications.' }
      ],
      decisionsHeading: 'Architecture instead of isolated screens',
      decisions: [
        { title: 'Explicit roles and boundaries', reason: 'Student, teacher and admin interfaces are separate workflows backed by authorization checks.' },
        { title: 'Domain-oriented services', reason: 'Education, scheduling, submissions and messaging sit behind contracts rather than one overloaded application layer.' },
        { title: 'API-first client integration', reason: 'A gateway, REST endpoints, persistence and Kafka-based events connect the frontend to the backend.' }
      ],
      outcomeHeading: 'Working academic system',
      outcome: 'A full-stack implementation with multiple role-specific interfaces and real integration flows in a test environment. The images are actual screenshots of the project, not generic UI mockups.',
      note: 'Studium remains a test-environment project. No claim of production users or commercial deployment is made.',
      mediaLabel: 'Actual product screenshots',
      mediaDescription: 'Student, instructor and administrator dashboards from the public Studium repository.'
    },
    uk: {
      kicker: 'Full-stack · навчальна система',
      overviewHeading: 'Три ролі. Один узгоджений процес.',
      overview: 'Studium — самостійно розроблена LMS для студентів, викладачів та адміністраторів. Вона охоплює дисципліни, здачу завдань, тести, розклади, оцінки й сповіщення.',
      context: 'Проєкт включає інтерфейс React/TypeScript та backend на Java 21/Spring із доменними сервісами за API gateway. Розроблений і протестований як навчальна система, а не як комерційний продукт.',
      scenarioLabel: 'Приклад 04 · Процес студент—викладач',
      scenarioHeading: 'Від здачі завдання до оціненого результату.',
      scenario: 'Навчальна платформа — не набір ізольованих CRUD-форм. Одне завдання проходить через кілька ролей, кожна з яких має різні права та власне представлення стану.',
      steps: [
        { number: '01', title: 'Підготовка', description: 'Викладач створює завдання для дисципліни та групи.' },
        { number: '02', title: 'Здача', description: 'Студент бачить завдання у власному кабінеті та надсилає роботу.' },
        { number: '03', title: 'Перевірка', description: 'Викладач переглядає роботи та виставляє оцінки або коментарі.' },
        { number: '04', title: 'Відображення', description: 'Оцінка й відповідні зміни відображаються в кабінеті студента та сповіщеннях.' }
      ],
      decisionsHeading: 'Архітектура замість набору екранів',
      decisions: [
        { title: 'Явні ролі й межі', reason: 'Сценарії студента, викладача й адміністратора розділені та підтримуються перевірками авторизації.' },
        { title: 'Доменно-орієнтовані сервіси', reason: 'Освіта, розклади, здачі завдань і повідомлення взаємодіють через контракти.' },
        { title: 'API-first інтеграція', reason: 'Gateway, REST API, база даних та Kafka-події поєднують frontend із backend.' }
      ],
      outcomeHeading: 'Працююча навчальна система',
      outcome: 'Full-stack реалізація з окремими інтерфейсами ролей та реальними інтеграційними сценаріями в тестовому середовищі. Зображення — справжні скриншоти, а не шаблонні макети.',
      note: 'Studium залишається проєктом у тестовому середовищі. Він не подається як застосунок із реальними комерційними користувачами.',
      mediaLabel: 'Реальні скриншоти продукту',
      mediaDescription: 'Кабінети студента, викладача й адміністратора з публічного репозиторію Studium.'
    }
  }
};

export function narrativeFor(slug: ProjectSlug, lang: Language): Narrative {
  return narratives[slug][lang];
}
