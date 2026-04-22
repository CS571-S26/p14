// Image convention: drop your photos into public/images/<folder-name>/
// and name them 1.jpg, 2.jpg, 3.jpg, 4.jpg (add more as needed).
// process.env.PUBLIC_URL resolves to "" in dev and "/p14" on GitHub Pages automatically.
const img = (folder, n) => `${process.env.PUBLIC_URL}/images/${folder}/${n}.jpg`;

const locations = [
  {
    id: 1,
    name: "The Great Wall",
    chineseName: "长城",
    tagline: "A Monument to Human Perseverance",
    introduction:
      "Stretching over 13,000 miles across mountains, deserts, and plains, the Great Wall of China is one of the world's most extraordinary architectural achievements. Originally constructed to defend against nomadic invasions, this ancient structure was built and rebuilt over centuries by millions of workers. Walking along its weathered battlements, visitors are rewarded with dramatic vistas of rolling hills and valleys stretching to the horizon. The Mutianyu and Jinshanling sections offer particularly stunning scenery, especially during autumn when the surrounding foliage blazes with color.",
    location: "Northern China",
    province: "Beijing, Hebei, Shanxi, Inner Mongolia",
    category: "Historical Wonder",
    highlights: [
      "UNESCO World Heritage Site since 1987",
      "Stretches over 13,000 miles total",
      "Construction spanned more than 2,000 years",
      "Best sections: Mutianyu, Badaling, Jinshanling",
    ],
    baseLikes: 2847,
    // → place images in: public/images/great-wall/1.jpg … 4.jpg
    images: [
      img("great-wall", 1),
      img("great-wall", 2),
      img("great-wall", 3),
      img("great-wall", 4),
    ],
  },
  {
    id: 2,
    name: "The Forbidden City",
    chineseName: "故宫",
    tagline: "The Imperial Heart of Ancient China",
    introduction:
      "For nearly 500 years, the Forbidden City served as the home of China's emperors and the ceremonial and political center of Chinese government. This magnificent palace complex in the heart of Beijing contains nearly 1,000 buildings across 180 acres, making it the world's largest collection of preserved ancient wooden structures. The sweeping yellow-tiled roofs, intricate red walls, and the vast ceremonial courtyards speak to the grandeur of imperial China. Today, as the Palace Museum, it houses an unparalleled collection of over 1.8 million Chinese cultural artifacts.",
    location: "Beijing",
    province: "Beijing",
    category: "Imperial Palace",
    highlights: [
      "World's largest ancient palace complex",
      "Nearly 1,000 buildings across 180 acres",
      "UNESCO World Heritage Site",
      "Home to 1.8 million priceless artifacts",
    ],
    baseLikes: 3241,
    // → place images in: public/images/forbidden-city/1.jpg … 4.jpg
    images: [
      img("forbidden-city", 1),
      img("forbidden-city", 2),
      img("forbidden-city", 3),
      img("forbidden-city", 4),
    ],
  },
  {
    id: 3,
    name: "Zhangjiajie",
    chineseName: "张家界",
    tagline: "The Floating Mountains of Avatar",
    introduction:
      "Rising dramatically from the mist-shrouded valleys of Hunan Province, the sandstone pillars of Zhangjiajie National Forest Park inspired the floating Hallelujah Mountains in James Cameron's Avatar. These towering quartzite sandstone columns, some reaching over 1,000 meters, create an otherworldly landscape that feels more like a fantastical painting than reality. The park features the world's longest cable car, the Tianmen Mountain glass-floor walkway, and thousands of opportunities to hike among these geological marvels draped in subtropical foliage.",
    location: "Zhangjiajie, Hunan Province",
    province: "Hunan",
    category: "Natural Wonder",
    highlights: [
      "Inspiration for Avatar's Hallelujah Mountains",
      "World's longest cable car ride",
      "Glass walkway on Tianmen Mountain",
      "Over 3,000 towering sandstone pillars",
    ],
    baseLikes: 4123,
    // → place images in: public/images/zhangjiajie/1.jpg … 4.jpg
    images: [
      img("zhangjiajie", 1),
      img("zhangjiajie", 2),
      img("zhangjiajie", 3),
      img("zhangjiajie", 4),
    ],
  },
  {
    id: 4,
    name: "West Lake",
    chineseName: "西湖",
    tagline: "A Poem Written in Water and Light",
    introduction:
      "West Lake in Hangzhou has inspired Chinese poets, painters, and philosophers for over a thousand years. Its serene waters, dotted with elegant pavilions and arching bridges, embody the classical Chinese ideal of harmony between human creation and natural beauty. The lake's famous Ten Scenes include the ethereal Broken Bridge dusted with winter snow, lotus-covered surfaces in summer, and the three stone pagodas reflected in moonlit water. The tree-lined Su Causeway and Bai Causeway offer perfect promenades through all four seasons.",
    location: "Hangzhou, Zhejiang Province",
    province: "Zhejiang",
    category: "Natural Scenery",
    highlights: [
      "UNESCO World Heritage Site",
      "Subject of 2,000+ classical poems",
      "Famous Ten Scenes of West Lake",
      "Historic Su and Bai Causeways",
    ],
    baseLikes: 1987,
    // → place images in: public/images/west-lake/1.jpg … 4.jpg
    images: [
      img("west-lake", 1),
      img("west-lake", 2),
      img("west-lake", 3),
      img("west-lake", 4),
    ],
  },
  {
    id: 5,
    name: "Li River",
    chineseName: "漓江",
    tagline: "The Landscape That Inspired a Nation",
    introduction:
      "Cruise along the Li River from Guilin to Yangshuo and you'll glide through a landscape so magnificent it appears on China's 20-yuan banknote. Dramatic karst limestone peaks rise like green cathedrals from the winding river, their reflections shimmering in the calm waters below. Traditional cormorant fishermen pole their bamboo rafts at dawn, maintaining a centuries-old tradition. The lush rice paddies, remote villages, and the surreal karst topography make the Li River one of the most photographed landscapes in all of Asia.",
    location: "Guilin, Guangxi Province",
    province: "Guangxi",
    category: "Natural Wonder",
    highlights: [
      "Featured on China's 20-yuan banknote",
      "83 km scenic river cruise route",
      "Traditional cormorant fishing villages",
      "Ancient karst limestone formations",
    ],
    baseLikes: 3567,
    // → place images in: public/images/li-river/1.jpg … 4.jpg
    images: [
      img("li-river", 1),
      img("li-river", 2),
      img("li-river", 3),
      img("li-river", 4),
    ],
  },
  {
    id: 6,
    name: "Yellow Mountain",
    chineseName: "黄山",
    tagline: "Where Clouds and Granite Meet the Sky",
    introduction:
      "Huangshan has captivated the imagination of Chinese artists and travelers for over a millennium. Its iconic granite peaks emerge dramatically from a sea of clouds, while ancient twisted pine trees cling tenaciously to sheer rock faces. The mountain's celebrated Four Wonders — strange pines, grotesque rock formations, sea of clouds, and hot springs — have inspired countless scroll paintings and poems. Sunrise from the summit, when golden light filters through clouds illuminating the stone peaks, is considered one of the most sublime natural spectacles in China.",
    location: "Huangshan, Anhui Province",
    province: "Anhui",
    category: "Natural Wonder",
    highlights: [
      "UNESCO World Heritage Site",
      "Famous Four Wonders of Huangshan",
      "Breathtaking sea of clouds at sunrise",
      "Ancient pine trees over 1,000 years old",
    ],
    baseLikes: 2654,
    // → place images in: public/images/yellow-mountain/1.jpg … 4.jpg
    images: [
      img("yellow-mountain", 1),
      img("yellow-mountain", 2),
      img("yellow-mountain", 3),
      img("yellow-mountain", 4),
    ],
  },
  {
    id: 7,
    name: "Jiuzhaigou Valley",
    chineseName: "九寨沟",
    tagline: "The Valley of Colored Lakes",
    introduction:
      "Hidden in the mountains of northern Sichuan, Jiuzhaigou Valley is a place of extraordinary natural beauty that seems almost too vivid to be real. The valley is famous for its multi-tiered lakes in impossible shades of turquoise, emerald, and sapphire, fed by mineral-rich springs and reflecting snow-capped Tibetan peaks above. Crystal-clear waterfalls cascade down limestone terraces, and in autumn the surrounding forests ignite in brilliant shades of orange and crimson, creating a color palette that defies imagination.",
    location: "Ngawa, Sichuan Province",
    province: "Sichuan",
    category: "Natural Wonder",
    highlights: [
      "UNESCO World Heritage Site since 1992",
      "Multi-colored mineral lakes and waterfalls",
      "Habitat for rare giant pandas",
      "Spectacular autumn foliage display",
    ],
    baseLikes: 4891,
    // → place images in: public/images/jiuzhaigou/1.jpg … 4.jpg
    images: [
      img("jiuzhaigou", 1),
      img("jiuzhaigou", 2),
      img("jiuzhaigou", 3),
      img("jiuzhaigou", 4),
    ],
  },
  {
    id: 8,
    name: "The Bund",
    chineseName: "外滩",
    tagline: "Where History Meets Tomorrow",
    introduction:
      "Shanghai's Bund is one of the world's most dramatic urban waterfronts, where a mile-long strip of magnificent colonial-era architecture faces the gleaming, futuristic skyline of Pudong across the Huangpu River. The contrast is breathtaking: Gothic, Baroque, Romanesque, and Art Deco buildings from the 19th and early 20th centuries stand in dialogue with the Oriental Pearl Tower, the Shanghai Tower, and dozens of other soaring skyscrapers. At night, both shores illuminate spectacularly, drawing visitors to witness one of the 21st century's most iconic cityscapes.",
    location: "Shanghai",
    province: "Shanghai",
    category: "Urban Landmark",
    highlights: [
      "52 historic colonial-era buildings",
      "Iconic views of the Pudong skyline",
      "Nightly light show on both riverbanks",
      "Heart of modern Shanghai's history",
    ],
    baseLikes: 3102,
    // → place images in: public/images/the-bund/1.jpg … 4.jpg
    images: [
      img("the-bund", 1),
      img("the-bund", 2),
      img("the-bund", 3),
      img("the-bund", 4),
    ],
  },
  {
    id: 9,
    name: "Potala Palace",
    chineseName: "布达拉宫",
    tagline: "The Palace in the Clouds",
    introduction:
      "Perched at 3,700 meters above sea level on Red Hill in Lhasa, the Potala Palace is an architectural masterpiece that appears to grow organically from the mountain itself. This iconic Tibetan structure — with its 13 stories, 1,000 rooms, 10,000 shrines, and nearly 200,000 statues — served as the winter palace of the Dalai Lamas for centuries. The White Palace and Red Palace together form a structure of extraordinary religious and historical significance for Tibetan Buddhism. The golden roofs gleaming against the deep blue Tibetan sky create an image of haunting, timeless beauty.",
    location: "Lhasa, Tibet Autonomous Region",
    province: "Tibet",
    category: "Cultural Heritage",
    highlights: [
      "UNESCO World Heritage Site",
      "3,700 meters above sea level",
      "13 stories with 1,000 rooms",
      "Former winter palace of the Dalai Lamas",
    ],
    baseLikes: 3789,
    // → place images in: public/images/potala-palace/1.jpg … 4.jpg
    images: [
      img("potala-palace", 1),
      img("potala-palace", 2),
      img("potala-palace", 3),
      img("potala-palace", 4),
    ],
  },
];

export default locations;
