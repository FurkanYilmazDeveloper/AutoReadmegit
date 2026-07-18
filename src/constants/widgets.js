export const WIDGET_TYPES = {
  PROFILE_CARD: 'profile-card',
  SOCIAL_BADGES: 'social-badges',
  TECH_STACK: 'tech-stack',
  GITHUB_STATS: 'github-stats',
};

export const PLATFORMS = [
  { id: 'github', name: 'GitHub', icon: 'github', color: '#181717', baseUrl: 'https://github.com/' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2', baseUrl: 'https://linkedin.com/in/' },
  { id: 'twitter', name: 'X / Twitter', icon: 'twitter', color: '#1DA1F2', baseUrl: 'https://twitter.com/' },
  { id: 'medium', name: 'Medium', icon: 'medium', color: '#000000', baseUrl: 'https://medium.com/@' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube', color: '#FF0000', baseUrl: 'https://youtube.com/c/' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: '#E1306C', baseUrl: 'https://instagram.com/' },
  { id: 'twitch', name: 'Twitch', icon: 'twitch', color: '#9146FF', baseUrl: 'https://twitch.tv/' },
  { id: 'discord', name: 'Discord (Davet Linki)', icon: 'discord', color: '#5865F2', baseUrl: '' },
  { id: 'website', name: 'Kişisel Web Sitesi', icon: 'globe', color: '#10B981', baseUrl: '' },
];

export const TECH_LIST = [
  // Frontend
  { id: 'html5', name: 'HTML5', category: 'Frontend', badge: 'HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' },
  { id: 'css3', name: 'CSS3', category: 'Frontend', badge: 'CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', badge: 'JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', badge: 'TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
  { id: 'react', name: 'React', category: 'Frontend', badge: 'React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend', badge: 'Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', badge: 'next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white' },
  { id: 'tailwind', name: 'TailwindCSS', category: 'Frontend', badge: 'Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' },
  { id: 'sass', name: 'Sass', category: 'Frontend', badge: 'Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white' },
  
  // Backend & Mobile
  { id: 'nodejs', name: 'Node.js', category: 'Backend', badge: 'Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' },
  { id: 'express', name: 'Express', category: 'Backend', badge: 'Express.js-000000?style=for-the-badge&logo=express&logoColor=white' },
  { id: 'python', name: 'Python', category: 'Backend', badge: 'Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
  { id: 'go', name: 'Go', category: 'Backend', badge: 'Go-00ADD8?style=for-the-badge&logo=go&logoColor=white' },
  { id: 'rust', name: 'Rust', category: 'Backend', badge: 'Rust-000000?style=for-the-badge&logo=rust&logoColor=white' },
  { id: 'java', name: 'Java', category: 'Backend', badge: 'Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white' },
  { id: 'php', name: 'PHP', category: 'Backend', badge: 'PHP-777BB4?style=for-the-badge&logo=php&logoColor=white' },
  { id: 'flutter', name: 'Flutter', category: 'Backend', badge: 'Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white' },

  // Databases & DevOps & Tools
  { id: 'postgresql', name: 'PostgreSQL', category: 'DevOps & Databases', badge: 'PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' },
  { id: 'mongodb', name: 'MongoDB', category: 'DevOps & Databases', badge: 'MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' },
  { id: 'mysql', name: 'MySQL', category: 'DevOps & Databases', badge: 'MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white' },
  { id: 'redis', name: 'Redis', category: 'DevOps & Databases', badge: 'Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white' },
  { id: 'git', name: 'Git', category: 'Tools & DevOps', badge: 'Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
  { id: 'docker', name: 'Docker', category: 'Tools & DevOps', badge: 'Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white' },
  { id: 'aws', name: 'AWS', category: 'Tools & DevOps', badge: 'AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white' },
  { id: 'firebase', name: 'Firebase', category: 'Tools & DevOps', badge: 'Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black' },
  { id: 'figma', name: 'Figma', category: 'Tools & DevOps', badge: 'Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white' },
];

export const DEFAULT_WIDGET_DATA = {
  [WIDGET_TYPES.PROFILE_CARD]: {
    name: 'Kodcu Geliştirici',
    title: 'Senior Full Stack Developer',
    bio: 'Modern web teknolojileriyle göz alıcı ve yüksek performanslı uygulamalar geliştiriyorum. Tasarıma ve detaylara önem veririm.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    location: 'İstanbul, Türkiye',
    company: 'SaaS Labs Inc.',
    pronouns: 'He/Him',
    align: 'center', // center, left, right
    cvFileName: '',
    cvUrl: '',
    linkedinUrl: '',
    githubUrl: '',
  },
  [WIDGET_TYPES.SOCIAL_BADGES]: {
    style: 'flat', // flat, plastic, for-the-badge, social
    align: 'center', // center, left, right
    platforms: [
      { id: 'github', username: 'github-kullanici' },
      { id: 'linkedin', username: 'linkedin-kullanici' },
      { id: 'twitter', username: 'twitter-kullanici' },
    ],
  },
  [WIDGET_TYPES.TECH_STACK]: {
    title: 'Teknoloji Yığınım',
    align: 'left', // left, center, right
    style: 'flat-square', // flat, flat-square, for-the-badge
    selectedTech: ['html5', 'css3', 'javascript', 'typescript', 'react', 'nodejs', 'git'],
  },
  [WIDGET_TYPES.GITHUB_STATS]: {
    username: 'github-kullanici',
    theme: 'dark', // dark, radical, synthwave, ocean, green
    showPrivateCommits: true,
    hideTitle: false,
    hideRank: false,
    align: 'center', // center, left, right
    showLanguages: true,
    showStreak: false,
  },
};
