export interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  createdAt?: string;
}

export const initialProjects: ProjectItem[] = [
  {
    _id: 'proj-1',
    title: 'MindBridge AI',
    description:
      'A digital student psychological support platform designed to provide emotional guidance, psychological awareness, personalized support, and useful resources for students.',
    technologies: ['React', 'Node.js', 'Express', 'AI Integration', 'MongoDB'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2025-11-01').toISOString(),
  },
  {
    _id: 'proj-2',
    title: 'Syllabus Intelligence Analyzer',
    description:
      'A system that analyzes syllabus content and previous-year question papers to identify important topics and help students prepare effectively.',
    technologies: ['Python', 'NLP', 'Data Analysis', 'Flask', 'React'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2025-12-05').toISOString(),
  },
  {
    _id: 'proj-3',
    title: 'AI Study Assistant Dashboard',
    description:
      'A study-focused dashboard designed to support learning activities, academic resources, and study assistance.',
    technologies: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2026-01-10').toISOString(),
  },
  {
    _id: 'proj-4',
    title: 'AI Sentiment Analysis Web Application',
    description:
      'A web application that analyzes text and identifies the sentiment expressed in the input.',
    technologies: ['Python', 'Machine Learning', 'NLP', 'JavaScript', 'CSS3'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2026-01-28').toISOString(),
  },
  {
    _id: 'proj-5',
    title: 'Household Water Usage Analysis & Conservation Plan',
    description:
      'A project focused on analyzing household water consumption and providing conservation recommendations.',
    technologies: ['Data Analysis', 'Python', 'Data Visualization', 'Problem Solving'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2026-02-14').toISOString(),
  },
  {
    _id: 'proj-6',
    title: 'Frontend Web Development Projects',
    description:
      'A collection of frontend projects created to practice HTML, CSS, JavaScript and responsive web development.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2026-02-22').toISOString(),
  },
  {
    _id: 'proj-7',
    title: 'Java and Python Mini Projects',
    description:
      'A collection of Java and Python mini projects created to improve programming, problem-solving and software development skills.',
    technologies: ['Java', 'Python', 'OOP', 'Data Structures & Algorithms'],
    github: '',
    liveDemo: '',
    createdAt: new Date('2026-03-01').toISOString(),
  },
];
