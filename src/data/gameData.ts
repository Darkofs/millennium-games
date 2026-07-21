export interface SystemRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  directX?: string;
  storage: string;
}

export interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  platform: "steam" | "epic" | "ea" | "ubisoft" | "rockstar" | "battlenet";
  genre: string[];
  image: string;
  trending?: boolean;
  releaseDate?: string;
  description?: string;
  longDescription?: string;
  developer?: string;
  publisher?: string;
  languages?: string[];
  region?: string;
  minimumRequirements?: SystemRequirement;
  recommendedRequirements?: SystemRequirement;
  preorder?: boolean;
}

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface UpcomingGame {
  id: number;
  title: string;
  releaseDate: string;
  platform: "steam" | "epic" | "ea" | "ubisoft" | "rockstar" | "battlenet";
  image: string;
  preorderPrice?: number;
  description: string;
  genre: string;
}

export interface Deal {
  id: number;
  title: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  platform: "steam" | "epic" | "ea" | "ubisoft" | "rockstar" | "battlenet";
  image: string;
  endsAt: string;
  type: "flash" | "bundle" | "weekly";
}

export const featuredGames: Game[] = [
  {
    id: 1,
    title: "ARC Raiders",
    price: 399,
    originalPrice: 596,
    discount: 33,
    rating: 4.6,
    reviews: 1850,
    platform: "epic",
    genre: ["Action", "Shooter", "Indie"],
    image: "/images/Game Images/ARC RIDERS.svg",
    developer: "Embark Studios",
    publisher: "Embark Studios",
    releaseDate: "2025-10-15",
    description: "A free-to-play, third-person shooter where players defend Earth against alien machines.",
    longDescription: "ARC Raiders is a cooperative third-person shooter where you and your squad of Raiders unite to resist the onslaught of ARC – a ruthless mechanized threat descending from space. Scout, scavenge, and survive in a beautiful but deadly post-apocalyptic Earth.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-6600K or AMD Ryzen 5 1600",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "50 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-9700K or AMD Ryzen 7 3700X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "50 GB SSD space"
    }
  },
  {
    id: 2,
    title: "Alan Wake 2",
    price: 399,
    originalPrice: 475,
    discount: 16,
    rating: 4.8,
    reviews: 6400,
    platform: "epic",
    genre: ["Action", "Horror", "RPG"],
    image: "/images/Game Images/Alan Wake 2.svg",
    trending: true,
    developer: "Remedy Entertainment",
    publisher: "Epic Games Publishing",
    releaseDate: "2023-10-27",
    description: "A psychological survival horror game featuring two protagonist story paths.",
    longDescription: "Alan Wake 2 is a psychological survival horror game. A string of ritualistic murders threatens Bright Falls, an eerie small-town community. Saga Anderson, an accomplished FBI agent, arrives to investigate. Meanwhile, Alan Wake, a trapped writer, writes a dark story to shape the reality around him.",
    minimumRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-7600K or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 6600",
      directX: "Version 12",
      storage: "90 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K or AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3070 or Radeon RX 6700 XT",
      directX: "Version 12",
      storage: "90 GB SSD space"
    }
  },
  {
    id: 3,
    title: "Alan Wake Remastered",
    price: 399,
    originalPrice: 798,
    discount: 50,
    rating: 4.5,
    reviews: 2100,
    platform: "epic",
    genre: ["Action", "Horror"],
    image: "/images/Game Images/Alan Wake Remastered.svg",
    developer: "Remedy Entertainment",
    publisher: "Epic Games Publishing",
    releaseDate: "2021-10-05",
    description: "The remastered version of the award-winning cinematic action-thriller.",
    longDescription: "Return to the mysterious town of Bright Falls in this remastered edition. The writer Alan Wake embarks on a desperate search for his missing wife, Alice. He discovers pages of a thriller he has supposedly written, though he has no memory of it.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-3330 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 960 or Radeon R9 280X",
      directX: "Version 11",
      storage: "36 GB space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-3770 or AMD Ryzen 5 2600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 11",
      storage: "36 GB space"
    }
  },
  {
    id: 4,
    title: "Assassin's Creed Shadows",
    price: 399,
    rating: 4.7,
    reviews: 3200,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/Assassin's Creed Shadow.svg",
    trending: true,
    preorder: true,
    developer: "Ubisoft Quebec",
    publisher: "Ubisoft",
    releaseDate: "2025-02-14",
    description: "Explore feudal Japan as a lethal shinobi assassin and a powerful samurai.",
    longDescription: "Live the intertwined stories of Naoe, an adept shinobi Assassin from Iga Province, and Yasuke, the powerful African samurai of historical legend. In feudal Japan, carve your own path and combat the corruption of the order.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-8700K or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1070 or Radeon RX 5700",
      directX: "Version 12",
      storage: "85 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K or AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3070 or Radeon RX 6800",
      directX: "Version 12",
      storage: "85 GB SSD space"
    }
  },
  {
    id: 5,
    title: "Battlefield 6",
    price: 399,
    rating: 4.4,
    reviews: 1200,
    platform: "epic",
    genre: ["Action", "Shooter", "Multiplayer"],
    image: "/images/Game Images/BATTLEFIELD 6.svg",
    preorder: true,
    developer: "DICE",
    publisher: "Electronic Arts",
    releaseDate: "2026-11-20",
    description: "The next evolution of all-out warfare on massive scales.",
    longDescription: "Battlefield 6 returns to the franchise's roots of massive, destructive multiplayer battlefields. Featuring advanced physics, ground-breaking weather simulation, and 128-player battles, this is the ultimate modern military shooter.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-8400 or AMD Ryzen 5 2600",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1660 or Radeon RX 590",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K or AMD Ryzen 7 3800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3060 Ti or Radeon RX 6700 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 6,
    title: "Black Myth: Wukong",
    price: 399,
    rating: 4.9,
    reviews: 14800,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/Black Myth Wukong.svg",
    trending: true,
    developer: "Game Science",
    publisher: "Game Science",
    releaseDate: "2024-08-20",
    description: "An action RPG rooted in Chinese mythology based on Journey to the West.",
    longDescription: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-8400 or AMD Ryzen 5 1600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "130 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-9700 or AMD Ryzen 5 5500",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "130 GB SSD space"
    }
  },
  {
    id: 7,
    title: "Borderlands 4",
    price: 399,
    rating: 4.8,
    reviews: 2900,
    platform: "epic",
    genre: ["Action", "RPG", "Multiplayer", "Shooter"],
    image: "/images/Game Images/Borderlands 4.svg",
    preorder: true,
    developer: "Gearbox Software",
    publisher: "2K Games",
    releaseDate: "2025-12-10",
    description: "The ultimate looter-shooter returns in a brand new stellar adventure.",
    longDescription: "Borderlands 4 takes the vault hunters to an entirely new planet, loaded with crazy loot, psycho enemies, and a mysterious galactic threat. Face off against the cosmos solo or in 4-player co-op!",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-10400F or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1660 Super or Radeon RX 5600 XT",
      directX: "Version 12",
      storage: "120 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-12700K or AMD Ryzen 7 5800X",
      memory: "32 GB RAM",
      graphics: "GeForce RTX 3080 or Radeon RX 6800 XT",
      directX: "Version 12",
      storage: "120 GB SSD space"
    }
  },
  {
    id: 8,
    title: "Call of Duty: Modern Warfare II",
    price: 399,
    originalPrice: 688,
    discount: 42,
    rating: 4.3,
    reviews: 9300,
    platform: "epic",
    genre: ["Action", "Shooter", "Multiplayer"],
    image: "/images/Game Images/Call Of Duty Modern Warfare 2.svg",
    developer: "Infinity Ward",
    publisher: "Activision",
    releaseDate: "2022-10-28",
    description: "Task Force 141 makes its heroic return in a global campaign.",
    longDescription: "Call of Duty: Modern Warfare II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale tactical operations to high-stakes campaigns.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i3-6100 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 960 or Radeon RX 470",
      directX: "Version 12",
      storage: "125 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-6600K or AMD Ryzen 5 1400",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "125 GB SSD space"
    }
  },
  {
    id: 9,
    title: "Call of Duty: Modern Warfare III",
    price: 399,
    originalPrice: 554,
    discount: 28,
    rating: 4.1,
    reviews: 7200,
    platform: "epic",
    genre: ["Action", "Shooter", "Multiplayer"],
    image: "/images/Game Images/Call Of Duty Modern Warfare 3.svg",
    developer: "Sledgehammer Games",
    publisher: "Activision",
    releaseDate: "2023-11-10",
    description: "The direct sequel to the record-breaking Modern Warfare II.",
    longDescription: "Captain Price and Task Force 141 face off against the ultimate threat. The ultranationalist Vladimir Makarov is extending his grasp across the world, causing Task Force 141 to fight like never before.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-6600 or AMD Ryzen 5 1400",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 960 or Radeon RX 470",
      directX: "Version 12",
      storage: "149 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-6700K or AMD Ryzen 5 1600X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3060 or Radeon RX 6600 XT",
      directX: "Version 12",
      storage: "149 GB SSD space"
    }
  },
  {
    id: 10,
    title: "Clair Obscur: Expedition 33",
    price: 399,
    rating: 4.8,
    reviews: 1500,
    platform: "epic",
    genre: ["RPG", "Indie"],
    image: "/images/Game Images/Clair Obscur Expedition 33.svg",
    preorder: true,
    developer: "Sandfall Interactive",
    publisher: "Kepler Interactive",
    releaseDate: "2025-05-15",
    description: "A turn-based RPG with real-time mechanics in a fantasy world.",
    longDescription: "Lead the Expedition 33 to destroy the Paintress before she paints her final number. Explore a beautiful Belle Époque inspired fantasy world, engage in turn-based combat with active defense, and discover your party's destiny.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-9600K or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5600 XT",
      directX: "Version 12",
      storage: "70 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K or AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3070 or Radeon RX 6700 XT",
      directX: "Version 12",
      storage: "70 GB SSD space"
    }
  },
  {
    id: 11,
    title: "Crimson Desert",
    price: 399,
    rating: 4.7,
    reviews: 2400,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/Crimson Desert.svg",
    preorder: true,
    developer: "Pearl Abyss",
    publisher: "Pearl Abyss",
    releaseDate: "2025-09-18",
    description: "An epic open-world action adventure following mercenary fighters.",
    longDescription: "Crimson Desert is an upcoming open-world action-adventure game. It tells the story of mercenaries fighting for survival in the vast continent of Pywel, focusing on realistic medieval fantasy and intense sword action.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-8700 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1070 or Radeon RX 590",
      directX: "Version 12",
      storage: "90 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K or AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3060 Ti or Radeon RX 6700 XT",
      directX: "Version 12",
      storage: "90 GB SSD space"
    }
  },
  {
    id: 12,
    title: "Cyberpunk 2077",
    price: 399,
    originalPrice: 798,
    discount: 50,
    rating: 4.7,
    reviews: 18900,
    platform: "epic",
    genre: ["RPG", "Action"],
    image: "/images/Game Images/Cyberpunk 2077.svg",
    trending: true,
    developer: "CD Projekt Red",
    publisher: "CD Projekt Red",
    releaseDate: "2020-12-10",
    description: "An open-world action-adventure RPG set in the metropolis of Night City.",
    longDescription: "Cyberpunk 2077 is an open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification. Play as V, a cyberpunk mercenary, and take on the most powerful forces of the city.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-6700 or AMD Ryzen 5 1600",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "70 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-12700 or AMD Ryzen 7 7800X3D",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 Super or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "70 GB SSD space"
    }
  },
  {
    id: 13,
    title: "Death Stranding 2: On The Beach",
    price: 399,
    rating: 4.8,
    reviews: 3100,
    platform: "epic",
    genre: ["Action", "Indie"],
    image: "/images/Game Images/Death Stranding 2 On The Beach.svg",
    preorder: true,
    developer: "Kojima Productions",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "2025-11-30",
    description: "Hideo Kojima's next masterpiece about human connections.",
    longDescription: "Embark on an inspiring mission of human connection beyond the UCA. Sam and his companions set off on a new journey to save humanity from extinction. Explore surreal landscapes and face mysterious foes.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-10600 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-12700K or AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3070 or Radeon RX 6800",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 14,
    title: "Elden Ring",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.9,
    reviews: 22400,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/Elden Ring.svg",
    trending: true,
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    releaseDate: "2022-02-25",
    description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
    longDescription: "The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-8400 or AMD Ryzen 3 3300X",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "60 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-8700K or AMD Ryzen 5 3600X",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1070 or Radeon RX Vega 56",
      directX: "Version 12",
      storage: "60 GB SSD space"
    }
  },
  {
    id: 15,
    title: "F1 25",
    price: 399,
    rating: 4.5,
    reviews: 1100,
    platform: "epic",
    genre: ["Racing", "Sports"],
    image: "/images/Game Images/F1 25.svg",
    developer: "Codemasters",
    publisher: "EA Sports",
    releaseDate: "2025-06-25",
    description: "The official videogame of the FIA Formula One World Championship.",
    longDescription: "Experience the thrill of Formula 1 in the most authentic racing simulator. Features updated team line-ups, advanced tire physics, dynamic race events, and an immersive career mode.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i3-2130 or AMD FX-4300",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1050 Ti or Radeon RX 470",
      directX: "Version 11",
      storage: "80 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-9600K or AMD Ryzen 5 2600X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5700",
      directX: "Version 12",
      storage: "80 GB SSD space"
    }
  },
  {
    id: 16,
    title: "EA SPORTS FC 25",
    price: 399,
    originalPrice: 798,
    discount: 50,
    rating: 4.2,
    reviews: 6400,
    platform: "epic",
    genre: ["Sports", "Multiplayer"],
    image: "/images/Game Images/FC 25.svg",
    developer: "EA Vancouver",
    publisher: "EA Sports",
    releaseDate: "2024-09-27",
    description: "Play the World's Game with over 19,000 fully licensed players.",
    longDescription: "EA SPORTS FC 25 brings you closer to the pitch than ever. Experience unmatched realism, advanced HyperMotionV technology, and the new Tactical AI engine. Build your dream squad and compete.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-6600K or AMD Ryzen 5 1600",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1050 Ti or Radeon RX 570",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-6700 or AMD Ryzen 7 2700X",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1660 or Radeon RX 5600 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 17,
    title: "EA SPORTS FC 26",
    price: 399,
    rating: 4.3,
    reviews: 2100,
    platform: "steam",
    genre: ["Sports", "Multiplayer"],
    image: "/images/Game Images/FC 26.svg",
    preorder: true,
    developer: "EA Vancouver",
    publisher: "EA Sports",
    releaseDate: "2025-09-26",
    description: "The future of football simulation with ground-breaking visual upgrades.",
    longDescription: "Pre-order EA SPORTS FC 26 and experience the next generation of soccer. Tactical Overhaul, new dynamic stadium atmospheres, and improved player animations powered by HyperMotion Next.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-8400 or AMD Ryzen 5 2600",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1660 or Radeon RX 5500 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700 or AMD Ryzen 7 3700X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 6600",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 18,
    title: "Far Cry 6",
    price: 399,
    originalPrice: 1596,
    discount: 75,
    rating: 4.4,
    reviews: 5800,
    platform: "epic",
    genre: ["Action", "Shooter"],
    image: "/images/Game Images/Far Cry 6.svg",
    developer: "Ubisoft Toronto",
    publisher: "Ubisoft",
    releaseDate: "2021-10-06",
    description: "Plunge into the chaotic world of a modern-day guerrilla revolution.",
    longDescription: "Welcome to Yara, a tropical paradise frozen in time. As the dictator of Yara, Antón Castillo is intent on restoring his nation back to its former glory by any means. Join the revolution and fight back.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-4460 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 960 or Radeon R9 380",
      directX: "Version 12",
      storage: "60 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-7700 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1080 or Radeon RX VEGA 64",
      directX: "Version 12",
      storage: "60 GB SSD space"
    }
  },
  {
    id: 19,
    title: "Forza Horizon 5",
    price: 399,
    originalPrice: 798,
    discount: 50,
    rating: 4.8,
    reviews: 8200,
    platform: "epic",
    genre: ["Racing", "Sports", "Multiplayer"],
    image: "/images/Game Images/Forza Horizon 5.svg",
    developer: "Playground Games",
    publisher: "Xbox Game Studios",
    releaseDate: "2021-11-09",
    description: "Your ultimate Horizon Adventure awaits in the vibrant landscapes of Mexico.",
    longDescription: "Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. Take on massive races, expeditions, and multiplayer events.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-4460 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 970 or Radeon RX 470",
      directX: "Version 12",
      storage: "110 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-10700K or AMD Ryzen 7 3800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2070 or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "110 GB SSD space"
    }
  },
  {
    id: 20,
    title: "Grand Theft Auto V",
    price: 399,
    originalPrice: 798,
    discount: 50,
    rating: 4.8,
    reviews: 24500,
    platform: "epic",
    genre: ["Action", "Multiplayer"],
    image: "/images/Game Images/GTA 5.svg",
    trending: true,
    developer: "Rockstar North",
    publisher: "Rockstar Games",
    releaseDate: "2015-04-14",
    description: "Experience the critically acclaimed open-world game and GTA Online.",
    longDescription: "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, they must pull off heists.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core 2 Quad Q6600 or AMD Phenom 9850",
      memory: "4 GB RAM",
      graphics: "GeForce 9800 GT or Radeon HD 4870",
      directX: "Version 10",
      storage: "90 GB HDD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-3470 or AMD FX-8350",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 660 or Radeon HD 7870",
      directX: "Version 11",
      storage: "90 GB SSD space"
    }
  },
  {
    id: 21,
    title: "Ghost of Tsushima: Director's Cut",
    price: 399,
    originalPrice: 596,
    discount: 33,
    rating: 4.9,
    reviews: 7900,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/Ghost Of Tsushima.svg",
    developer: "Sucker Punch Productions",
    publisher: "PlayStation Publishing",
    releaseDate: "2024-05-16",
    description: "Forge a new path and wage an unconventional war for the freedom of Tsushima.",
    longDescription: "In the late 13th century, the Mongol empire has laid waste to entire nations. Samurai warrior Jin Sakai must sacrifice everything to protect what is left of his home and people.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i3-7100 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 960 or Radeon RX 5500 XT",
      directX: "Version 12",
      storage: "75 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-8600 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5600 XT",
      directX: "Version 12",
      storage: "75 GB SSD space"
    }
  },
  {
    id: 22,
    title: "God of War Ragnarök",
    price: 399,
    originalPrice: 475,
    discount: 16,
    rating: 4.8,
    reviews: 5100,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/God Of War Ragnarök.svg",
    developer: "Santa Monica Studio",
    publisher: "PlayStation Publishing",
    releaseDate: "2024-09-19",
    description: "Embark on an epic and heartfelt journey as Kratos and Atreus struggle.",
    longDescription: "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-4670K or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "190 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-7700K or AMD Ryzen 7 2700X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3060 or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "190 GB SSD space"
    }
  },
  {
    id: 23,
    title: "Mortal Kombat 1",
    price: 399,
    originalPrice: 928,
    discount: 57,
    rating: 4.4,
    reviews: 4300,
    platform: "epic",
    genre: ["Fighting", "Action"],
    image: "/images/Game Images/Mortal Kombat 1.svg",
    developer: "NetherRealm Studios",
    publisher: "Warner Bros. Games",
    releaseDate: "2023-09-19",
    description: "Discover a reborn Mortal Kombat Universe created by the Fire God Liu Kang.",
    longDescription: "Mortal Kombat 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and fatalities. Experience an expansive, cinematic story campaign featuring your favorite fighters reborn.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-6600 or AMD Ryzen 3 3100",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 980 or Radeon RX 470",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-8400 or AMD Ryzen 5 3600",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1080 Ti or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 24,
    title: "Red Dead Redemption 2",
    price: 399,
    originalPrice: 1209,
    discount: 67,
    rating: 4.9,
    reviews: 18400,
    platform: "epic",
    genre: ["Action", "RPG"],
    image: "/images/Game Images/Read Dead Redeemption 2.svg",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    releaseDate: "2019-12-05",
    description: "Arthur Morgan and the Van der Linde gang are outlaws on the run.",
    longDescription: "Red Dead Redemption 2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across the vast and rugged heartland of America at the turn of the century.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-2500K or AMD FX-6300",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 770 or Radeon R9 280",
      directX: "Version 11",
      storage: "150 GB HDD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-4770K or AMD Ryzen 5 1500X",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 480",
      directX: "Version 12",
      storage: "150 GB SSD space"
    }
  },
  {
    id: 25,
    title: "Resident Evil Requiem",
    price: 399,
    rating: 4.8,
    reviews: 1900,
    platform: "epic",
    genre: ["Horror", "Action"],
    image: "/images/Game Images/Resident Evil Requiem.svg",
    preorder: true,
    developer: "Capcom",
    publisher: "Capcom",
    releaseDate: "2026-04-18",
    description: "Survival horror reaches terrifying new heights in the latest entry.",
    longDescription: "Resident Evil Requiem takes players to a remote, gothic cathedral in Eastern Europe where the biological terrors run deep. Solve elaborate puzzles and manage your resources to survive the horrific plague.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-7500 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1050 Ti or Radeon RX 560",
      directX: "Version 12",
      storage: "60 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-8700 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1070 or RTX 2060",
      directX: "Version 12",
      storage: "60 GB SSD space"
    }
  },
  {
    id: 26,
    title: "The Last of Us Part I",
    price: 399,
    originalPrice: 596,
    discount: 33,
    rating: 4.7,
    reviews: 6800,
    platform: "epic",
    genre: ["Action", "Horror"],
    image: "/images/Game Images/The Last Of Us Part 1.svg",
    developer: "Naughty Dog",
    publisher: "PlayStation Publishing",
    releaseDate: "2023-03-28",
    description: "Experience the emotional storytelling and unforgettable characters.",
    longDescription: "In a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-4770K or AMD Ryzen 5 1500X",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 970 or Radeon RX 470",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-8700 or AMD Ryzen 5 3600X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2070 Super or Radeon RX 6600 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 27,
    title: "The Last of Us Part II Remastered",
    price: 399,
    rating: 4.8,
    reviews: 5400,
    platform: "epic",
    genre: ["Action", "Horror"],
    image: "/images/Game Images/The Last Of Us Part 2.svg",
    developer: "Naughty Dog",
    publisher: "PlayStation Publishing",
    releaseDate: "2026-03-12",
    description: "Five years after their dangerous journey, Ellie and Joel have settled down.",
    longDescription: "Experience the award-winning masterpiece with enhanced graphics, new game modes, and full PC integration. A violent event disrupts the peace Ellie has found, and she embarks on a relentless journey of vengeance.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-8700 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5700",
      directX: "Version 12",
      storage: "120 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i9-12900 or AMD Ryzen 9 5900X",
      memory: "32 GB RAM",
      graphics: "GeForce RTX 3080 or Radeon RX 6800 XT",
      directX: "Version 12",
      storage: "120 GB SSD space"
    }
  },
  {
    id: 28,
    title: "Warhammer 40,000: Space Marine 2",
    price: 399,
    rating: 4.8,
    reviews: 11200,
    platform: "epic",
    genre: ["Action", "Shooter", "Multiplayer"],
    image: "/images/Game Images/Warhammer 40000 Space Marine.svg",
    trending: true,
    developer: "Saber Interactive",
    publisher: "Focus Entertainment",
    releaseDate: "2024-09-09",
    description: "Embody the superhuman skill and brutality of a Space Marine.",
    longDescription: "Hold at bay the horrors of the galaxy in epic battles on far-flung planets. Unleash deadly abilities and an arsenal of devastating weaponry to obliterate the relentless Tyranid swarms.",
    minimumRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i5-8600K or AMD Ryzen 5 2600X",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 12",
      storage: "75 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-12700 or AMD Ryzen 7 5800X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 3070 or Radeon RX 6800",
      directX: "Version 12",
      storage: "75 GB SSD space"
    }
  },
  {
    id: 29,
    title: "Black Myth: Wukong",
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    reviews: 24500,
    platform: "epic",
    genre: ["Action", "RPG", "Adventure"],
    image: "/images/Game Images/Black Myth Wukong.svg",
    developer: "Game Science",
    publisher: "Game Science",
    releaseDate: "2024-08-20",
    description: "An action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges ahead.",
    longDescription: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-8400 or AMD Ryzen 5 1600",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1060 or Radeon RX 580",
      directX: "Version 11",
      storage: "130 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-9700 or AMD Ryzen 5 3600",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 5700 XT",
      directX: "Version 12",
      storage: "130 GB SSD space"
    }
  },
  {
    id: 30,
    title: "GTA 5",
    price: 399,
    originalPrice: 599,
    rating: 4.8,
    reviews: 154000,
    platform: "epic",
    genre: ["Action", "Adventure", "Open World"],
    image: "/images/Game Images/GTA 5.svg",
    developer: "Rockstar North",
    publisher: "Rockstar Games",
    releaseDate: "2015-04-14",
    description: "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County.",
    longDescription: "When a young street hustler, a retired bank robber and a fearsome psychopath find themselves entangled with some of the most frightening and deranged elements of the underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core 2 Quad CPU Q6600 or AMD Phenom 9850",
      memory: "4 GB RAM",
      graphics: "GeForce 9800 GT 1GB or Radeon HD 4870 1GB",
      directX: "Version 10",
      storage: "72 GB HDD space"
    },
    recommendedRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5 3470 or AMD X8 FX-8350",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 660 2GB or Radeon HD 7870 2GB",
      directX: "Version 11",
      storage: "72 GB HDD space"
    }
  },
  {
    id: 31,
    title: "FC 26",
    price: 399,
    originalPrice: 599,
    rating: 4.3,
    reviews: 5200,
    platform: "steam",
    genre: ["Sports", "Simulation"],
    image: "/images/Game Images/FC 26.svg",
    developer: "EA Vancouver",
    publisher: "EA Sports",
    releaseDate: "2025-09-26",
    description: "EA SPORTS FC 26 brings you the World's Game with the most authentic football experience on PC.",
    longDescription: "EA SPORTS FC 26 welcomes you to The World's Game: the most true-to-football experience ever. Feel closer to the game with three state-of-the-art technologies powering unparalleled realism in every match: HyperMotionV, PlayStyles optimized by Opta, and a revolutionized Frostbite Engine.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-6600K or AMD Ryzen 5 1600",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1050 Ti or Radeon RX 570",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-6700 or AMD Ryzen 7 2700X",
      memory: "12 GB RAM",
      graphics: "GeForce GTX 1660 or Radeon RX 5600 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 32,
    title: "BATTLEFIELD 6",
    price: 399,
    originalPrice: 599,
    rating: 4.4,
    reviews: 8600,
    platform: "epic",
    genre: ["Action", "Shooter", "Multiplayer"],
    image: "/images/Game Images/BATTLEFIELD 6.svg",
    developer: "DICE",
    publisher: "Electronic Arts",
    releaseDate: "2026-11-20",
    description: "Battlefield 6 marks the return to the iconic all-out warfare of the franchise with massive-scale multiplayer combat.",
    longDescription: "Battlefield 6 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise. Adapt and overcome in a near-future world transformed by disorder. Squad up and bring a cutting-edge arsenal into dynamically-changing battlegrounds supporting up to 128 players.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-5675C or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 1050 Ti or Radeon RX 560",
      directX: "Version 12",
      storage: "100 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-8700 or AMD Ryzen 7 2700X",
      memory: "16 GB RAM",
      graphics: "GeForce RTX 2060 or Radeon RX 6600 XT",
      directX: "Version 12",
      storage: "100 GB SSD space"
    }
  },
  {
    id: 33,
    title: "Anno 117: Pax Romana",
    price: 399,
    rating: 4.8,
    reviews: 1400,
    platform: "epic",
    genre: ["Strategy", "Simulation"],
    image: "/images/Game Images/Anno 117.svg",
    preorder: true,
    developer: "Ubisoft Blue Byte",
    publisher: "Ubisoft",
    releaseDate: "2025-12-15",
    description: "Build a Roman province in Anno 117: Pax Romana.",
    longDescription: "Step into the role of a Roman governor in Anno 117: Pax Romana. Construct cities, establish trade routes, manage resources, and guide your people to prosperity in the ancient world.",
    minimumRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-4460 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "GeForce GTX 960 or Radeon RX 460",
      directX: "Version 12",
      storage: "50 GB SSD space"
    },
    recommendedRequirements: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-4770 or AMD Ryzen 5 1500X",
      memory: "16 GB RAM",
      graphics: "GeForce GTX 1070 or Radeon RX 580",
      directX: "Version 12",
      storage: "50 GB SSD space"
    }
  }
];

