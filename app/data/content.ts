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
        title: "A Newbie <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500\">TALL</span> Stack",
        description: "A powerful combination in PHP ecosystem. This modern stack allows me to build responsive, interactive, and maintainable web applications with exceptional speed and efficiency.",
        items: [
            {
                name: "Tailwind CSS",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
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
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png",
                borderColor: "border-red-200 dark:border-red-700",
                bgGradient: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30"
            },
            {
                name: "Livewire",
                logo: "https://logo.svgcdn.com/devicon/livewire-original-wordmark.png",
                borderColor: "border-purple-200 dark:border-purple-700",
                bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
            }
        ]
    },
    {
        id: "vilt",
        name: "VILT Stack",
        title: "Monolith Specialize in <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500\">VILT</span> Stack",
        description: "The VILT stack brings the power of Single Page Applications (SPA) with the simplicity of a classic monolith.",
        items: [
            {
                name: "Vue.js",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
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
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png",
                borderColor: "border-red-200 dark:border-red-700",
                bgGradient: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30"
            },
            {
                name: "Tailwind CSS",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
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
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuxt_logo.svg/1200px-Nuxt_logo.svg.png",
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
        image: "/images/erp.png",
        link: "https://erp.yourin.my.id/",
        tags: ["Laravel", "Livewire", "SQLite"]
    },
    {
        title: "QPay - QR Code Payment Platform",
        description: "SaaS platform that enables merchants to generate QR codes for products. Customers scan the QR code to view product details and checkout seamlessly at the cashier with an easy payment experience.",
        image: "/images/qpay.png",
        link: "https://qpay.yourin.my.id/",
        tags: ["Laravel", "Livewire", "SQLite"]
    },
    {
        title: "Task Management System",
        description: "Collaborative project management tool with teams, boards, and real-time collaboration features.",
        image: null, // Placeholder in original
        link: "#", // No link in original
        tags: ["Laravel", "Livewire", "PostgreSQL"]
    }
]

export const skills = {
    languages: [
        { name: "PHP", description: "Server-side Scripting", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png" },
        { name: "JavaScript", description: "Interactive Frontend", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png" },
        { name: "Go", description: "High Performance", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png" },
        { name: "Python", description: "Data Science & Scripting", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" }
    ],
    databases: [
        { name: "SQLite", description: "Embedded Database", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1200px-SQLite370.svg.png" },
        { name: "MySQL", description: "Relational Database", icon: "https://www.mysql.com/common/logos/logo-mysql-170x115.png" },
        { name: "PostgreSQL", description: "Advanced SQL", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" }
    ],
    devops: [
        { name: "Docker", description: "Containerization", icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
        { name: "CI/CD", description: "Automated Pipelines", icon: "https://cdn-icons-png.flaticon.com/512/1005/1005141.png" }, // Generic CI/CD icon
        { name: "Git", description: "Version Control", icon: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" }
    ],
    others: [
        { name: "REST API", description: "Architectural Style", icon: "https://www.shutterstock.com/image-vector/api-application-interface-icon-simple-600nw-2188533787.jpg" },
        { name: "WebSocket", description: "Real-time Protocol", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0GotAGXrAE49WpZlOvndF5w99JWfOEo00Q&s" },
        { name: "Postman", description: "API Development", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
        { name: "Mockoon", description: "API Mocking", icon: "https://mockoon.com/images/logo.svg" },
        { name: "Swagger", description: "API Toolkit", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GlozyrEsA25S68xqsWEgejZkSQPi2L7SBw&s" },
        { name: "AsyncAPI", description: "Event-Driven Spec", icon: "https://avatars.githubusercontent.com/u/16401334?s=280&v=4" }
    ]
}
