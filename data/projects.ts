// Project type definition
export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  category: "professional" | "academic" | "personal"
  date?: string
  institution?: string
  hideButtons?: boolean
  featured?: boolean
}

// Project data with enhanced details
export const projects: Project[] = [
  {
    id: "clad-creative",
    title: "CladCreative - Media & Marketing Agency",
    description:
      "Designed and developed a modern website for CladCreative, a media and marketing agency based in Ireland. The site features a sleek dark theme with orange accents, smooth animations, and a responsive design that showcases their services, portfolio, and packages with an elegant user interface.",
    image: "/clad-creative.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    github: "#",
    demo: "https://www.cladcreative.com/",
    category: "professional",
    date: "2024",
    featured: true,
  },
  {
    id: "triadic-marketing",
    title: "Triadic Marketing Media Website",
    description:
      "Designed and developed a modern, responsive website for Triadic Marketing Media, a digital marketing agency that helps brands grow through strategic marketing solutions. The site features a clean, professional design with smooth animations, interactive elements, and optimized performance for all devices.",
    image: "/triadic-marketing.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "SEO"],
    github: "#",
    demo: "https://triadicmarketing.com/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
  },
  {
    id: "saleha-khan",
    title: "Saleha Khan Healer Website",
    description:
      "Developed a session booking website for healer and therapist Saleha Khan, featuring an integrated payment system and an admin dashboard for managing appointments. The site provides a serene, user-friendly interface that reflects her healing practice.",
    image: "/saleha.png",
    tags: ["React", "Payment Integration", "Admin Dashboard", "Booking System", "Responsive Design"],
    github: "#",
    demo: "https://www.salehakhanhealer.com/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
  },
  {
    id: "h2h-courses",
    title: "H2H Courses - Relationship Learning Platform",
    description:
      "A fully functional online learning platform developed for Heart2Heart, offering users a seamless way to explore, purchase, and access digital relationship courses. Implemented Firebase authentication, Stripe payment integration, and dynamic content access control with a user dashboard for course management.",
    image: "/heart2heart.png",
    tags: ["Firebase", "Stripe", "React", "Firestore", "Authentication"],
    github: "#",
    demo: "http://h2hcourses.com",
    category: "professional",
    featured: true,
  },
  {
    id: "kingsmen-portfolio",
    title: "Anees Kingsmen Portfolio",
    description:
      "Designed and developed a sleek, luxury-themed portfolio website for Anees Antapur, the CEO of Kingsmen Real Estate, one of the most successful real estate companies in UAE. The site features elegant animations, responsive design, and a sophisticated black and gold color scheme that reflects the premium brand identity.",
    image: "/kings-men.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "Luxury Branding"],
    github: "#",
    demo: "https://aneeskingsmen.com/",
    category: "professional",
    featured: true,
  },
  {
    id: "reflections-with-rubina",
    title: "Reflections with Rubina - US based Therapy booking system",
    description:
      "Developed a comprehensive therapy booking system for a US-based therapist, featuring a live and CRUD dashboard for appointment management, secure Authorize.net payment integration, a user-friendly design, Supabase for database management, and automated email notifications.",
    image: "/reflections-with-rubina-image.png",
    tags: [
      "Next.js",
      "React",
      "Supabase",
      "Authorize.net",
      "Booking System",
      "Dashboard",
      "Email Notifications",
      "Responsive Design",
    ],
    github: "#",
    demo: "https://www.reflectionswithrubina.com/",
    category: "professional",
    date: "2024",
    featured: true,
  },
  {
    id: "the-airports-transfer",
    title: "The Airports Transfer Limited - UK Based CAB booking system",
    description:
      "Built a robust UK-based cab booking system for point-to-point and airport transfers. Features include a detailed booking flow, real-time journey route fare estimator, miles calculator, secure Stripe payment integration, advanced branding, and a comprehensive database.",
    image: "/tatl-image.png",
    tags: [
      "Next.js",
      "React",
      "Stripe",
      "Booking System",
      "Fare Estimator",
      "Database",
      "Responsive Design",
      "UK Market",
    ],
    github: "#",
    demo: "https://www.theairportstransfer.co.uk/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
  },
  {
    id: "baba-fareed-suitings",
    title: "Baba Fareed Suitings - Ecommerce Store",
    description:
      "Developed a sophisticated e-commerce store for a suitings brand, featuring a user-friendly interface, comprehensive mail notification system, an intuitive dashboard for order management, and a robust order tracking system with integrated database.",
    image: "/babafareed-image.png",
    tags: [
      "Next.js",
      "React",
      "E-commerce",
      "Dashboard",
      "Order Tracking",
      "Email Notifications",
      "Database",
      "Tailwind CSS",
    ],
    github: "#",
    demo: "https://www.babafareedsuitings.com/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
  },
  {
    id: "savvy-perfumes",
    title: "Savvy Perfumes - UAE based Ecommerce Store",
    description:
      "Crafted a minimal and luxurious e-commerce store for a UAE-based perfume brand. Unique features include GPT-generated product images, a comprehensive dashboard, advanced tracking system, automated email notifications, and seamless integration with Supabase for data management.",
    image: "/savvy-image.png",
    tags: [
      "Next.js",
      "React",
      "E-commerce",
      "Supabase",
      "Dashboard",
      "Order Tracking",
      "Email Notifications",
      "AI Generated Images",
      "Luxury Design",
      "UAE Market",
    ],
    github: "#",
    demo: "https://www.alfredverne.com/",
    category: "professional",
    date: "2024",
    featured: true,
  },
  {
    id: "the-big-hustler",
    title: "The Big Hustler Website Page - Dubai Based Magazine",
    description:
      "Designed and developed a premium and elite website page for a Dubai-based magazine, 'The Big Hustler'. The site features a sophisticated theme, high-quality content presentation, and exclusive features tailored for a discerning audience.",
    image: "/tbh-image.png",
    tags: [
      "Next.js",
      "React",
      "Magazine",
      "Premium Features",
      "Responsive Design",
      "Dubai Market",
      "Content Management",
    ],
    github: "#",
    demo: "https://www.thebighustler.com/",
    category: "professional",
    date: "2024",
    featured: true,
  },
  {
    id: "anime-streaming",
    title: "OtakuStream - Anime Streaming App",
    description:
      "Developed a feature-rich anime streaming application that allows users to browse, search, and watch their favorite anime series. Implemented user authentication, favorites list, and watch history tracking with a clean, intuitive interface designed for anime enthusiasts.",
    image: "/anime-streaming-app.png",
    tags: ["React Native", "Firebase", "API Integration", "Mobile Development", "UI/UX Design"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Feb 2024 - Apr 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "fake-news-detector",
    title: "Vericheck Fake News Detector",
    description:
      "Developed an AI-powered platform that analyzes news articles, social media posts, and other content to detect misinformation in real-time. Using advanced NLP models and machine learning algorithms, VeriCheck separates fact from fiction with high accuracy, helping users verify the credibility of online information.",
    image: "/vericheck.png",
    tags: ["Python", "NLP", "Machine Learning", "React", "Next.js", "AI"],
    github: "#",
    demo: "https://v0-veri-check-website-design.vercel.app/",
    category: "academic",
    date: "Nov 2024 - Jan 2025",
    institution: "Bahria University",
    hideButtons: false,
  },
  {
    id: "srs-document",
    title: "SRS Document on Google Chrome",
    description:
      "Developed a comprehensive Software Requirements Specification (SRS) document for Google Chrome enhancements. Covered aspects like user classes, product functions, external interfaces, and nonfunctional requirements. Enhanced skills in requirement analysis and documentation.",
    image: "/srs-document-abstract.png",
    tags: ["Requirements Analysis", "UML", "Data-flow Diagrams", "Activity Diagrams", "ERD"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "May 2024 - Jun 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "vulnerability-assessment",
    title: "Nessus Vulnerability Assessment",
    description:
      "Utilized the Nessus Vulnerability Scanner to assess security vulnerabilities on our university's website and Yahoo. Analyzed scan results, prioritized critical issues, and provided actionable recommendations to enhance website security.",
    image: "/cyber-threat-overview.png",
    tags: ["Cybersecurity", "Vulnerability Assessment", "Security Analysis", "Nessus"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Apr 2024 - May 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "image-gallery",
    title: "CodeAlpha Image Gallery",
    description:
      "A responsive image gallery built with HTML, CSS, and JavaScript. It features a seamless design that adjusts across all devices, allowing users to zoom in on images for detailed viewing. The gallery includes smooth transitions and a user-friendly interface.",
    image: "/image-gallery-project.png",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    github: "https://github.com/Dark-Clover/CodeAlpha_Image_Gallery",
    demo: "#",
    category: "personal",
    hideButtons: true,
  },
  {
    id: "music-player",
    title: "Music Player",
    description:
      "Personal Portfolio and Music Player project that includes a simple music player. The portfolio showcases personal information, skills, projects, and contact details, while the integrated music player allows visitors to enjoy music while browsing.",
    image: "/music-player-project.png",
    tags: ["JavaScript", "HTML", "CSS", "Audio API"],
    github: "https://github.com/Dark-Clover/Music-Player",
    demo: "#",
    category: "personal",
    hideButtons: true,
  },
]
