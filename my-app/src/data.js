import React from 'react';
import { 
  Zap, 
  Palette, 
  Camera, 
  Rocket, 
  Smile, 
  Star, 
  Globe, 
  Database, 
  Terminal, 
  Server, 
  Check, 
  Bug, 
  Cpu,
  Share2,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Briefcase
} from 'lucide-react';

const ChatGptIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 16.64C15.5 17.78 13.88 18.5 12 18.5C10.12 18.5 8.5 17.78 7.36 16.64C6.22 15.5 5.5 13.88 5.5 12C5.5 10.12 6.22 8.5 7.36 7.36C8.5 6.22 10.12 5.5 12 5.5C13.88 5.5 15.5 6.22 16.64 7.36C17.78 8.5 18.5 10.12 18.5 12C18.5 13.88 17.78 15.5 16.64 16.64Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z" fill="currentColor"/>
    <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" fill="currentColor"/>
  </svg>
);

const GeminiIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L12 8L16 12M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GrokIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2 2h20v20H2V2zm4 4v12h12V6H6zm2 2h8v8H8V8z" />
  </svg>
);

export const PROMPTS_DATA = [
  {
    id: 1,
    title: "Midjourney V6: Cyberpunk City",
    category: "Image Generation",
    content: "https://images.unsplash.com/photo-1605218427306-0333d9584266?auto=format&fit=crop&q=80&w=600",
    contentType: "image",
    description: "A hyper-realistic cinematic action scene of me (using my uploaded photo as face reference), transformed into a powerful Indian warrior, riding a massive charging white bull through a dusty ancient temple city, intense fierce expression, long flowing hair, muscular body, wearing traditional Indian warrior clothing, leather arm guards and dhoti, RIGHT HAND clearly gripping a large glowing trishul (Lord Shiva style trident), the trishul held upright and visible in front of the body, attached saffron flag waving from the trident, hand firmly wrapped around the trishul handle, weapon centered in the frame, dramatic dust and debris flying in the air, cinematic golden sunlight from behind, volumetric lighting, epic shadows, motion blur from the bull running, shallow depth of field, ultra-detailed skin texture, realistic sweat and dirt, 8K resolution, IMAX movie poster style, mythological heroic atmosphere, extremely realistic, no blur on face or weapon",
    buttonText: "Copy Prompt"
  },
  {
    id: 2,
    title: "ChatGPT: Cold Email Template",
    category: "Copywriting",
    content: "Dear [Name],\n\nI am reaching out regarding this application complene and customcect in your semwms. We and massestaved adviss to oral regards, for envavvement.\n\nIf you have any demasecons opportunity and unarttass your email.\n\nSincerely,\nBest",
    contentType: "text",
    description: "ChatGPT: Cold email template to pend put co-no-end with scromnt is our email template text to your entiflads.",
    buttonText: "Copy Text"
  },
  {
    id: 3,
    title: "DALL-E 3: Logo Concept",
    category: "Design",
    content: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=600",
    contentType: "image",
    description: "DALL-E 3: Logo concept, iki logo variations, sollution, logo, etaration, DALL-E 3.",
    buttonText: "Copy Prompt"
  },
  {
    id: 4,
    title: "Midjourney V6: Space Station",
    category: "Image Generation",
    content: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600",
    contentType: "image",
    description: "A futuristic space station orbiting a gas giant, cinematic lighting, 8k resolution.",
    buttonText: "Copy Prompt"
  },
  {
    id: 5,
    title: "React Component Generator",
    category: "Code",
    content: "Create a reusable React functional component for a [Component Name] that handles [Props/Functionality]. Include Tailwind CSS classes for styling, proper state management using hooks, and TypeScript interfaces for props.",
    contentType: "text",
    description: "Generate clean, modern React components with Tailwind styling and TypeScript.",
    buttonText: "Copy Code"
  },
  {
    id: 6,
    title: "Viral LinkedIn Post",
    category: "Social Media",
    content: "Write a LinkedIn post about [Topic] that challenges common wisdom. Structure it with a strong hook, 3 key insights, and a concluding question to drive engagement. Tone should be professional yet provocative.",
    contentType: "text",
    description: "Create engaging thought leadership content for LinkedIn.",
    buttonText: "Copy Prompt"
  },
  {
    id: 7,
    title: "Python Data Analysis",
    category: "Code",
    content: "Write a Python script using Pandas to load a CSV file, clean missing values, calculate the correlation matrix, and visualize the findings using Matplotlib/Seaborn.",
    contentType: "text",
    description: "Automate data analysis tasks with Python.",
    buttonText: "Copy Code"
  },
  {
    id: 8,
    title: "YouTube Video Title",
    category: "Social Media",
    content: "Generate 10 click-worthy YouTube video titles for a video about [Topic]. Use high-CTR patterns like lists, negatives ('Don't do this'), and curiosity gaps.",
    contentType: "text",
    description: "Optimize YouTube video titles for maximum clicks.",
    buttonText: "Copy Prompt"
  }
];