export const trendingGames: Game[] = featuredGames.filter((g) => g.trending);

export const upcomingGames: UpcomingGame[] = [
  {
    id: 4,
    title: "Assassin's Creed Shadows",
    releaseDate: "2025-02-14",
    platform: "epic",
    image: "/images/Game Images/Assassin's Creed Shadow.svg",
    preorderPrice: 399,
    description: "Explore feudal Japan as Yasuke and Naoe.",
    genre: "Action"
  },
  {
    id: 5,
    title: "Battlefield 6",
    releaseDate: "2026-11-20",
    platform: "epic",
    image: "/images/Game Images/BATTLEFIELD 6.svg",
    preorderPrice: 399,
    description: "The next evolution of DICE's all-out war franchise.",
    genre: "Shooter"
  },
  {
    id: 10,
    title: "Clair Obscur: Expedition 33",
    releaseDate: "2025-05-15",
    platform: "epic",
    image: "/images/Game Images/Clair Obscur Expedition 33.svg",
    preorderPrice: 399,
    description: "Save humanity from the Paintress in this turn-based RPG.",
    genre: "RPG"
  },
  {
    id: 17,
    title: "EA SPORTS FC 26",
    releaseDate: "2025-09-26",
    platform: "steam",
    image: "/images/Game Images/FC 26.svg",
    preorderPrice: 399,
    description: "Pre-order the next generation of football simulation.",
    genre: "Sports"
  },
  {
    id: 33,
    title: "Anno 117: Pax Romana",
    releaseDate: "2025-12-15",
    platform: "epic",
    image: "/images/Game Images/Anno 117.svg",
    preorderPrice: 399,
    description: "Build a Roman province in Anno 117: Pax Romana.",
    genre: "Strategy"
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    name: "Alex M.",
    avatar: "AM",
    rating: 5,
    text: "Incredible service! Got my game account credentials in seconds after payment. Setup was super easy following the offline activation guide!",
    date: "2 days ago",
    verified: true
  },
  {
    id: 2,
    name: "Sarah K.",
    avatar: "SK",
    rating: 5,
    text: "I was skeptical at first, but Millennium Games proved me wrong. Fast, reliable, and their support team is amazing. 10/10!",
    date: "1 week ago",
    verified: true
  },
  {
    id: 3,
    name: "Marcus T.",
    avatar: "MT",
    rating: 5,
    text: "Best place to buy offline and online game accounts. The website is beautiful and easy to use. Got a great deal on Baldur's Gate 3. Highly recommend!",
    date: "3 days ago",
    verified: true
  },
  {
    id: 4,
    name: "Elena R.",
    avatar: "ER",
    rating: 4,
    text: "Super fast delivery and great prices. Customer support helped me with a minor issue right away. Great experience overall!",
    date: "5 days ago",
    verified: true
  },
  {
    id: 5,
    name: "James W.",
    avatar: "JW",
    rating: 5,
    text: "I've bought over 20 games from Millennium Games. Never had a single issue. Their steam accounts are solid and support helps with Steam Guard codes instantly.",
    date: "1 day ago",
    verified: true
  }
];

