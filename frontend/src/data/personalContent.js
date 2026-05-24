/* ============================================
   Personal Side — Placeholder Content Data
   Replace texts, images, hobbies, and content
   ============================================ */

export const personalHeroData = {
  greeting: 'Welcome to the other side.',
  headline: 'Beyond the Code',
  subtitle: 'Developer by day. Dreamer, creator, explorer — always.',
  typingWords: ['Curious', 'Creative', 'Persistent', 'Driven', 'Restless'],
  cta: 'Explore My World',
};

export const hobbies = [
  {
    id: 1,
    title: 'Photography',
    description: 'Capturing fleeting moments and finding beauty in the mundane. Every frame tells a story.',
    icon: 'Camera',
    accent: 'rgba(0, 255, 153, 0.15)',
  },
  {
    id: 2,
    title: 'Gaming',
    description: 'Immersing in virtual worlds, competitive arenas, and narrative-driven adventures.',
    icon: 'Gamepad2',
    accent: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 3,
    title: 'Music',
    description: 'From lo-fi beats to orchestral scores — music fuels the creative process.',
    icon: 'Music',
    accent: 'rgba(59, 130, 246, 0.15)',
  },
  {
    id: 4,
    title: 'Technology',
    description: 'Building custom PCs, experimenting with new tools, and staying ahead of the curve.',
    icon: 'Cpu',
    accent: 'rgba(14, 165, 233, 0.15)',
  },
  {
    id: 5,
    title: 'Travel',
    description: 'Discovering new places, cultures, and perspectives that shape the way I think.',
    icon: 'Plane',
    accent: 'rgba(234, 179, 8, 0.15)',
  },
  {
    id: 6,
    title: 'Cycling',
    description: 'The freedom of the open road, the rhythm of the pedals, and the thrill of the ride.',
    icon: 'Bike',
    accent: 'rgba(236, 72, 153, 0.15)',
  },
];

export const favoritesData = {
  movie: {
    label: 'Favorite Movie',
    title: 'A Silent Voice',
    youtubeId: 'nfK6UgLra7g',
    quote: `"You don't need to forgive him. But don't you want to know why he apologized?"`,
    quoteAuthor: 'Yuzuru Nishimiya',
    description: `Because human relationships are so complex, certain film lines profoundly resonate with me. This quote emphasizes the value of understanding over immediate forgiveness. By seeking to understand why people do what they do, we foster deeper connections and personal growth. Ultimately, that single idea taught me to spread love to my family, friends, and everyone deserving of it.`,
    readMoreUrl: 'https://myanimelist.net/anime/28851/Koe_no_Katachi',
  },
  music: {
    label: 'Favorite Music',
    title: "I Don't Love You",
    artist: 'My Chemical Romance',
    quote: `"When you go, would you even turn to say, 'I don't love you like I did yesterday?'"`,
    quoteAuthor: 'My Chemical Romance',
    description: `This poignant line captures the bittersweet reality of evolving feelings and the painful inevitability of growth. It taught me to embrace love's complexities and cherish fleeting moments that leave a permanent impact. Most importantly, it reinforces the value of showing affection to those who matter, as every single interaction shapes our journey.`,
    readMoreUrl: 'https://genius.com/My-chemical-romance-i-dont-love-you-lyrics',
    audioSrc: '/i-dont-love-you.mp3',
    albumArt: '/mcr-album-art.jpg',
  },
};

export const galleryItems = [
  { id: 1, title: 'Me, Myself and I', category: 'Life', span: 'tall', imageBase: 'pic1' },
  { id: 2, title: 'Ecosystem', category: 'Interest', span: 'normal', imageBase: 'pic2' },
  { id: 3, title: 'Personal Space', category: 'Interest', span: 'normal', imageBase: 'pic9' },
  { id: 4, title: 'Capstone Defended (LaborConnect)', category: 'Success', span: 'wide', imageBase: 'pic11' },
  { id: 5, title: 'Skyranch, Tagaytay', category: 'Travel', span: 'normal', imageBase: 'pic5' },
  { id: 6, title: 'Cycling', category: 'Hobby', span: 'tall', imageBase: 'pic13' },
  { id: 7, title: 'Somewhere in Tagaytay', category: 'Landscape', span: 'normal', imageBase: 'pic7' },
  { id: 8, title: 'Taal Volcano', category: 'Landscape', span: 'normal', imageBase: 'pic6' },
  { id: 9, title: 'Rides', category: 'Fun', span: 'normal', imageBase: 'pic4' },
];

export const quotes = [
  {
    id: 1,
    text: 'The best way to predict the future is to create it.',
    author: 'Abraham Lincoln',
  },
  {
    id: 2,
    text: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs',
  },
  {
    id: 3,
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    id: 4,
    text: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
  },
  {
    id: 5,
    text: 'A.I. might not replace you, but a person who uses A.I. could.',
    author: 'Paolo Confino',
  },
];

export const personalNavLinks = [
  { label: 'Intro', href: '#personal-hero' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Favorites', href: '#favorites' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Philosophy', href: '#quotes' },
];