export const IMAGE_DATA = [
  {
    id: 1,
    title: "Neon Cyberpunk City",
    tool: "Midjourney V6",
    category: "Cyberpunk",
    prompt: "A futuristic city with neon lights, rain-slicked streets, towering skyscrapers, cyberpunk aesthetic, cinematic lighting, 8k resolution --ar 16:9",
    url: "https://images.unsplash.com/photo-1605218427306-0333d9584266?auto=format&fit=crop&q=80&w=600",
    icon: Zap,
    badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
  },
  {
    id: 2,
    title: "Abstract Fluid Art",
    tool: "DALL-E 3",
    category: "Abstract",
    prompt: "Swirling colors of liquid gold and deep blue, abstract fluid art, high contrast, macro photography style, intricate details.",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
    icon: Palette,
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
  },
  {
    id: 3,
    title: "Portrait of an Astronaut",
    tool: "Stable Diffusion XL",
    category: "Space",
    prompt: "Close-up portrait of an astronaut in a white space suit, reflection of earth in the visor, realistic skin texture, dramatic lighting.",
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600",
    icon: Camera,
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
  },
  {
    id: 4,
    title: "Surreal Digital Landscape",
    tool: "ChatGPT DALL-E 3",
    category: "Abstract",
    prompt: "A surreal digital landscape with floating islands, waterfalls cascading into the void, vibrant colors, dreamlike atmosphere.",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    icon: ChatGptIcon,
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
  },
  {
    id: 5,
    title: "Cybernetic Portrait",
    tool: "Gemini Ultra",
    category: "Cyberpunk",
    prompt: "Portrait of a cyborg with transparent skin revealing glowing circuitry, soft lighting, high detail, 8k resolution.",
    url: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=600",
    icon: GeminiIcon,
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
  },
  {
    id: 6,
    title: "Minimalist Architecture",
    tool: "Grok Vision",
    category: "Architecture",
    prompt: "Minimalist concrete architecture in a desert, harsh shadows, clear blue sky, geometric shapes.",
    url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=600",
    icon: GrokIcon,
    badgeColor: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
  },
  {
    id: 7,
    title: "Nebula Odyssey",
    tool: "Midjourney V6",
    category: "Space",
    prompt: "A majestic nebula in deep space, vibrant purples and golds, swirling cosmic dust, distant stars, cinematic 8k resolution.",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
  },
  {
    id: 8,
    title: "Martian Colony",
    tool: "DALL-E 3",
    category: "Space",
    prompt: "Futuristic colony on Mars, domed cities, red dust storms outside, high tech rovers, realistic sci-fi art.",
    url: "https://images.unsplash.com/photo-1614728853913-1e32005e319a?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
  },
  {
    id: 9,
    title: "Spider-Verse Style Hero",
    tool: "Midjourney Niji 6",
    category: "Cartoon",
    prompt: "Superhero swinging through NYC, Spider-Verse art style, chromatic aberration, halftone patterns, dynamic action pose, vibrant colors.",
    url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=600",
    icon: Smile,
    badgeColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
  },
  {
    id: 10,
    title: "3D Pixar Style Character",
    tool: "Bing Image Creator",
    category: "Cartoon",
    prompt: "Cute 3D animated character, Pixar style, big expressive eyes, soft lighting, detailed texture, render 8k.",
    url: "https://images.unsplash.com/photo-1566576912902-1d6ebc123eec?auto=format&fit=crop&q=80&w=600",
    icon: Smile,
    badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
  },
  {
    id: 11,
    title: "Epic Warrior (Baahubali Style)",
    tool: "Midjourney V6",
    category: "Tollywood",
    prompt: "Ancient warrior king standing on a cliff, golden armor, holding a spear, epic battlefield background, Baahubali aesthetic, cinematic lighting, hyper-realistic.",
    url: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=600",
    icon: Star,
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
  },
  {
    id: 12,
    title: "Rugged Action Hero (Pushpa Style)",
    tool: "Stable Diffusion XL",
    category: "Tollywood",
    prompt: "Rugged man in a red sandalwood forest, intense gaze, beard, rustic clothing, dramatic lighting, 4k resolution, cinematic raw style.",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    icon: Star,
    badgeColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
  },
  {
    id: 13,
    title: "Freedom Fighter Duo (RRR Style)",
    tool: "Midjourney V6",
    category: "Tollywood",
    prompt: "Two legendary freedom fighters jumping from a truck, fire and water elements surrounding them, high energy, epic action shot, RRR movie style.",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600",
    icon: Star,
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
  },
  // Space Category Expansion
  {
    id: 14,
    title: "Black Hole Event Horizon",
    tool: "Midjourney V6",
    category: "Space",
    prompt: "A massive black hole accreting matter, glowing accretion disk, gravitational lensing distortion, deep space background, cinematic scientific visualization, 8k resolution.",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
  },
  {
    id: 15,
    title: "Cyberpunk Astronaut in Tokyo",
    tool: "Stable Diffusion XL",
    category: "Space",
    prompt: "Astronaut in a neon-lit suit walking through a rainy futuristic Tokyo street, reflections in the helmet visor, cyberpunk aesthetic, night time, cinematic lighting.",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
  },
  {
    id: 16,
    title: "Galactic Senate Chamber",
    tool: "DALL-E 3",
    category: "Space",
    prompt: "Interior of a massive galactic senate, thousands of floating pods, alien delegates, vast scale, futuristic architecture, soft ambient lighting, Star Wars aesthetic.",
    url: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
  },
  {
    id: 17,
    title: "Terraformed Mars Landscape",
    tool: "Midjourney V6",
    category: "Space",
    prompt: "Mars landscape partially terraformed, patches of green vegetation and blue water lakes amidst red rocks, clear blue sky, futuristic domes in the distance, realistic sci-fi.",
    url: "https://images.unsplash.com/photo-1614728853913-1e32005e319a?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
  },
  {
    id: 18,
    title: "Nebula Cloud Close-up",
    tool: "Hubble Legacy Style",
    category: "Space",
    prompt: "Extreme close-up of a colorful nebula pillar, pillars of creation style, dust gas clouds, vibrant oranges and blues, incredibly detailed stars, astrophotography style.",
    url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=600",
    icon: Rocket,
    badgeColor: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
  },
  // Cartoon / Anime Category Expansion
  {
    id: 19,
    title: "Ghibli Style Village",
    tool: "Niji Journey 6",
    category: "Cartoon",
    prompt: "A peaceful seaside village, Studio Ghibli art style, watercolor textures, fluffy clouds, vibrant green grass, cozy atmosphere, detailed background.",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
    icon: Smile,
    badgeColor: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
  },
  {
    id: 20,
    title: "Cyberpunk Anime Girl",
    tool: "Stable Diffusion Anime",
    category: "Cartoon",
    prompt: "Anime girl with cybernetic implants, glowing blue eyes, futuristic city background, raining, neon lighting, high quality 2d anime art style.",
    url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=600",
    icon: Smile,
    badgeColor: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300"
  },
  {
    id: 21,
    title: "Retro 90s Anime Coffee Shop",
    tool: "Midjourney Niji 6",
    category: "Cartoon",
    prompt: "Lo-fi aesthetic coffee shop, 90s anime style, cozy vibes, steaming coffee, rain on window, soft pastel colors, vintage filter.",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    icon: Smile,
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
  },
  {
    id: 22,
    title: "Pixar Style Robot Helper",
    tool: "DALL-E 3",
    category: "Cartoon",
    prompt: "Cute small round robot helper, Pixar 3D animation style, glossy white finish, big blue expressive digital eyes, futuristic clean lab background.",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    icon: Smile,
    badgeColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
  },
  // Tollywood / Cinematic Heroes
  {
    id: 23,
    title: "Mass Cop Entrance (Singam Style)",
    tool: "Midjourney V6",
    category: "Tollywood",
    prompt: "Powerful Indian police officer stepping out of a jeep, sunglasses, slow motion walk, dust rising, low angle shot, intense expression, South Indian mass movie style.",
    url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&q=80&w=600",
    icon: Star,
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
  }, 
  {
    id: 24,
    title: "Mythological Archer (Arjuna)",
    tool: "Stable Diffusion XL",
    category: "Tollywood",
    prompt: "Epic Indian mythological archer aiming a glowing divine arrow, ancient battlefield, lightning in sky, golden armor, cinematic fantasy art, Mahabharata style.",
    url: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=600",
    icon: Star,
    badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
  },
  // Photography & Others
  {
    id: 25,
    title: "Double Exposure Wolf",
    tool: "Midjourney V6",
    category: "Photography",
    prompt: "Double exposure photography, silhouette of a howling wolf combined with a snowy pine forest, monochrome with subtle blue tint, minimalist, sharp details.",
    url: "https://images.unsplash.com/photo-1549463844-913caf532655?auto=format&fit=crop&q=80&w=600",
    icon: Camera,
    badgeColor: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
  },
  {
    id: 26,
    title: "Macro Eye Close-up",
    tool: "Sony A7R IV Style",
    category: "Photography",
    prompt: "Extreme macro photography of a human eye, iris details visible, reflection of a city in the pupil, golden hour lighting, hyper-realistic, 8k.",
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=600",
    icon: Camera,
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
  },
  {
    id: 27,
    title: "Vaporwave Statue",
    tool: "DALL-E 3",
    category: "Abstract",
    prompt: "Classical Greek statue bust with glitch art effects, neon pink and blue lighting, vaporwave aesthetic, checkered floor background, retro 80s computer graphics style.",
    url: "https://images.unsplash.com/photo-1544472147-386052f6d0f6?auto=format&fit=crop&q=80&w=600",
    icon: Palette,
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
  }
];