export const deals: Deal[] = [
  {
    id: 24,
    title: "Red Dead Redemption 2",
    originalPrice: 1209,
    dealPrice: 399,
    discount: 67,
    platform: "epic",
    image: "/images/Game Images/Read Dead Redeemption 2.svg",
    endsAt: "2026-06-20T23:59:59",
    type: "flash"
  },
  {
    id: 19,
    title: "Forza Horizon 5",
    originalPrice: 798,
    dealPrice: 399,
    discount: 50,
    platform: "epic",
    image: "/images/Game Images/Forza Horizon 5.svg",
    endsAt: "2026-06-22T23:59:59",
    type: "bundle"
  },
  {
    id: 2,
    title: "Alan Wake 2",
    originalPrice: 475,
    dealPrice: 399,
    discount: 16,
    platform: "epic",
    image: "/images/Game Images/Alan Wake 2.svg",
    endsAt: "2026-06-19T23:59:59",
    type: "weekly"
  },
  {
    id: 18,
    title: "Far Cry 6",
    originalPrice: 1596,
    dealPrice: 399,
    discount: 75,
    platform: "epic",
    image: "/images/Game Images/Far Cry 6.svg",
    endsAt: "2026-06-21T23:59:59",
    type: "flash"
  }
];

export const stats = {
  ordersDelivered: 50000,
  positiveFeedback: 98,
  supportAvailability: "24/7",
  gamesAvailable: 12000
};

