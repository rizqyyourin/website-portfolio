export const personalInfo = {
    name: "Ahmad Rizqy Yourin",
    role: "Ahmad Rizqy Yourin - Laravel Developer",
    title: "A Fullstack Laravel Developer",
    bio: "Delivering end-to-end web solutions, specializing in crafting scalable backends and intuitive frontends with a modern tech stack.",
    email: "rizqyyourin6@gmail.com",
    phone: "+6285774414941", // Formatted for WhatsApp link
    displayPhone: "+62 857 7441 4941",
    location: "Indonesia", // Assuming Indonesia based on phone/context, though not explicitly in text check
    socials: {
        github: "https://github.com/rizqyyourin",
        linkedin: "https://linkedin.com/in/rizqyyourin",
        instagram: "https://instagram.com/rizqyyourin",
        threads: "https://www.threads.com/@rizqyyourin",
        upwork: "https://www.upwork.com/freelancers/~01103c6049d69f345f?mp_source=share",
        whatsapp: "https://wa.me/6285774414941"
    }
}

export const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
]

export const techStacks = [
    {
        id: "tall",
        name: "TALL Stack",
        title: "Battle-Ready <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500\">TALL</span> Stack",
        description: "A powerful combination in PHP ecosystem. This modern stack allows me to build responsive, interactive, and maintainable web applications with exceptional speed and efficiency.",
        items: [
            {
                name: "Tailwind CSS",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/960px-Tailwind_CSS_Logo.svg.png",
                borderColor: "border-blue-200 dark:border-blue-700",
                bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
            },
            {
                name: "Alpine.js",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvNQyIyR6GOd1wFUk_UM5PScxQvwL0SSpsQ&s",
                borderColor: "border-green-200 dark:border-green-700",
                bgGradient: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30"
            },
            {
                name: "Laravel",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/3840px-Laravel.svg.png",
                borderColor: "border-red-200 dark:border-red-700",
                bgGradient: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30"
            },
            {
                name: "Livewire",
                logo: "https://avatars.githubusercontent.com/u/51960834?v=4",
                borderColor: "border-purple-200 dark:border-purple-700",
                bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
            }
        ]
    },
    {
        id: "vilt",
        name: "VILT Stack",
        title: "Monolith Specialist in <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500\">VILT</span> Stack",
        description: "The VILT stack brings the power of Single Page Applications (SPA) with the simplicity of a classic monolith.",
        items: [
            {
                name: "Vue.js",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/3840px-Vue.js_Logo_2.svg.png",
                borderColor: "border-emerald-200 dark:border-emerald-700",
                bgGradient: "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30"
            },
            {
                name: "Inertia.js",
                logo: "https://avatars.githubusercontent.com/u/47703742?s=280&v=4",
                borderColor: "border-purple-200 dark:border-purple-700",
                bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
            },
            {
                name: "Laravel",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/3840px-Laravel.svg.png",
                borderColor: "border-red-200 dark:border-red-700",
                bgGradient: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30"
            },
            {
                name: "Tailwind CSS",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/960px-Tailwind_CSS_Logo.svg.png",
                borderColor: "border-blue-200 dark:border-blue-700",
                bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
            }
        ]
    },
    {
        id: "hyper-go-nuxt",
        name: "Hyper-Go-Nuxt Stack",
        title: "Microservices with <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500\">Hyper-Go-Nuxt</span>",
        description: "A robust microservice architecture leveraging Hypervel and Goravel for high-performance backend services, coupled with Nuxt for a versatile frontend.",
        items: [
            {
                name: "Hypervel",
                logo: "https://avatars.githubusercontent.com/u/204051220?s=280&v=4",
                borderColor: "border-indigo-200 dark:border-indigo-700",
                bgGradient: "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30"
            },
            {
                name: "Goravel",
                logo: "https://github.com/goravel.png",
                borderColor: "border-cyan-200 dark:border-cyan-700",
                bgGradient: "from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30"
            },
            {
                name: "Nuxt",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuxt_logo.svg/960px-Nuxt_logo.svg.png",
                borderColor: "border-green-200 dark:border-green-700",
                bgGradient: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30"
            }
        ]
    }
]