export const EMAIL_TEMPLATES = [
  {
    id: 'e1',
    title: "Cold Outreach: Service Introduction",
    category: "Cold Outreach",
    content: "Subject: Idea for [Company Name]\n\nHi [Name],\n\nI've been following [Company Name] and love your work with [Specific Project/Achievement].\n\nI noticed an opportunity to improve [Specific Area] which could help you [Benefit/Result]. We've helped companies like [Competitor/Similar Company] achieve [Stat/Result].\n\nOpen to a 5-min chat next week?",
    description: "A concise, value-focused cold email to introduce your services to a prospect."
  },
  {
    id: 'e2',
    title: "Follow Up: Post-Meeting",
    category: "Follow Up",
    content: "Subject: Great chatting today!\n\nHi [Name],\n\nThanks for your time today. I really enjoyed learning about [Topic discussed].\n\nAs promised, here's the [Resource/Link] we discussed.\n\nI'll follow up on [Date] regarding next steps. Let me know if you have any questions in the meantime.",
    description: "Professional follow-up email to send immediately after a meeting to recap and set next steps."
  },
  {
    id: 'e3',
    title: "Networking: Coffee Chat Request",
    category: "Networking",
    content: "Subject: Coffee? ☕\n\nHi [Name],\n\nI'm a big fan of your work at [Company], especially [Specific Project].\n\nI'm currently exploring [Industry/Topic] and would love to pick your brain for 15 mins if you're open to it. My treat if you're in [City]!\n\nNo pressure either way.",
    description: "Casual and low-pressure request for a networking meeting or informational interview."
  },
  {
    id: 'e4',
    title: "Sales: Inbound Lead Response",
    category: "Sales",
    content: "Subject: Re: Your inquiry about [Product]\n\nHi [Name],\n\nThanks for reaching out! I'd be happy to answer your questions about [Product].\n\nTo make sure I give you the most relevant info, could you tell me a bit more about what you're looking to achieve with [Product]?\n\nBest,\n[Your Name]",
    description: "Effective template for responding to inbound leads to qualify them and start a conversation."
  },
  {
    id: 'e5',
    title: "Job Application: Cover Letter",
    category: "Job Search",
    content: "Subject: Application for [Role] - [Your Name]\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the [Role] position at [Company]. With [Number] years of experience in [Field] and a track record of [Key Achievement], I am confident in my ability to contribute to your team.\n\nI particularly admire [Company's Value/Mission] because [Reason].\n\nAttached is my resume. I look forward to the possibility of discussing my fit for this role.\n\nSincerely,\n[Your Name]",
    description: "Standard yet customizable cover letter template for job applications."
  },
  {
    id: 'e6',
    title: "Newsletter: Welcome Email",
    category: "Marketing",
    content: "Subject: Welcome to the family! 👋\n\nHi [Name],\n\nThanks for joining us! We're thrilled to have you on board.\n\nHere's what you can expect from us:\n- [Benefit 1]\n- [Benefit 2]\n- [Benefit 3]\n\nAs a welcome gift, here's a [Freebie/Discount Code].\n\nTalk soon,\n[Your Name/Brand]",
    description: "Warm welcome email for new newsletter subscribers."
  },
  {
    id: 'e7',
    title: "Cold Outreach: Partnership Proposal",
    category: "Cold Outreach",
    content: "Subject: Partnership opportunity: [Company A] + [Company B]\n\nHi [Name],\n\nI help run [Company A], and I think there's a great synergy between our audiences.\n\nWe recently [Achievement], and I believe a partnership with [Company B] could be mutually beneficial by [Reason].\n\nWould you be open to a quick call to discuss potential collaboration ideas?",
    description: "Template for proposing a strategic partnership with another company."
  },
  {
    id: 'e8',
    title: "Follow Up: No Response",
    category: "Follow Up",
    content: "Subject: Bump on this?\n\nHi [Name],\n\nJust floating this to the top of your inbox in case it got buried.\n\nStill interested in [Value Proposition]?\n\nLet me know if this isn't a priority right now - happy to pause follow-ups.",
    description: "Gentle nudge for when a prospect hasn't replied to your previous email."
  },
  // Expanded Templates
  {
    id: 'e9',
    title: "Networking: Mentorship Request",
    category: "Networking",
    content: "Subject: Seeking mentorship from a [Role] leader\n\nHi [Name],\n\nI've been following your career, especially your work on [Project/Topic].\n\nI'm currently a [Your Role] looking to grow in [Specific Area]. I know your time is valuable, but I'd be incredibly grateful for 20 mins of your advice on how you navigated [Specific Challenge].\n\nHappy to work around your schedule.",
    description: "Polite and respectful template for asking someone to be your mentor."
  },
  {
    id: 'e10',
    title: "Sales: Upsell Opportunity",
    category: "Sales",
    content: "Subject: Getting more out of [Product]\n\nHi [Name],\n\nI noticed you've been having great success with [Product] feature. \n\nMany of our similar clients also use [Premium Feature] to achieve [Benefit].\n\nWould you be open to a quick demo to see how this could further improve your [Metric]?\n\nBest,\n[Your Name]",
    description: "Template to suggest an upgrade or additional feature to an existing happy customer."
  },
  {
    id: 'e11',
    title: "Job Search: Resignation Letter",
    category: "Job Search",
    content: "Subject: Resignation - [Your Name]\n\nDear [Manager's Name],\n\nPlease accept this letter as formal notification that I am resigning from my position as [Your Role]. My last day will be [Date].\n\nI want to thank you for the opportunity to work at [Company]. I've learned so much and am grateful for your support.\n\nI'll do everything I can to ensure a smooth handover during my notice period.",
    description: "Professional and positive formal resignation letter."
  },
  {
    id: 'e12',
    title: "Marketing: Testimonial Request",
    category: "Marketing",
    content: "Subject: Quick question about your experience\n\nHi [Name],\n\nWe're so glad to see you hitting [Milestone] with [Product]!\n\nWould you be open to sharing a 1-2 sentence quote about your experience? We'd love to feature you on our website.\n\nHere's a draft to get you started: \"[Draft Testimonial]\"\n\nThanks for being an awesome customer!",
    description: "Requesting a testimonial from a satisfied customer with a low-friction approach."
  },
  {
    id: 'e13',
    title: "Cold Outreach: Podcast Guest",
    category: "Cold Outreach",
    content: "Subject: Loved the episode with [Guest Name]!\n\nHi [Host Name],\n\nBig fan of [Podcast Name]. The recent episode with [Guest Name] regarding [Topic] was fantastic.\n\nI'd love to explore coming on as a guest to discuss [Your Topic]. I have a unique perspective on [Angle] that I think your audience would love.\n\nHere are a few talking points: \n- [Point 1]\n- [Point 2]\n\nLet me know what you think!",
    description: "Pitching yourself as a guest for a relevant podcast."
  },
  {
    id: 'e14',
    title: "Follow Up: Proposal Review",
    category: "Follow Up",
    content: "Subject: Any questions on the proposal?\n\nHi [Name],\n\nI wanted to check if you had a chance to review the proposal I sent over on [Date].\n\nWe're really excited about the potential to help [Company] achieve [Goal].\n\nDo you have any questions or blocking points I can clarify?",
    description: "Checking in after sending a proposal or contract."
  },
  {
    id: 'e15',
    title: "Job Search: Reference Request",
    category: "Job Search",
    content: "Subject: Request for Reference - [Your Name]\n\nHi [Former Manager/Colleague],\n\nI hope you're doing well!\n\nI'm currently in the final stages of interviewing for a [Role] at [Company].\n\nwould you be comfortable providing a positive reference for me? I really valued our time working together on [Project].\n\nLet me know if you need any info from me.",
    description: "Asking a former colleague or manager to be a professional reference."
  },
  {
    id: 'e16',
    title: "Marketing: Product Launch",
    category: "Marketing",
    content: "Subject: It's finally here! Introducing [Product] 🚀\n\nHi [Name],\n\nThe wait is over. We just launched [Product], the easiest way to [Main Benefit].\n\nKey features:\n- [Feature 1]\n- [Feature 2]\n\nGet it now with 20% off using code LAUNCH20: [Link]\n\nCheers,\n[Brand Name]",
    description: "Exciting announcement email for a new product launch."
  },
  {
    id: 'e17',
    title: "Networking: Congratulate on New Role",
    category: "Networking",
    content: "Subject: Congrats on the new role! 🎉\n\nHi [Name],\n\nI saw the news that you joined [Company] as [Role] - huge congratulations! That's a massive move.\n\nI know [Company] is doing great things in [Industry].\n\nWishing you the best of luck getting started. Let's catch up once you're settled in!",
    description: "Warm message to stay touch when a contact gets a new job."
  },
  {
    id: 'e18',
    title: "Sales: Contract Expiry",
    category: "Sales",
    content: "Subject: [Company] contract renewal\n\nHi [Name],\n\nI noticed your subscription for [Product] is coming up for renewal on [Date].\n\nI wanted to reach out to ensure you're all set to continue, or if you'd like to discuss upgrading to our [Higher Plan] which now includes [New Feature].\n\nLet me know how you'd like to proceed.",
    description: "Proactive sales reach-out before a contract or subscription ends."
  }
];