export interface InventoryAccount {
  games: number[]; // Game IDs this account owns
  platform: "steam" | "epic" | "ea" | "ubisoft" | "rockstar" | "battlenet";
  accountUser: string;
  accountPass: string;
  extraDetails?: string; // Linked details (EA Mail/Pass, Rockstar Mail/Pass, Ubisoft Mail/Pass)
}

export const accountsInventory: InventoryAccount[] = [
  {
    games: [17, 31], // EA SPORTS FC 26
    platform: "steam",
    accountUser: "fc26darkoffline",
    accountPass: "Dark@807870",
    extraDetails: "Linked EA App Account -> Mail: fc26offlinesellmain@outlook.com | Pass: Dark@8078"
  },
  {
    games: [1, 16], // ARC Raiders, EA SPORTS FC 25
    platform: "epic",
    accountUser: "80.lunch-caving@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing ARC Raiders Deluxe Edition & FC 25."
  },
  {
    games: [15, 26, 27], // F1 25, The Last of Us Part I, The Last of Us Part II Remastered
    platform: "epic",
    accountUser: "hoods-hearths-1i@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Last of Us Part I, Last of Us Part II, and F1 25."
  },
  {
    games: [7, 12], // Borderlands 4, Cyberpunk 2077
    platform: "epic",
    accountUser: "logjam.click-9i@icloud.com",
    accountPass: "Catblack@8078",
    extraDetails: "Epic Games account containing ARC Raiders Deluxe, Borderlands 4, Cyberpunk 2077 (with DLC), Dead By Daylight, and Sherlock Holmes Chapter 1 Deluxe Edition."
  },
  {
    games: [11], // Crimson Desert
    platform: "epic",
    accountUser: "fairest.cropper.2w@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Crimson Desert Standard."
  },
  {
    games: [20, 30], // GTA V, GTA 5
    platform: "epic",
    accountUser: "runtime_gilders.3x@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Linked Rockstar Games Account -> Id: runtime_gilders.3x@icloud.com | Pass: Black@8078"
  },
  {
    games: [4], // Assassin's Creed Shadows
    platform: "epic",
    accountUser: "78.past-fens@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Linked Ubisoft Account -> Mail: 78.past-fens@icloud.com | Pass: Black@807870"
  },
  {
    games: [21], // Ghost of Tsushima
    platform: "epic",
    accountUser: "deniers-wanes.8e@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Ghost Of Tsushima Director's Cut."
  },
  {
    games: [24], // Red Dead Redemption 2
    platform: "epic",
    accountUser: "43-tundras-grantor@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Red Dead Redemption 2."
  },
  {
    games: [33], // Anno 117: Pax Romana
    platform: "epic",
    accountUser: "spores.lessor.5h@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Linked Ubisoft Account -> Mail: spores.lessor.5h@icloud.com | Pass: Black@8078"
  },
  {
    games: [5, 32, 25], // Battlefield 6, Resident Evil Requiem
    platform: "epic",
    accountUser: "epicgames1.ambush273@slmails.com",
    accountPass: "Dark@8078",
    extraDetails: "Epic Games account containing Battlefield 6 and Resident Evil Requiem."
  },
  {
    games: [10], // Clair Obscur: Expedition 33
    platform: "epic",
    accountUser: "27_bigger.letters@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Clair Obscur: Expedition 33 Deluxe."
  },
  {
    games: [2, 3], // Alan Wake 2, Alan Wake Remastered
    platform: "epic",
    accountUser: "ace.display-8m@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Alan Wake 2 and Alan Wake Remastered."
  },
  {
    games: [13], // Death Stranding 2
    platform: "epic",
    accountUser: "habit_folate3e@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Death Stranding 2 On The Beach."
  },
  {
    games: [11], // Crimson Desert (Deluxe edition)
    platform: "epic",
    accountUser: "edged-gimme-8u@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Crimson Desert Deluxe Edition."
  },
  {
    games: [6, 29], // Black Myth: Wukong
    platform: "epic",
    accountUser: "witting.26.dapper@icloud.com",
    accountPass: "Black@8078",
    extraDetails: "Epic Games account containing Black Myth: Wukong."
  }
];