export const projects = [
    {
        title: "ERP Minimal",
        description: "Lightweight enterprise resource planning system with inventory management, sales tracking, and financial reporting for small businesses.",
        image: "/images/erp/1.png",
        images: [
            "/images/erp/1.png",
            "/images/erp/2.png",
            "/images/erp/3.png",
            "/images/erp/4.png"
        ],
        link: "https://erp.yourin.my.id/",
        tags: ["Laravel", "Livewire", "PostgreSQL"]
    },
    {
        title: "QPay - QR Payment System",
        description: "A QR code-based payment system for seamless transactions, allowing users to pay using their smartphones by scanning QR codes at checkout.",
        image: "/images/qpay/1.png",
        images: [
            "/images/qpay/1.png",
            "/images/qpay/2.png",
            "/images/qpay/3.png",
            "/images/qpay/4.png",
            "/images/qpay/5.png"
        ],
        link: "https://qpay.yourin.my.id",
        tags: ["Laravel", "Vue", "PostgreSQL"]
    },
    {
        title: "Ticketin",
        description: "Customer experience CRM SaaS that helps companies handle customer complaints through service requests and email-based support channels.",
        image: "/images/ticketin/1.png",
        images: [
            "/images/ticketin/1.png",
            "/images/ticketin/2.png",
            "/images/ticketin/3.png",
            "/images/ticketin/4.png",
            "/images/ticketin/5.png",
            "/images/ticketin/6.png"
        ],
        link: "https://ticketin.yourin.my.id",
        tags: ["Next.js", "Prisma", "PostgreSQL"]
    }
]

export interface SkillNode {
    id: string
    name: string
    description: string
    icon: string
    category: 'languages' | 'databases' | 'devops' | 'apis'
    rank: 'RANK MAX' | 'RANK S' | 'RANK A+' | 'RANK A'
    mastery: number
    tier: number
    prereqIds: string[]
    tags: string[]
}

export interface SkillConnection {
    from: string
    to: string
}