export const CODE_PROMPTS = [
  {
    id: 'c1',
    title: "React Component Generation",
    category: "Frontend",
    icon: Globe,
    content: "Create a reusable React functional component for a [Component Name] that handles [Props/Functionality]. Include Tailwind CSS classes for styling, proper state management using hooks, and TypeScript interfaces for props.",
    description: "Generate clean, modern React components with Tailwind styling and TypeScript."
  },
  {
    id: 'c2',
    title: "SQL Query Optimization",
    category: "Backend",
    icon: Database,
    content: "I have a SQL query that moves slowly on a large dataset: [Insert Query]. Analyze its execution plan conceptually and suggest indices or query rewriting techniques to optimize performance for Postgres/MySQL.",
    description: "Debug and optimize slow database queries."
  },
  {
    id: 'c3',
    title: "Regex Generator",
    category: "Data",
    icon: Terminal,
    content: "Write a Regular Expression (Regex) to match [Pattern Description, e.g., email addresses, phone numbers]. Explain how each part of the regex works and provide a few test cases.",
    description: "Create complex regex patterns with explanations."
  },
  {
    id: 'c4',
    title: "Docker File Creation",
    category: "DevOps",
    icon: Server,
    content: "Create a production-ready multi-stage Dockerfile for a [Node.js/Python/Go] application. Ensure the image size is minimized using Alpine/Slim variants and follow security best practices (non-root user).",
    description: "Generate optimized Dockerfiles for containerization."
  },
  {
    id: 'c5',
    title: "Unit Test Writer",
    category: "Testing",
    icon: Check,
    content: "Write Jest/PyTest unit tests for the following function: [Paste Function]. Cover edge cases, error handling, and happy paths. Mock any external dependencies.",
    description: "Generate comprehensive unit tests for your code."
  },
  {
    id: 'c6',
    title: "Explain Error Message",
    category: "Debugging",
    icon: Bug,
    content: "I am getting the following error in [Language/Framework]: [Paste Error Log]. Explain what this error means, why it occurs, and provide step-by-step solutions to fix it.",
    description: "Understand and fix cryptic error messages."
  },
  {
    id: 'c7',
    title: "API Endpoint Design",
    category: "Backend",
    icon: Server,
    content: "Design a RESTful API endpoint for [Action, e.g., creating a user]. Specify the HTTP method, URL structure, request body JSON schema, and expected response codes (200, 400, 500).",
    description: "Plan robust and standard-compliant API endpoints."
  },
  {
    id: 'c8',
    title: "CSS Animation",
    category: "Frontend",
    icon: Globe,
    content: "Write CSS keyframes to create a [Animation Description, e.g., bouncing loading dot] animation. Ensure it loops infinitely and is smooth. Provide usage example in HTML.",
    description: "Create smooth and modern CSS animations."
  },
  {
    id: 'c9',
    title: "GitHub Actions CI/CD",
    category: "DevOps",
    icon: Cpu,
    content: "Write a GitHub Actions workflow file that runs on every push to 'main'. It should checkout code, install dependencies, run linting, run tests, and build the project.",
    description: "Automate your development workflow with CI/CD pipelines."
  }
];

