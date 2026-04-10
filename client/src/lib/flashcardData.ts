export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export const flashcardDatabase: FlashCard[] = [
  // Self-Introduction & Background
  {
    id: "fc-001",
    question: "Tell me about yourself and your professional background.",
    answer:
      "I am KunHwi Ryu, a Senior MES Developer at DB HiTek with over 4 years of experience. I specialize in C# (Client), C (Server), and Oracle DB. Recently, I was promoted to Senior Engineer in recognition of my contributions to workflow automation and system reliability. I am a self-starter who bridges the gap between semiconductor hardware and software systems.",
    category: "Self-Introduction",
    difficulty: "easy",
  },
  {
    id: "fc-002",
    question: "What makes you interested in Lam Research?",
    answer:
      "First, Lam KTC is Asia's only R&D center, and I want to contribute to building a global MES platform from scratch. Second, my expertise in site-level MES aligns perfectly with R&D lab automation needs. Finally, living only 10km away from Giheung ensures my commute stability and high focus on work.",
    category: "Why Lam Research",
    difficulty: "easy",
  },
  {
    id: "fc-003",
    question: "What are your core technical competencies?",
    answer:
      "My core competencies include C# and C programming, Oracle database design and optimization, MES system architecture, and Python-based data analysis. I have hands-on experience with MOCVD process integration, wafer batch processing, and real-time system monitoring. Additionally, I have developed AI models for OCR image recognition and automated data handling.",
    category: "Technical Skills",
    difficulty: "medium",
  },
  {
    id: "fc-004",
    question:
      "Can you describe your most challenging project and how you overcame it?",
    answer:
      "My most challenging project was integrating the MOCVD process, which required splitting 15 wafers into 5-wafer batches. I developed custom logic to classify wafers by grade and monitor their counts. Once 17 wafers of the same grade were gathered, the system automatically created a new 'EPI Lot,' ensuring 100% wafer-level traceability and significantly improving production efficiency.",
    category: "Technical Deep Dive",
    difficulty: "hard",
  },
  {
    id: "fc-005",
    question:
      "Tell me about a time you solved a critical infrastructure problem.",
    answer:
      "We faced a shortage of LAN ports, so I implemented wireless printers. However, the fab security only allowed 'Static IPs,' and our MES used ZPL while the new printers used TSPL. I wrote a real-time conversion program to translate ZPL into TSPL, which saved significant infrastructure costs and allowed operators to print labels anywhere in the line.",
    category: "Problem Solving",
    difficulty: "hard",
  },
  {
    id: "fc-006",
    question: "How have you applied AI and data analytics in your work?",
    answer:
      "I developed a Python program to automate messy Excel data handling, which improved data accuracy. Currently, I am developing an automated sample confirmation system using AI models to recognize numeric values from CD-SEM images via FTP. This will significantly reduce manual work for our engineers and improve overall efficiency.",
    category: "AI & Automation",
    difficulty: "medium",
  },
  {
    id: "fc-007",
    question: "What is your experience with platform migration and learning?",
    answer:
      "Miracom and CM share about 80% common foundation in C#, Oracle, and core MES concepts. I am confident in mastering Angular and TypeScript within two weeks by leveraging my existing C# logic. My plan is to complete the CM Front-end and Back-end certification within the first month.",
    category: "Platform Transition",
    difficulty: "medium",
  },
  {
    id: "fc-008",
    question: "Describe a situation where you had to resolve a conflict.",
    answer:
      "When developing an auto-sort system, there was a disagreement between teams about skipping measurements. I created a special group within the Production team where only authorized members could skip the process. This satisfied both safety and flexibility requirements, demonstrating my ability to balance competing priorities.",
    category: "Soft Skills",
    difficulty: "medium",
  },
  {
    id: "fc-009",
    question: "What are your salary expectations?",
    answer:
      "Currently, my total compensation is around 81 million KRW. Considering the transition to a non-inclusive wage system and the expertise required for the CM platform, I am targeting a Base Salary of 75 to 78 million KRW, with a total package around 98 million KRW.",
    category: "Logistics",
    difficulty: "easy",
  },
  {
    id: "fc-010",
    question:
      "What are the biggest technical challenges the E-team is currently facing regarding the CM rollout?",
    answer:
      "The CM rollout presents several challenges: platform compatibility across different fab environments, training and certification requirements for existing engineers, and ensuring seamless data migration from legacy systems. Additionally, balancing the learning curve with production demands while maintaining system stability is critical.",
    category: "Reverse Questions",
    difficulty: "hard",
  },
  {
    id: "fc-011",
    question:
      "Does Lam Research provide specific training or support for the CM certification program?",
    answer:
      "I would appreciate understanding the structured training pathway for CM certification. Specifically, whether there are dedicated training modules, mentorship programs, or if engineers are expected to self-study while maintaining production responsibilities. This will help me plan my learning strategy effectively.",
    category: "Reverse Questions",
    difficulty: "medium",
  },
  {
    id: "fc-012",
    question:
      "How does the team balance collaboration between Singapore managers and the local engineering team in Giheung?",
    answer:
      "I am interested in understanding the collaboration model. Specifically, how decisions are made between Singapore headquarters and the Giheung R&D team, what the communication frequency is, and how local autonomy is balanced with global standards. This will help me understand the organizational dynamics.",
    category: "Reverse Questions",
    difficulty: "medium",
  },
  {
    id: "fc-013",
    question: "What does a typical day look like for a Senior MES Developer at KTC?",
    answer:
      "A typical day likely involves collaborating with R&D engineers on system requirements, developing and testing MES features, attending cross-functional meetings with Singapore teams, and troubleshooting production issues. I would also dedicate time to continuous learning, whether it's mastering CM platform features or optimizing existing systems.",
    category: "Day-to-Day Work",
    difficulty: "easy",
  },
  {
    id: "fc-014",
    question:
      "How do you stay updated with the latest developments in semiconductor manufacturing?",
    answer:
      "I actively follow industry publications, attend webinars on semiconductor process innovations, and participate in technical forums. Additionally, I learn directly from our fab engineers about emerging challenges and process improvements. My experience with MOCVD, wafer processing, and real-time monitoring keeps me engaged with cutting-edge manufacturing technologies.",
    category: "Continuous Learning",
    difficulty: "medium",
  },
  {
    id: "fc-015",
    question:
      "Can you explain the difference between your previous MES experience and Critical Manufacturing?",
    answer:
      "My previous experience was with Miracom MES, which is a Korean-focused system. Critical Manufacturing (CM) is a global platform used by major fabs worldwide. While both systems manage manufacturing execution, CM offers more advanced features for complex process control, global scalability, and integration with Industry 4.0 technologies. The core MES logic remains similar, but CM's architecture is more modular and flexible.",
    category: "Technical Comparison",
    difficulty: "hard",
  },
  {
    id: "fc-016",
    question: "What motivates you to work in the semiconductor industry?",
    answer:
      "The semiconductor industry fascinates me because it's at the intersection of physics, engineering, and innovation. Every chip produced impacts millions of devices worldwide. I am motivated by the challenge of building reliable systems that directly improve manufacturing efficiency and product quality. Working at Lam Research KTC would allow me to contribute to global innovation at the highest level.",
    category: "Career Motivation",
    difficulty: "medium",
  },
  {
    id: "fc-017",
    question:
      "How do you approach learning new technologies or programming languages?",
    answer:
      "I follow a structured approach: first, I understand the core principles and architecture. Then, I build small projects to practice hands-on. Finally, I apply the knowledge to real-world problems. For example, when learning Python, I immediately used it to automate data handling in Excel. This practical approach ensures I retain knowledge and can contribute quickly.",
    category: "Learning Strategy",
    difficulty: "medium",
  },
  {
    id: "fc-018",
    question:
      "What is your experience with cross-functional team collaboration?",
    answer:
      "Throughout my career at DB HiTek, I have collaborated extensively with hardware engineers, process specialists, and production teams. I bridge the gap between their requirements and software solutions. For instance, when implementing the MOCVD integration, I worked closely with process engineers to understand their needs and translated them into robust software logic.",
    category: "Teamwork",
    difficulty: "medium",
  },
  {
    id: "fc-019",
    question: "How do you handle tight deadlines and high-pressure situations?",
    answer:
      "I prioritize tasks based on impact and urgency. When facing tight deadlines, I break down complex problems into manageable chunks and focus on delivering the most critical features first. I also communicate transparently with stakeholders about progress and potential risks. My promotion to Senior Engineer reflects my ability to deliver under pressure while maintaining quality.",
    category: "Soft Skills",
    difficulty: "medium",
  },
  {
    id: "fc-020",
    question:
      "What are your long-term career goals, and how does Lam Research fit into them?",
    answer:
      "My long-term goal is to become a global semiconductor systems expert who can lead large-scale MES implementations across multiple fabs. Lam Research KTC is the perfect stepping stone because it offers exposure to cutting-edge R&D, global collaboration, and the opportunity to work on next-generation manufacturing systems. I aspire to eventually lead cross-functional teams and contribute to industry standards.",
    category: "Career Goals",
    difficulty: "hard",
  },
];

export function getRandomFlashcards(count: number = 5): FlashCard[] {
  const shuffled = [...flashcardDatabase].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getFlashcardsByCategory(category: string): FlashCard[] {
  return flashcardDatabase.filter((card) => card.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(flashcardDatabase.map((card) => card.category)));
}