export const skillTreeNodes: SkillNode[] = [
    // LANGUAGES BRANCH
    {
        id: 'javascript',
        name: 'JavaScript',
        description: 'Interactive Frontend & Modern Web Ecosystem',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
        category: 'languages',
        rank: 'RANK MAX',
        mastery: 95,
        tier: 0,
        prereqIds: [],
        tags: ['Frontend', 'ES6+', 'Async']
    },
    {
        id: 'php',
        name: 'PHP',
        description: 'Server-side Scripting & Web Backend',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1280px-PHP-logo.svg.png',
        category: 'languages',
        rank: 'RANK S',
        mastery: 90,
        tier: 1,
        prereqIds: ['javascript'],
        tags: ['Backend', 'OOP', 'Laravel']
    },
    {
        id: 'python',
        name: 'Python',
        description: 'Scripting, Automation & Data Processing',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/500px-Python-logo-notext.svg.png',
        category: 'languages',
        rank: 'RANK S',
        mastery: 88,
        tier: 1,
        prereqIds: ['javascript'],
        tags: ['Automation', 'Data', 'Scripting']
    },
    {
        id: 'go',
        name: 'Go',
        description: 'High Performance & Concurrency Microservices',
        icon: 'https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_LightBlue.png',
        category: 'languages',
        rank: 'RANK S',
        mastery: 86,
        tier: 2,
        prereqIds: ['python'],
        tags: ['Concurrency', 'Backend', 'High Perf']
    },

    // DATABASES BRANCH
    {
        id: 'sqlite',
        name: 'SQLite',
        description: 'Lightweight Embedded Relational Database',
        icon: 'https://icon.icepanel.io/Technology/svg/SQLite.svg',
        category: 'databases',
        rank: 'RANK A+',
        mastery: 85,
        tier: 0,
        prereqIds: [],
        tags: ['Storage', 'SQL', 'Embedded']
    },
    {
        id: 'mysql',
        name: 'MySQL',
        description: 'Relational Database Management System',
        icon: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
        category: 'databases',
        rank: 'RANK S',
        mastery: 90,
        tier: 1,
        prereqIds: ['sqlite'],
        tags: ['Relational', 'RDBMS', 'Indexing']
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        description: 'Advanced Enterprise Open-Source SQL Database',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/500px-Postgresql_elephant.svg.png',
        category: 'databases',
        rank: 'RANK S',
        mastery: 89,
        tier: 1,
        prereqIds: ['sqlite'],
        tags: ['Enterprise SQL', 'JSONB', 'ACID']
    },
    {
        id: 'redis',
        name: 'Redis',
        description: 'In-Memory Data Structure Store & Cache',
        icon: 'https://logowik.com/content/uploads/images/redis.jpg',
        category: 'databases',
        rank: 'RANK S',
        mastery: 88,
        tier: 2,
        prereqIds: ['postgresql'],
        tags: ['Caching', 'In-Memory', 'Pub/Sub']
    },

    // DEVOPS BRANCH
    {
        id: 'git',
        name: 'Git',
        description: 'Distributed Version Control & Workflows',
        icon: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
        category: 'devops',
        rank: 'RANK MAX',
        mastery: 92,
        tier: 0,
        prereqIds: [],
        tags: ['VCS', 'CLI', 'Branching']
    },
    {
        id: 'docker',
        name: 'Docker',
        description: 'Containerization & Environment Isolation',
        icon: 'https://cdn-icons-png.flaticon.com/512/919/919853.png',
        category: 'devops',
        rank: 'RANK S',
        mastery: 89,
        tier: 1,
        prereqIds: ['git'],
        tags: ['Containers', 'DevOps', 'Isolation']
    },
    {
        id: 'cicd',
        name: 'CI/CD',
        description: 'Automated Build, Test & Deployment Pipelines',
        icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
        category: 'devops',
        rank: 'RANK A+',
        mastery: 85,
        tier: 1,
        prereqIds: ['git'],
        tags: ['Pipelines', 'Automation', 'Actions']
    },

    // OTHERS / APIS BRANCH
    {
        id: 'restapi',
        name: 'REST API',
        description: 'Architectural Style for Web Services',
        icon: 'https://www.shutterstock.com/image-vector/api-application-interface-icon-simple-600nw-2188533787.jpg',
        category: 'apis',
        rank: 'RANK MAX',
        mastery: 96,
        tier: 0,
        prereqIds: [],
        tags: ['HTTP', 'JSON', 'Architecture']
    },
    {
        id: 'websocket',
        name: 'WebSocket',
        description: 'Real-time Full-Duplex Communication Protocol',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0GotAGXrAE49WpZlOvndF5w99JWfOEo00Q&s',
        category: 'apis',
        rank: 'RANK S',
        mastery: 87,
        tier: 1,
        prereqIds: ['restapi'],
        tags: ['Real-time', 'Sockets', 'Bi-directional']
    },
    {
        id: 'postman',
        name: 'Postman',
        description: 'API Testing & Workspace Collaboration',
        icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        category: 'apis',
        rank: 'RANK S',
        mastery: 92,
        tier: 1,
        prereqIds: ['restapi'],
        tags: ['API Testing', 'Collections', 'Mocking']
    },
    {
        id: 'swagger',
        name: 'Swagger',
        description: 'OpenAPI Specification & Interactive Docs',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GlozyrEsA25S68xqsWEgejZkSQPi2L7SBw&s',
        category: 'apis',
        rank: 'RANK A+',
        mastery: 86,
        tier: 1,
        prereqIds: ['restapi'],
        tags: ['OpenAPI', 'Documentation', 'Specs']
    },
    {
        id: 'asyncapi',
        name: 'AsyncAPI',
        description: 'Event-Driven API Specification Standard',
        icon: 'https://avatars.githubusercontent.com/u/16401334?s=280&v=4',
        category: 'apis',
        rank: 'RANK A',
        mastery: 82,
        tier: 2,
        prereqIds: ['websocket'],
        tags: ['Event-Driven', 'Spec', 'EDA']
    },
    {
        id: 'mockoon',
        name: 'Mockoon',
        description: 'Local Mocking Tool for Rapid API Design',
        icon: 'https://mockoon.com/images/logo.svg',
        category: 'apis',
        rank: 'RANK A',
        mastery: 84,
        tier: 2,
        prereqIds: ['postman'],
        tags: ['Mocking', 'Prototyping', 'Local API']
    }
]

export const skillTreeConnections: SkillConnection[] = [
    // Languages connections (JavaScript -> PHP & Python, Python -> Go)
    { from: 'javascript', to: 'php' },
    { from: 'javascript', to: 'python' },
    { from: 'python', to: 'go' },

    // Databases connections (SQLite -> MySQL & PostgreSQL, PostgreSQL -> Redis)
    { from: 'sqlite', to: 'mysql' },
    { from: 'sqlite', to: 'postgresql' },
    { from: 'postgresql', to: 'redis' },

    // DevOps connections (Git -> Docker & CI/CD)
    { from: 'git', to: 'docker' },
    { from: 'git', to: 'cicd' },

    // APIs connections (REST API -> WebSocket, Postman, Swagger)
    { from: 'restapi', to: 'websocket' },
    { from: 'restapi', to: 'postman' },
    { from: 'restapi', to: 'swagger' },
    { from: 'websocket', to: 'asyncapi' },
    { from: 'postman', to: 'mockoon' }
]

export const skills = {
    languages: skillTreeNodes.filter(n => n.category === 'languages'),
    databases: skillTreeNodes.filter(n => n.category === 'databases'),
    devops: skillTreeNodes.filter(n => n.category === 'devops'),
    others: skillTreeNodes.filter(n => n.category === 'apis')
}