export const SOCIAL_PROMPTS = [
  {
    id: 's1',
    title: "LinkedIn: Thought Leadership",
    category: "LinkedIn",
    icon: Linkedin,
    content: "Write a LinkedIn post about [Topic] that challenges common wisdom. Structure it with a strong hook, 3 key insights, and a concluding question to drive engagement. Tone should be professional yet provocative.",
    description: "Create engaging thought leadership content for LinkedIn."
  },
  {
    id: 's2',
    title: "Twitter/X: Viral Thread Hook",
    category: "Twitter",
    icon: Twitter,
    content: "Write 5 variations of a viral thread hook about [Topic]. Use formats like 'How I...', 'Stop doing...', or 'The secret to...'. Keep it under 280 characters and spark curiosity.",
    description: "Generate scroll-stopping hooks for Twitter threads."
  },
  {
    id: 's3',
    title: "Instagram: Reel Script",
    category: "Instagram",
    icon: Instagram,
    content: "Create a 30-second Instagram Reel script about [Topic]. Include visual cues, text overlays for each scene, and a trending audio recommendation. End with a strong Call to Action.",
    description: "Plan viral short-form video content."
  },
  {
    id: 's4',
    title: "YouTube: Video Title Generator",
    category: "YouTube",
    icon: Youtube,
    content: "Generate 10 click-worthy YouTube video titles for a video about [Topic]. Use high-CTR patterns like lists, negatives ('Don't do this'), and curiosity gaps. target audience is [Audience].",
    description: "Optimize YouTube video titles for maximum clicks."
  },
  {
    id: 's5',
    title: "LinkedIn: Company Update",
    category: "LinkedIn",
    icon: Linkedin,
    content: "Draft a company update post announcing [Milestone/Launch]. Focus on the team effort, the problem solved for customers, and the future vision. Tag key team members and use relevant hashtags.",
    description: "Professional company announcements."
  },
  {
    id: 's6',
    title: "Twitter: Shitpost/Meme Idea",
    category: "Twitter",
    icon: Twitter,
    content: "Give me 5 funny, relatable tweet ideas about the struggles of [Job Role/Industry]. Use self-deprecating humor and short punchlines.",
    description: "Lighthearted content to build community relation."
  },
  {
    id: 's7',
    title: "YouTube: Script Outline",
    category: "YouTube",
    icon: Youtube,
    content: "Outline a 10-minute YouTube tutorial on [Topic]. Structure: Hook (0:00-1:00), Intro (1:00-2:00), Step-by-Step Guide (3 key points), and Outro. Include placement for B-roll.",
    description: "Structured outlines for long-form video content."
  },
  {
    id: 's8',
    title: "Instagram: Carousel Text",
    category: "Instagram",
    icon: Instagram,
    content: "Write text for a 5-slide Instagram carousel teaching [Skill]. Slide 1: Hook, Slide 2-4: Educational Value, Slide 5: Save this post. Keep text minimal and punchy.",
    description: "Educational carousel content for Instagram."
  }
];


