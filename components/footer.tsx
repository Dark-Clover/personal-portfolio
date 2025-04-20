"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, Heart, Code, Terminal } from "lucide-react"
import GlitchText from "./glitch-text"
import { Button } from "@/components/ui/button"
import ResumeDownloadButton from "./resume-download-button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-emerald-500/20 relative overflow-hidden">
      {/* Background code pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <pre className="text-[0.5rem] leading-tight text-emerald-500 font-mono">
          {`
function Portfolio() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch developer data
    const fetchData = async () => {
      try {
        const data = await getDeveloperData('usman');
        setSkills(data.skills);
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <main className="portfolio">
      <Header />
      <About />
      <Projects data={projects} />
      <Contact />
      <Footer />
    </main>
  );
}

export default Portfolio;
          `.repeat(5)}
        </pre>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Logo and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <Terminal className="h-5 w-5 text-emerald-500 mr-2" />
              <GlitchText className="text-2xl font-bold gradient-text">Usman Arshad</GlitchText>
              <span className="text-emerald-500 animate-blink ml-1">_</span>
            </div>

            <p className="text-foreground/70 mb-4">
              Full-stack developer specializing in web and mobile applications with expertise in Firebase, React, and
              Flutter.
            </p>

            <div className="flex space-x-4 mb-4">
              <motion.a
                href="https://github.com/Dark-Clover"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-emerald-500 transition-colors"
                whileHover={{ y: -5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/usman-arshad-647235247"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-emerald-500 transition-colors"
                whileHover={{ y: -5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/usmaniii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-emerald-500 transition-colors"
                whileHover={{ y: -5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="mailto:usman11arshad22@gmail.com"
                className="text-foreground/70 hover:text-emerald-500 transition-colors"
                whileHover={{ y: -5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </motion.a>
            </div>

            <div className="bg-gray-900 rounded-md p-3 font-mono text-xs text-gray-400 border border-gray-800">
              <div className="flex items-center text-emerald-500">
                <Code className="h-4 w-4 mr-2" />
                <span>console.log('Let\'s build something amazing together!');</span>
              </div>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Navigation
            </h3>
            <div className="space-y-2">
              {["Home", "About", "Projects", "Resume", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground/70 hover:text-emerald-500 transition-colors block font-mono text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  custom={index}
                >
                  <span className="text-emerald-500 mr-2">{`0${index + 1}`}</span>
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-4 flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              Connect
            </h3>

            <p className="text-foreground/70 mb-4 text-sm">
              Feel free to reach out for collaborations or just a friendly chat!
            </p>

            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-600/20 border-emerald-500 text-white hover:bg-emerald-600/40 w-full mb-4"
              asChild
            >
              <a href="#contact">
                <Mail className="h-4 w-4 mr-2" />
                Contact Me
              </a>
            </Button>

            <ResumeDownloadButton
              variant="outline"
              size="sm"
              className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800 w-full"
            />
          </motion.div>
        </div>

        <div className="border-t border-emerald-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-0 font-mono text-sm"
            >
              <p className="text-foreground/70">
                <span className="text-emerald-500">const</span> copyright ={" "}
                <span className="text-amber-300">"{currentYear} Usman Arshad"</span>;
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-foreground/70 text-sm flex items-center"
            >
              <span className="mr-1">Designed & Built with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span className="ml-1">by Usman Arshad</span>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}
