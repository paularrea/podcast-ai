export const topicOptions = [
  {
    label: 'Health & Wellness',
    value: 'related to physical and mental health, nutrition, fitness, lifestyle balance, and general well-being'
  },
  {
    label: 'Personal Development',
    value: 'focused on self-improvement, productivity, motivation, habits, and personal growth'
  },
  {
    label: 'Financial Education',
    value: 'covering money management, saving, investing, budgeting, personal finance, and financial literacy'
  },
  {
    label: 'Psychology',
    value: 'exploring human behavior, emotions, mental processes, relationships, and psychological theories'
  },
  {
    label: 'Technology',
    value: 'about current and emerging technologies such as AI, gadgets, apps, software, digital tools, and innovation trends'
  },
  {
    label: 'Entrepreneurship',
    value: 'about starting and growing businesses, founder journeys, startup culture, and entrepreneurial challenges'
  },
  {
    label: 'Science',
    value: 'covering scientific discoveries, research, nature, physics, biology, space, and the scientific method'
  },
  {
    label: 'Philosophy',
    value: 'on philosophical questions, ethics, logic, existential thought, critical thinking, and life’s deeper meanings'
  },
  {
    label: 'Marketing & Business',
    value: 'focused on branding, business strategy, sales, market trends, and digital marketing practices'
  },
  {
    label: 'History',
    value: 'exploring historical events, notable figures, civilizations, wars, revolutions, and cultural evolution'
  },
  {
    label: 'News',
    value: 'current events, global affairs, daily headlines, and summaries of political, social, and economic developments'
  },
  {
    label: 'Politics',
    value: 'on political systems, ideologies, elections, government policy, debates, and international relations'
  },
  {
    label: 'True Crime',
    value: 'real-life criminal cases, investigations, forensic analysis, and criminal justice narratives'
  },
  {
    label: 'Sports',
    value: 'sports news, athlete stories, game analysis, team rivalries, and competitive events across various disciplines'
  },
  {
    label: 'Movies & Series',
    value: 'film and television reviews, behind-the-scenes insights, story analysis, and pop culture entertainment content'
  }
];


export const durationOptions = ['1 min', '5 mins', '15 mins', '30 mins', '60 mins'];

export const narrativeStylesRaw = [
  {
    label: 'Documentary',
    value: 'informative documentary style with factual narration and structured explanation'
  },
  {
    label: 'Chat',
    value: 'friendly and casual conversation'
  },
  {
    label: 'Inspiring',
    value: 'motivational and emotional storytelling focused on personal growth or overcoming challenges'
  },
  {
    label: 'Satirical',
    value: 'critical humor or satire with witty commentary and playful tone'
  },
  {
    label: 'Lesson',
    value: 'clear and educational tone structured like a lesson or tutorial'
  },
  {
    label: 'Deep Dive',
    value: 'reflective and analytical style with thoughtful insights and in-depth discussion'
  },
  {
    label: 'Tips',
    value: 'practical advice and step-by-step guidance focused on real-life usefulness'
  },
  {
    label: 'Crime Story',
    value: 'narrative storytelling of real or fictional true crime cases with suspenseful tone'
  }
]

export const narrativeStyles = narrativeStylesRaw.map((style) => style.label);

export const depthOptions = [
  { label: 'Basic (Intro)', value: 'basic' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export const narrativeMappings = {
  "Informative Documentary": {
    elevenLabsVoices: [
      { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
      { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
      { id: "yoZ06aMxZJJ28mfd3POQ", name: "Matthew" },
    ],
    pollyVoices: [
      { id: "Joanna", languageCode: "en-US" },
      { id: "Matthew", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/corporate-ambient-corporate-background-soft-116199/",
      "https://pixabay.com/music/corporate-corporate-background-music-116199/",
    ],
  },
  "Casual Conversation": {
    elevenLabsVoices: [
      { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
      { id: "TxGEqnHWrfWFTfGW9XjX", name: "Joe" },
    ],
    pollyVoices: [
      { id: "Ivy", languageCode: "en-US" },
      { id: "Justin", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/corporate-podcast-interview-background-music-116199/",
      "https://pixabay.com/music/lofi-faded-memories-116199/",
    ],
  },
  "Inspirational Story": {
    elevenLabsVoices: [
      { id: "yoZ06aMxZJJ28mfd3POQ", name: "Matthew" },
      { id: "ErXwobaYiN019PkySvjV", name: "Clyde" },
    ],
    pollyVoices: [
      { id: "Matthew", languageCode: "en-US" },
      { id: "Joanna", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/corporate-motivation-116199/",
      "https://pixabay.com/music/cinematic-unbreakable-116199/",
    ],
  },
  "Satirical Humor": {
    elevenLabsVoices: [
      { id: "MF3mGyEYCl7XYWbV9V6O", name: "Arnold" },
      { id: "TxGEqnHWrfWFTfGW9XjX", name: "Joe" },
    ],
    pollyVoices: [
      { id: "Brian", languageCode: "en-GB" },
      { id: "Justin", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100474",
      "https://transistor.fm/free-podcast-intro-music/",
    ],
  },
  "Educational Lesson": {
    elevenLabsVoices: [
      { id: "ErXwobaYiN019PkySvjV", name: "Clyde" },
      { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
    ],
    pollyVoices: [
      { id: "Joanna", languageCode: "en-US" },
      { id: "Matthew", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/corporate-background-music-soft-calm-116199/",
      "https://transistor.fm/free-podcast-intro-music/",
    ],
  },
  "Reflective Analysis": {
    elevenLabsVoices: [
      { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
      { id: "yoZ06aMxZJJ28mfd3POQ", name: "Matthew" },
    ],
    pollyVoices: [
      { id: "Joanna", languageCode: "en-US" },
      { id: "Matthew", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/cinematic-emotional-depth-116199/",
      "https://www.bensound.com/royalty-free-music/track/piano-moment",
    ],
  },
  "Practical Tips": {
    elevenLabsVoices: [
      { id: "ErXwobaYiN019PkySvjV", name: "Clyde" },
      { id: "MF3mGyEYCl7XYWbV9V6O", name: "Arnold" },
    ],
    pollyVoices: [
      { id: "Matthew", languageCode: "en-US" },
      { id: "Justin", languageCode: "en-US" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/corporate-upbeat-modern-motivational-corporate-background-116199/",
      "https://pixabay.com/music/corporate-next-level-116199/",
    ],
  },
  "True Crime Narrative": {
    elevenLabsVoices: [
      { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
      { id: "TxGEqnHWrfWFTfGW9XjX", name: "Joe" },
    ],
    pollyVoices: [
      { id: "Joanna", languageCode: "en-US" },
      { id: "Brian", languageCode: "en-GB" },
    ],
    backgroundMusic: [
      "https://pixabay.com/music/cinematic-dark-mystery-trailer-116199/",
      "https://pixabay.com/music/cinematic-risk-116199/",
    ],
  },
};

export type NarrativeMappingsType = typeof narrativeMappings;