export const JOB_PROMPTS = [
  {
    id: 'j1',
    title: "Resume: Bullet Point Refiner",
    category: "Resume",
    icon: Briefcase,
    content: "Rewrite this resume bullet point to be results-oriented using the XYZ format (Accomplished [X] as measured by [Y], by doing [Z]). Strong action verbs only. \n\nBullet: [Insert Bullet]",
    description: "Transform weak resume bullets into powerful impact statements."
  },
  {
    id: 'j2',
    title: "Cover Letter: Tech Startup",
    category: "Cover Letter",
    icon: Briefcase,
    content: "Write a cover letter for a [Role] position at a fast-paced tech startup. Emphasize ability to wear multiple hats, ownership, and passion for [Product/Industry]. Keep it under 250 words and punchy.",
    description: "Modern, concise cover letter for startup roles."
  },
  {
    id: 'j3',
    title: "Interview: Behavioral Answers (STAR)",
    category: "Interview",
    icon: Briefcase,
    content: "Help me answer the interview question: '[Insert Question]'. Structure the answer using the STAR method (Situation, Task, Action, Result). Highlight skills in [Skill 1] and [Skill 2].",
    description: "Structure perfect behavioral interview responses."
  },
  {
    id: 'j4',
    title: "LinkedIn: About Section",
    category: "LinkedIn",
    icon: Briefcase,
    content: "Write a compelling LinkedIn 'About' section for a [Role] with [Number] years of experience. Focus on my unique value proposition: [Unique Skill/Experience]. Tone: Professional but approachable.",
    description: "Bio writer for your professional LinkedIn profile."
  },
  {
    id: 'j5',
    title: "Negotiation: Salary Counter-Offer",
    category: "Negotiation",
    icon: Briefcase,
    content: "Draft an email counter-offering a salary offer of $[Amount]. I am asking for $[Target Amount] based on [Market Research/Experience]. Maintain excitement about the role but be firm on value.",
    description: "Professional script for salary negotiation."
  },
  {
    id: 'j6',
    title: "Resume: Summary Section",
    category: "Resume",
    icon: Briefcase,
    content: "Write a 3-sentence professional summary for a [Role] resume. Highlight [Key Achievement], [Years of Exp], and [Top Skill]. Optimized for ATS keywords.",
    description: "Concise and powerful resume summary."
  },
  {
    id: 'j7',
    title: "Interview: Questions to Ask",
    category: "Interview",
    icon: Briefcase,
    content: "Generate 5 insightful questions to ask the hiring manager at the end of an interview for a [Role] position. Focus on company culture, growth opportunities, and team challenges.",
    description: "Smart questions to impress your interviewer."
  },
  {
    id: 'j8',
    title: "Cold Message: Hiring Manager",
    category: "Networking",
    icon: Briefcase,
    content: "Write a short LinkedIn connection request note to a Hiring Manager at [Company]. Mention their recent post about [Topic] and express interest in the [Role] opening. < 300 chars.",
    description: "Direct outreach to decision makers."
  }
];

export const searchAll = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();

  const results = [
    ...IMAGE_DATA.map(item => ({ ...item, type: 'image', route: 'images' })),
    ...EMAIL_TEMPLATES.map(item => ({ ...item, type: 'email', route: 'emails' })),
    ...CODE_PROMPTS.map(item => ({ ...item, type: 'code', route: 'code' })),
    ...SOCIAL_PROMPTS.map(item => ({ ...item, type: 'social', route: 'social' })),
    ...JOB_PROMPTS.map(item => ({ ...item, type: 'job', route: 'job' })),
    ...PROMPTS_DATA.map(item => ({ ...item, type: 'all', route: 'all' }))
  ].filter(item => 
    item.title.toLowerCase().includes(lowerQuery) || 
    item.category?.toLowerCase().includes(lowerQuery) ||
    item.description?.toLowerCase().includes(lowerQuery)
  );

  return results.slice(0, 5); // Limit to 5 results
};
