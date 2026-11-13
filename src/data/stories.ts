import type { Language, ProjectSlug } from './content';

type Point = { title: string; description: string };
type Detail = { title: string; paragraphs: string[] };

export type Narrative = {
  label: string;
  introduction: string[];
  responsibilities: string[];
  example: {
    title: string;
    introduction: string;
    steps: Point[];
    conclusion: string;
  };
  details: Detail[];
  outcome: string[];
  mediaLabel: string;
  mediaDescription: string;
};

export const narratives: Record<ProjectSlug, Record<Language, Narrative>> = {
  mnemos: {
    en: {
      label: 'Real-time services · independent product',
      introduction: [
        'Mnemos started as a way to follow events in Cristalix SAO without constantly checking the game. It developed into a platform with live events, subscriptions, player profiles, teams, notifications, rewards and account management.',
        'I designed and implemented the backend, web application and deployment setup. Around 150 people have used Mnemos; the product has also had paid features. Development continues as I improve the individual services and user experience.'
      ],
      responsibilities: [
        'Kotlin/Spring Boot services, service-to-service contracts and Kafka messaging.',
        'Account and permissions flows, Keycloak authentication and realtime sessions.',
        'React/TypeScript frontend, Telegram integration, deployment and diagnostics.'
      ],
      example: {
        title: 'From a game event to a notification',
        introduction: 'The event pipeline is one of the central parts of Mnemos. The platform has to show an event as it happens, update the feed and apply each user’s notification settings. Repeated reports must not turn into duplicate notifications.',
        steps: [
          { title: 'Collect', description: 'A separate collector observes supported activity and sends a report through an authenticated connection to realtime-service.' },
          { title: 'Process', description: 'event-service applies the event rules, normalizes the source data and stores the resulting event. Duplicate reports are filtered as part of processing.' },
          { title: 'Publish', description: 'Domain events are delivered through Kafka. The outbox/inbox infrastructure covers retries and repeated message delivery.' },
          { title: 'Notify', description: 'The realtime layer updates connected clients. notification-service checks saved subscriptions and hands eligible messages to the Telegram integration.' }
        ],
        conclusion: 'The same event can feed several parts of the product without the collector knowing about profiles, subscriptions or Telegram.'
      },
      details: [
        {
          title: 'Service boundaries',
          paragraphs: [
            'The backend is split around product responsibilities: accounts, events, notifications, player directory, profiles, wallet, social features and realtime transport. Each service owns its business logic and contracts. HTTP is used for synchronous operations; Kafka carries changes that other domains need to react to.',
            'Shared libraries contain messaging, authentication and infrastructure code rather than a shared domain model. This keeps common mechanisms reusable without forcing unrelated services into one dependency graph.'
          ]
        },
        {
          title: 'Reliable event processing',
          paragraphs: [
            'Publishing an event and updating a database cannot be treated as two unrelated operations. Mnemos uses a transactional outbox for outgoing events and inbox/deduplication for consumers. A retry can happen without creating a second logical event in every downstream service.',
            'Realtime delivery is separate from durable processing: WebSocket clients receive updates quickly, while the event and notification services remain responsible for persistent state.'
          ]
        },
        {
          title: 'Integrations and operational constraints',
          paragraphs: [
            'The player directory resolves identities, tracks presence and projects the current SAO realm. Its integration with the upstream API has quota and cooldown handling, separate request lanes and metrics for stale observations and queue pressure.',
            'Some scheduled work intentionally runs in a single replica while its rate limits are process-local. That is a documented constraint of the current implementation, not something hidden behind a “scalable” label.'
          ]
        }
      ],
      outcome: [
        'Mnemos is an independently built product that people actually use, with functionality extending well beyond its original event feed. I maintain the codebase, deploy changes and handle failures and regressions.',
        'The account screen brings together features backed by different services: live events, the account, the wallet, team membership and recent activity.'
      ],
      mediaLabel: 'Mnemos application',
      mediaDescription: 'Actual account home screen from the running product.'
    },
    uk: {
      label: 'Realtime-сервіси · власний продукт',
      introduction: [
        'Mnemos починався як спосіб стежити за подіями Cristalix SAO без постійного перегляду гри. Згодом це переросло в платформу зі стрічкою подій, підписками, профілями гравців, командами, сповіщеннями, нагородами й керуванням акаунтом.',
        'Я самостійно спроєктував і реалізував backend, вебзастосунок та розгортання. Mnemos користувалися близько 150 людей, частина можливостей була платною. Проєкт підтримую й надалі вдосконалюю.'
      ],
      responsibilities: [
        'Сервіси Kotlin/Spring Boot, контракти між ними та обробка подій через Kafka.',
        'Акаунти, права доступу, Keycloak і realtime-з’єднання.',
        'Вебінтерфейс React/TypeScript, Telegram-інтеграція, розгортання та діагностика.'
      ],
      example: {
        title: 'Від ігрової події до сповіщення',
        introduction: 'Обробка подій — одна з основ Mnemos. Подія має потрапити в стрічку та до користувачів із відповідними підписками. Водночас повторне повідомлення від джерела не повинно створювати дублікати.',
        steps: [
          { title: 'Збирання', description: 'Окремий collector фіксує підтримувану активність і надсилає звіт через автентифіковане з’єднання до realtime-service.' },
          { title: 'Обробка', description: 'event-service перевіряє, нормалізує й зберігає подію. Повторні звіти відсікаються під час обробки.' },
          { title: 'Публікація', description: 'Доменні події поширюються через Kafka. Механізми outbox/inbox враховують повторну доставку та повторні спроби.' },
          { title: 'Доставка', description: 'Realtime оновлює підключені клієнти. notification-service перевіряє підписки й передає відповідні повідомлення Telegram-інтеграції.' }
        ],
        conclusion: 'Collector не мусить знати про профілі, налаштування підписок або Telegram. Кожна частина системи обробляє свою відповідальність.'
      },
      details: [
        {
          title: 'Межі сервісів',
          paragraphs: [
            'Backend розділений за функціями продукту: акаунти, події, сповіщення, каталог гравців, профілі, гаманець, соціальні функції та realtime-транспорт. Кожен сервіс відповідає за власну логіку та контракти. HTTP використовується для синхронних операцій, Kafka — для змін, на які мають реагувати інші сервіси.',
            'У спільних бібліотеках залишаються механізми авторизації, обміну повідомленнями та інфраструктурний код. Спільну доменну модель між сервісами не створював.'
          ]
        },
        {
          title: 'Надійність обробки подій',
          paragraphs: [
            'Оновлення бази даних і публікація повідомлення не мають розходитися при збої. Для вихідних подій використовую transactional outbox, а на стороні споживачів — inbox та дедуплікацію. Це дозволяє обробляти повторну доставку без появи другої логічної події.',
            'Швидка доставка в інтерфейс винесена окремо від постійного зберігання: WebSocket передає оновлення клієнтам, а за цілісність стану відповідають доменні сервіси.'
          ]
        },
        {
          title: 'Зовнішні API та експлуатація',
          paragraphs: [
            'Каталог гравців відповідає за визначення особи, присутності в грі й поточного SAO-реалму. Роботу із зовнішнім API обмежують квоти, cooldown, окремі канали запитів та метрики черг і застарілих спостережень.',
            'Частина планових задач поки виконується лише в одній репліці, оскільки rate limiter процесно-локальний. Цю межу задокументував і враховую під час розгортання.'
          ]
        }
      ],
      outcome: [
        'Mnemos — продукт, який вийшов за межі початкової стрічки подій і має реальних користувачів. Я продовжую підтримувати його, розгортати зміни й виправляти проблеми, що виникають під час експлуатації.',
        'На головному екрані поєднані функції різних сервісів: актуальні події, акаунт, гаманець, команда та остання активність.'
      ],
      mediaLabel: 'Застосунок Mnemos',
      mediaDescription: 'Справжній екран головної сторінки акаунта.'
    }
  },
  wavecode: {
    en: {
      label: 'Rust library · optical format · web scanner',
      introduction: [
        'WaveCode is an optical format for media links. A small pattern of rounded bars encodes a supported track or video identity and, where the platform allows it, a starting timestamp. Unlike a generic shortened link, the code can be decoded without querying a WaveCode database.',
        'I built the Rust library, the encoding and decoding tools, native bindings, and a separate web application for scanning and creating codes. The browser uses the Rust codec compiled to WebAssembly rather than maintaining a second TypeScript implementation.'
      ],
      responsibilities: [
        'Optical V1 format, frame validation, error correction and decoding.',
        'Rust API, command-line tools, FFI/JVM bindings and WebAssembly interface.',
        'Mobile-first scanner and generator with camera, photo input and SVG/PNG export.'
      ],
      example: {
        title: 'Encoding a media link',
        introduction: 'The sample on this page is an actual WaveCode frame generated by the Rust library. It is not a logo: the lengths of its bars carry the encoded data.',
        steps: [
          { title: 'Parse the link', description: 'The encoder recognizes a supported platform and extracts the identity. A timestamp is retained only when the platform has a suitable native URL format.' },
          { title: 'Prepare the frame', description: 'The identity is packed into a versioned representation with validation and error-correction data.' },
          { title: 'Render the code', description: 'The result is mapped to 36 dual-rail columns and exported as SVG or PNG. A central quiet channel separates the two rails.' },
          { title: 'Scan locally', description: 'A Rust decoder compiled to WebAssembly processes the camera or uploaded image in the browser and reconstructs the original-platform link.' }
        ],
        conclusion: 'The browser does not send the photo to an image-recognition server, and the codec does not depend on a hosted catalogue of tracks.'
      },
      details: [
        {
          title: 'Format and error handling',
          paragraphs: [
            'V1 uses a fixed 36-column optical frame. The layout includes orientation information, a checksum and Reed–Solomon error correction. The decoder handles supported orientations and can tolerate some damaged symbols, though blur and severe perspective still cause failures.',
            'I kept the visual structure consistent rather than making the data depend on a particular decorative style. That distinction matters when the same code may be printed, displayed on a screen or used on small objects.'
          ]
        },
        {
          title: 'One Rust implementation',
          paragraphs: [
            'The public Rust library is the source of truth for encoding and decoding. Its functionality is exposed through a CLI, native bindings and a WebAssembly adapter. The web application talks to that adapter through a worker so image processing does not block UI interactions.',
            'This avoids subtle differences between decoders written independently for the browser and other platforms. Versioning also gives the format room to evolve without silently changing the meaning of existing codes.'
          ]
        },
        {
          title: 'Scanner UX',
          paragraphs: [
            'The web client supports live camera scanning, photo upload, creating a code from a link, and exporting real SVG/PNG files. The scan path tries different crops and scales for small or imperfect frames, with camera and torch controls when supported by the device.',
            'Decoding runs locally. Camera restrictions, poor exposure or motion blur still affect the result, so the photo-upload path remains available as an alternative.'
          ]
        }
      ],
      outcome: [
        'The library and browser scanner are working projects that I am still improving. The live web application provides the complete encode, scan and export workflow; the portfolio shows a valid sample and links to that application.',
        'WaveCode supports music services and selected video platforms, including YouTube, TikTok and Instagram Reels. It is open source, and the format does not need a proprietary track-ID service.'
      ],
      mediaLabel: 'WaveCode V1 example',
      mediaDescription: 'A valid optical frame produced by the Rust encoder.'
    },
    uk: {
      label: 'Rust-бібліотека · оптичний формат · вебсканер',
      introduction: [
        'WaveCode — оптичний формат для медіапосилань. Невеликий код із заокруглених смуг містить ідентифікатор треку або відео й, якщо платформа підтримує, початковий таймкод. Для декодування не потрібна власна база треків на сервері.',
        'Я розробив Rust-бібліотеку, інструменти кодування й декодування, нативні прив’язки та окремий вебзастосунок для сканування й генерації. У браузері працює та сама Rust-реалізація, скомпільована у WebAssembly, без дублювання алгоритму на TypeScript.'
      ],
      responsibilities: [
        'Оптичний формат V1, перевірка кадру, корекція помилок і декодування.',
        'Rust API, CLI, FFI/JVM-прив’язки та інтерфейс WebAssembly.',
        'Мобільний сканер і генератор: камера, фотографії, експорт SVG/PNG.'
      ],
      example: {
        title: 'Як кодується медіапосилання',
        introduction: 'На сторінці показаний справжній WaveCode, згенерований Rust-бібліотекою. Це не логотип: у висотах смуг записані дані.',
        steps: [
          { title: 'Аналіз посилання', description: 'Кодер розпізнає платформу й виділяє ідентифікатор. Таймкод зберігається лише тоді, коли платформа підтримує відповідний формат посилання.' },
          { title: 'Формування кадру', description: 'Ідентифікатор пакується у версіоноване представлення з перевіркою цілісності та надлишковими даними для корекції помилок.' },
          { title: 'Генерація', description: 'Дані відображаються у 36 дворядних колонках, а готовий код експортується в SVG або PNG. Між рядами залишається постійний вільний канал.' },
          { title: 'Локальне сканування', description: 'Rust-декодер через WebAssembly обробляє кадр камери або завантажене фото в браузері й відновлює посилання на оригінальну платформу.' }
        ],
        conclusion: 'Браузер не відправляє фотографію на сервер розпізнавання, а кодек не звертається до власної бази треків.'
      },
      details: [
        {
          title: 'Формат і корекція помилок',
          paragraphs: [
            'V1 має фіксовану рамку із 36 колонок. Вона містить інформацію для визначення орієнтації, контрольну суму й Reed–Solomon-корекцію помилок. Декодер підтримує обидві орієнтації та може відновлювати частину пошкоджених символів, хоча розмиття й сильна перспектива все ще заважають.',
            'Геометрію зробив стабільною, щоб інформація не залежала від декоративного оформлення. Це важливо, коли той самий код друкується, відображається на екрані або переноситься на невеликий фізичний предмет.'
          ]
        },
        {
          title: 'Одна реалізація на Rust',
          paragraphs: [
            'Публічна Rust-бібліотека відповідає за кодування й декодування. Її API доступний із CLI, нативних прив’язок та WebAssembly. Вебзастосунок викликає кодек через worker, тому обробка зображень не блокує інтерфейс.',
            'Так не доводиться підтримувати кілька незалежних декодерів із ризиком різної поведінки. Версіонування дозволяє вдосконалювати формат без прихованої зміни значення старих кодів.'
          ]
        },
        {
          title: 'Сканер і користувацький досвід',
          paragraphs: [
            'Вебверсія підтримує сканування камерою, завантаження фото, створення коду з посилання та експорт справжніх SVG/PNG. Сканер перевіряє різні масштаби й фрагменти зображення, а на підтримуваних пристроях доступні вибір камери та ліхтарик.',
            'Усі зображення обробляються локально. Через обмеження камер, експозицію та розмиття не кожний кадр буде прочитаний, тому є альтернативне завантаження фото.'
          ]
        }
      ],
      outcome: [
        'Бібліотека і браузерний сканер уже працюють, але я продовжую їх вдосконалювати. Повний цикл генерації, сканування та експорту доступний в окремому вебзастосунку; на портфоліо є валідний приклад і перехід до нього.',
        'WaveCode підтримує музичні сервіси та вибрані відеоплатформи, зокрема YouTube, TikTok й Instagram Reels. Проєкт відкритий, а для роботи формату не потрібен власний сервіс ідентифікаторів треків.'
      ],
      mediaLabel: 'Приклад WaveCode V1',
      mediaDescription: 'Валідний оптичний кадр, створений Rust-кодером.'
    }
  },
  c7xbotmanager: {
    en: {
      label: 'Native desktop application · network automation',
      introduction: [
        'C7xBotManager is a desktop tool for operating multiple lightweight Cristalix/Minecraft clients without launching a full game for each account. It handles authentication, session state, proxies and automation through a native manager and a headless Java runtime.',
        'I designed the application architecture, implemented its management tools and optimized networking and automation. The initial research into part of the authentication protocol had outside assistance. The product was distributed through one-time purchases to roughly ten users.'
      ],
      responsibilities: [
        'Modular Java backend: application API, runtime, protocol, navigation and SAO automation.',
        'Native Go/Win32 shell using WebView2, desktop integration and account controls.',
        'Session lifecycle, shared NIO transport, proxy management, recovery and diagnostics.'
      ],
      example: {
        title: 'Keeping hundreds of sessions manageable',
        introduction: 'The difficult part was not opening a socket. Each account has its own authentication state, connection, realm, queue, proxy and automation tasks. A bulk operation must not turn them into one global blocking workflow.',
        steps: [
          { title: 'Choose accounts', description: 'The desktop interface lets the operator select accounts or groups and send an action through the local API.' },
          { title: 'Track state', description: 'The Java runtime maintains the individual lifecycle of each account. Connection state and current automation are available for diagnostics.' },
          { title: 'Process traffic', description: 'A shared Netty/NIO network runtime handles protocol I/O. The packet pipeline includes proxy handling, encryption, framing and decoding.' },
          { title: 'Recover failures', description: 'Proxy health, quarantine, failover and reconnect policies handle connection errors without restarting the whole application.' }
        ],
        conclusion: 'The system has been used with up to 500 simultaneous client sessions. That figure describes actual configuration scale, not a synthetic performance benchmark.'
      },
      details: [
        {
          title: 'Shared transport and protocol handling',
          paragraphs: [
            'The Java side uses a shared NIO runtime rather than starting a full Minecraft process per account. Session initialization builds a Netty pipeline with optional SOCKS/HTTP proxy handlers, encryption, packet sizing and a codec for the supported protocol.',
            'One concrete problem was an interaction between proxied connections and PacketLib’s priority writes. Calling the normal activation path on Netty’s event loop could block while the proxy pipeline was still settling. I moved that activation to a small worker and let Netty queue the writes safely.'
          ]
        },
        {
          title: 'Desktop shell and backend separation',
          paragraphs: [
            'The interface is hosted in a native Go application with Win32 window handling and WebView2. It starts and manages a Java backend process and communicates with it through the local API. This keeps protocol and automation logic independent from window rendering.',
            'I also built account-group operations, live logs, diagnostics, an encrypted local account vault and isolated release/build profiles. Windows uses native window and tray integration; portable macOS/Linux builds open the manager UI in a browser.'
          ]
        },
        {
          title: 'Proxy pools and automation',
          paragraphs: [
            'Connections can use HTTP or SOCKS proxies, with pool health checks and failover. Each account needs a predictable network identity and error handling; a bad endpoint must not silently affect unrelated sessions.',
            'On top of the transport, the runtime implements realm switching, queue processing, navigation and dungeon automation. These features depend on actual server state rather than visual input automation.'
          ]
        }
      ],
      outcome: [
        'The product reached roughly ten paying users and supported configurations with up to 500 active client sessions. I continued developing it as both a networked runtime and a practical desktop tool.',
        'Protocol compatibility also requires ongoing work: packet handling, authentication and state transitions have to be adapted when the external service changes.'
      ],
      mediaLabel: 'C7xBotManager architecture',
      mediaDescription: 'A simplified view of real implementation layers; no invented UI screenshot.'
    },
    uk: {
      label: 'Нативний застосунок · мережева автоматизація',
      introduction: [
        'C7xBotManager — десктопний інструмент для керування багатьма полегшеними клієнтами Cristalix/Minecraft без запуску повноцінної гри для кожного акаунта. Програма відповідає за автентифікацію, стан сесій, проксі та автоматизацію через нативний менеджер і headless runtime на Java.',
        'Я спроєктував архітектуру, реалізував інструменти керування й оптимізував мережеву частину та автоматизацію. На початковому етапі дослідження частини протоколу автентифікації допомагала інша людина. Продукт розповсюджувався з разовою оплатою серед приблизно десяти користувачів.'
      ],
      responsibilities: [
        'Модульний Java backend: API застосунку, runtime, протокол, навігація та SAO-автоматизація.',
        'Нативна Go/Win32 оболонка з WebView2 та керуванням акаунтами.',
        'Життєвий цикл сесій, спільний NIO-транспорт, проксі, відновлення з’єднань і діагностика.'
      ],
      example: {
        title: 'Керування сотнями незалежних сесій',
        introduction: 'Найскладніше — не просто встановити з’єднання. Кожен акаунт має власний стан автентифікації, підключення, реалму, черги, проксі й задач автоматизації. Масова дія не повинна перетворювати це на одну глобальну блокувальну операцію.',
        steps: [
          { title: 'Вибір акаунтів', description: 'У десктопному інтерфейсі можна вибрати окремі акаунти або групи й передати дію через локальне API.' },
          { title: 'Керування станом', description: 'Java runtime окремо відстежує життєвий цикл кожного акаунта. Стан підключення й автоматизації доступний для діагностики.' },
          { title: 'Мережевий обмін', description: 'Спільний runtime на Netty/NIO обробляє пакети. У pipeline входять проксі, шифрування, формування пакетів і декодер протоколу.' },
          { title: 'Відновлення', description: 'Перевірки проксі, quarantine, failover та reconnect-політики обробляють збої без перезапуску всієї програми.' }
        ],
        conclusion: 'Система використовувалася з конфігураціями до 500 одночасних сесій. Це реальний масштаб використання, а не результат синтетичного бенчмарку.'
      },
      details: [
        {
          title: 'Спільний транспорт і протокол',
          paragraphs: [
            'Java-частина використовує спільний NIO runtime, а не окремий процес Minecraft для кожного акаунта. Під час створення сесії налаштовується Netty pipeline з підтримкою SOCKS/HTTP проксі, шифрування, формату пакетів і декодера.',
            'Одна з конкретних проблем виникала на проксованих підключеннях: пріоритетні записи PacketLib могли блокувати event loop Netty, поки proxy pipeline ще встановлювався. Я переніс етап активації на окремий невеликий worker, залишивши запис у канал через механізми Netty.'
          ]
        },
        {
          title: 'Розділення десктопної оболонки й backend',
          paragraphs: [
            'Інтерфейс працює в нативному застосунку на Go з Win32 і WebView2. Він запускає Java backend і керує ним через локальне API, тому протокол та автоматизація не залежать від рендерингу вікна.',
            'Також реалізував масові операції над акаунтами, логи, діагностику, зашифроване локальне сховище облікових записів та ізольовані профілі збірки й релізу. На Windows використовується нативне вікно й трей, на macOS/Linux — браузерний інтерфейс.'
          ]
        },
        {
          title: 'Проксі та автоматизація',
          paragraphs: [
            'Підключення можуть працювати через HTTP або SOCKS проксі, з перевіркою їхнього стану та переключенням при відмові. Важливо, щоб несправний endpoint не впливав непомітно на інші сесії.',
            'Поверх транспорту працюють перемикання реалмів, обробка черг, навігація та автоматизація данжів. Логіка використовує фактичний стан сервера, а не емуляцію візуальних натискань.'
          ]
        }
      ],
      outcome: [
        'Програма мала приблизно десять платних користувачів і підтримувала конфігурації до 500 активних клієнтів. Я розвивав її і як мережевий runtime, і як десктопний інструмент.',
        'Підтримка сумісності протоколу також стала частиною розробки: після змін зовнішнього сервісу потрібно адаптувати пакети, автентифікацію та переходи станів.'
      ],
      mediaLabel: 'Архітектура C7xBotManager',
      mediaDescription: 'Спрощений огляд реальних модулів; без вигаданих скриншотів.'
    }
  },
  studium: {
    en: {
      label: 'Full-stack LMS · academic project',
      introduction: [
        'Studium is a learning management system I developed independently. Students can work with assignments, tests, materials, grades and schedules; teachers manage their courses and review submissions; administrators handle the academic structure and user accounts.',
        'I built a React/TypeScript frontend and a Java 21/Spring backend split into services behind a single API gateway. The application runs in a test environment and was developed as an academic project, not as a deployed commercial LMS.'
      ],
      responsibilities: [
        'Role-specific React interfaces, API integration and assignment/test workflows.',
        'Java/Spring services, gateway routing, JWT authorization and separate data ownership.',
        'PostgreSQL persistence, MinIO file storage, Kafka events, notifications and testing.'
      ],
      example: {
        title: 'An assignment from creation to review',
        introduction: 'A single assignment crosses several areas of the platform. The teacher creates and publishes it, the student submits a file, and the teacher grades the submission. Permissions and file access have to remain consistent at each step.',
        steps: [
          { title: 'Publish', description: 'The teacher creates an assignment for a subject and group. The service keeps the assignment state and access scope.' },
          { title: 'Submit', description: 'The student uploads their work through the gateway. File metadata is stored in PostgreSQL; the actual file is kept in MinIO.' },
          { title: 'Review', description: 'The teacher sees the relevant submissions and records feedback or a grade, subject to role and ownership checks.' },
          { title: 'Update', description: 'The new result becomes available in the student workspace and can produce a notification through the event pipeline.' }
        ],
        conclusion: 'The frontend presents a consistent workflow while assignments, files, identity and notifications remain separate backend responsibilities.'
      },
      details: [
        {
          title: 'Gateway and data ownership',
          paragraphs: [
            'The public frontend uses a single Spring Cloud Gateway. Behind it, education, schedules, assignments, tests, files, notifications and other services own their respective data schemas. The gateway handles routing, access policy and selected response aggregations.',
            'Services communicate by REST where a result is needed immediately and through Kafka where a domain change should trigger another component. Cross-service database reads are not part of the business flow.'
          ]
        },
        {
          title: 'Authorization around real workflows',
          paragraphs: [
            'The role model includes student, teacher, admin and owner. A student can submit work and see their own results. Teachers manage subjects within their assigned scope, while administrators manage groups, rooms, schedules and users.',
            'Authorization is enforced by the backend and gateway rather than relying on hiding UI elements. The frontend still has distinct navigation and workspaces for each role.'
          ]
        },
        {
          title: 'Files and notifications',
          paragraphs: [
            'Binary files are stored in MinIO with metadata in PostgreSQL. Assignment services reference file identifiers and enforce policies, while file-service handles downloads and previews.',
            'Domain events are published to Kafka; notification-service can persist the resulting notification and make it available to the app or a Telegram bot. I also added integration and backend verification procedures for the test environment.'
          ]
        }
      ],
      outcome: [
        'Studium is a substantial full-stack project with separate student, teacher and administrator interfaces. The screenshots on this page are from the real application.',
        'It has been developed and tested in a non-production environment. I do not present it as a commercial deployment with real users.'
      ],
      mediaLabel: 'Studium interface',
      mediaDescription: 'Actual screens from student, teacher and administrator workspaces.'
    },
    uk: {
      label: 'Full-stack LMS · навчальний проєкт',
      introduction: [
        'Studium — навчальна платформа, яку я розробив самостійно. Студенти працюють із завданнями, тестами, матеріалами, оцінками й розкладом; викладачі керують дисциплінами та перевіряють роботи; адміністратори відповідають за академічну структуру й користувачів.',
        'Frontend реалізував на React/TypeScript, backend — на Java 21/Spring із кількома сервісами за єдиним API gateway. Застосунок працює в тестовому середовищі й розроблявся як навчальний проєкт, а не як комерційна LMS.'
      ],
      responsibilities: [
        'Окремі React-інтерфейси для ролей, API-інтеграція, завдання й тести.',
        'Java/Spring сервіси, gateway, JWT-авторизація та розділення даних між сервісами.',
        'PostgreSQL, файлове сховище MinIO, Kafka-події, сповіщення та тести.'
      ],
      example: {
        title: 'Завдання від публікації до перевірки',
        introduction: 'Одне завдання проходить через кілька частин системи. Викладач створює його, студент завантажує роботу, викладач виставляє оцінку. На кожному кроці мають правильно працювати права доступу й обробка файлів.',
        steps: [
          { title: 'Публікація', description: 'Викладач створює завдання для дисципліни та групи. Сервіс зберігає стан завдання й межі доступу.' },
          { title: 'Здача', description: 'Студент надсилає роботу через gateway. Метадані файлу зберігаються в PostgreSQL, сам файл — у MinIO.' },
          { title: 'Перевірка', description: 'Викладач переглядає відповідні роботи й виставляє оцінку або коментар із перевіркою ролі та належності.' },
          { title: 'Оновлення', description: 'Результат стає доступним студенту й може створити сповіщення через систему подій.' }
        ],
        conclusion: 'Для користувача це один процес, хоча завдання, файли, акаунти й сповіщення обробляються окремими сервісами.'
      },
      details: [
        {
          title: 'Gateway і володіння даними',
          paragraphs: [
            'Frontend працює через один Spring Cloud Gateway. За ним окремі сервіси освіти, розкладів, завдань, тестування, файлів і сповіщень володіють власними схемами даних. Gateway виконує маршрутизацію, перевірки політик доступу та частину агрегації відповідей.',
            'REST використовується для запитів, де відповідь потрібна відразу; Kafka — для подій, на які мають реагувати інші сервіси. Бізнес-логіка не читає таблиці чужих сервісів напряму.'
          ]
        },
        {
          title: 'Авторизація на рівні процесів',
          paragraphs: [
            'Ролі включають студента, викладача, адміністратора та власника. Студент може здавати роботи й переглядати власні результати, викладач — керувати своїми дисциплінами, адміністратор — групами, аудиторіями, розкладами й користувачами.',
            'Права перевіряються на backend та gateway, а не лише приховуванням кнопок у браузері. Водночас кожна роль має свій набір сторінок і навігацію.'
          ]
        },
        {
          title: 'Файли та сповіщення',
          paragraphs: [
            'Бінарні файли зберігаються в MinIO, метадані — в PostgreSQL. Сервіси завдань посилаються на ідентифікатори файлів і застосовують правила доступу, а file-service відповідає за завантаження та попередній перегляд.',
            'Доменні події передаються через Kafka; notification-service зберігає сповіщення та надає їх застосунку або Telegram-боту. Для тестового середовища також підготував інтеграційні перевірки backend.'
          ]
        }
      ],
      outcome: [
        'Studium — великий full-stack проєкт з окремими кабінетами студента, викладача й адміністратора. На сторінці показані справжні скриншоти застосунку.',
        'Система розроблена та протестована в непродукційному середовищі. Я не подаю її як комерційне розгортання з реальними користувачами.'
      ],
      mediaLabel: 'Інтерфейс Studium',
      mediaDescription: 'Справжні екрани студентського, викладацького й адміністративного кабінетів.'
    }
  }
};

export function narrativeFor(slug: ProjectSlug, lang: Language): Narrative {
  return narratives[slug][lang];
}
