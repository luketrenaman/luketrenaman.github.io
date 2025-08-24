// Why is my resume typescript validated?? It makes me happy
export interface Timeline {
    start: Date,
    end: Date,
    name: string;
}

// Courses don't have repository links as that seems unethical
export interface Course extends Timeline {
    institution: "William Mason High School" | "Sinclair Community College" | "The Ohio State University" | "Coursera" | "FreeCodeCamp" | "Microsoft Learn" | string;
}

export interface Job extends Timeline {
    location?: string;
    modality?: "In Person" | "Hybrid" | "Remote";
    description?: string[];
    title: string;
}

export interface Project extends Timeline {
    type: "Web" | "Game" | "Other";
    platforms: ("Desktop" | "Mobile")[];
    link: string;
    repo?: string; //if no deploy, repo can be inferred from above
    description: string;
    thumbnail?: string;
    alt: string;
}
export interface Organizer {
    name: string;
    website: string;
}

export interface Contest extends Timeline {
    link?: {
      name: string;
      url: string;
    };
    awards: string[];
    description?: string;
    //organizer?: Organizer;
}
export interface Resume {
    courses: Course[],
    projects: Project[],
    contests: Contest[],
    jobs: Job[],
}

// Contests with projects
const geofare = {
  start: new Date("Mar 26 2022"),
  end: new Date("Mar 27 2022"),
};
const cloudkeys = {
  start: new Date("Jun 20 2019"),
  end: new Date("Jul 21 2019"),
};
const wwww = {
  start: new Date("Feb 26 2022"),
  end: new Date("Feb 27 2022"),
};

// Jobs with projects
const studentActivities = {
  start: new Date("Sep 2021"),
  end: new Date("May 2022"),
};
const interalliance = {
  start: new Date("Jun 2022"),
  end: new Date("Aug 2022"),
};

// Dates were lost for archives projects (they were retrieved from my filesystem before using Git)
// This is just the timeframe in which projects have been added to archives
const archives = {
  start: new Date("Jan 1 2018"),
};

// TODO: add correct timelines for school semesters
const au2018 = {
  start: new Date("Aug 17 2018"),
  end: new Date("Dec 20 2018"),
};
const au2019 = {
  start: new Date("Aug 17 2019"),
  end: new Date("Dec 20 2019"),
};
const sp2019 = {
  start: new Date("Jan 3 2019"),
  end: new Date("May 30 2019"),
};
const au2022 = {
  start: new Date("Aug 23 2022"),
  end: new Date("December 14 2022"),
};
const sp2023 = {
  start: new Date("Jan 9 2023"),
  end: new Date("May 2 2023"),
};
const au2023 = {
  start: new Date("Aug 22 2023"),
  end: new Date("December 15 2023"),
};
const sp2024 = {
  start: new Date("Jan 08 2024"),
  end: new Date("April 30 2024"),
};

const au2024 = {
  start: new Date("Aug 20 2024"),
  end: new Date("Dec 12 2024")
};

const sp2025 = {
  start: new Date("Jan 6 2025"),
  end: new Date("Apr 29 2025")
}


export const resume: Resume = {
  courses: [
    {
      name: "Book of Shaders",
      start: new Date("Dec 27 2020"),
      end: new Date("Mar 1 2021"),
      institution: "https://thebookofshaders.com"
    },
    {
      name: "CIS 1350 WEB DEV HTML & CSS",
      start: new Date("Jan 7 2019"),
      end: new Date("May 5 2019"),
      institution: "Sinclair Community College",
    },
    {
      name: "CIS 1111 INTRO PROB SOLV COMP",
      start: new Date("May 15 2019"),
      end: new Date("August 6 2019"),
      institution: "Sinclair Community College",
    },
    {
      name: "Andrew Ng Machine Learning",
      start: new Date("April 5 2020"),
      end: new Date("June 15 2020"),
      institution: "Coursera",
    },
    {
      name: "Computer Programming 1",
      ...au2018,
      institution: "William Mason High School"
    },
    {
      name: "Computer Programming 2",
      ...au2019,
      institution: "William Mason High School"
    },
    {
      name: "Computer Programming 3",
      ...sp2019,
      institution: "William Mason High School"
    },
    {
      name: "Software 1",
      ...au2022,
      institution: "The Ohio State University",
    },
    {
      name: "Software 2",
      ...sp2023,
      institution: "The Ohio State University",
    },
    {
      name: "Foundations 1",
      ...sp2023,
      institution: "The Ohio State University",
    },
    {
      name: "Foundations 2",
      ...au2023,
      institution: "The Ohio State University",
    },
    {
      name: "Systems 1",
      ...au2023,
      institution: "The Ohio State University",
    },
    {
      name: "Systems 2",
      ...sp2024,
      institution: "The Ohio State University",
    },
    {
      name: "Intro Database",
      ...sp2024,
      institution: "The Ohio State University",
    },
    {
      name: "Gamedev Project",
      ...sp2024,
      institution: "The Ohio State University",
    },
    {
      name: "Info Security",
      ...au2024,
      institution: "The Ohio State University"
    },
    {
      name: "Computer Game Animation",
      ...au2024,
      institution: "The Ohio State University"
    },
    {
      name: "Principles of Programming Languages",
      ...au2024,
      institution: "The Ohio State University"
    },
    {
      name: "Computer Networking",
      ...au2024,
      institution: "The Ohio State University"
    },
    {
      name: "Intro to AI",
      ...au2024,
      institution: "The Ohio State University"
    },
    {
      name: "Capstone: Gamedev",
      ...sp2025,
      institution: "The Ohio State University"
    },
    {
      name: "Realtime Rendering",
      ...sp2025,
      institution: "The Ohio State University"
    }
  ],
  projects: [
    {
      name: "Lunar Lock",
      link: "https://luketrenaman.itch.io/lunar-lock",
      type: "Game",
      platforms: ["Desktop"],
      description: "Escape from a lunar base in this fast paced, first person platformer.",
      start: sp2025.start,
      end: sp2025.end,
      thumbnail: "/thumbnails/lunar-lock.webp",
      alt: "The title graphic for 'Lunar Lock,' displaying a hand-drawn illustration of the moon shaped like a padlock next to the game's name against a starry sky."
    },
    {
      name: "Brain Food",
      link: "https://brainfoodgame.github.io/",
      type: "Game",
      platforms: ["Desktop"],
      description: "Build and launch burgers in a post-apocalyptic diner.",
      start: new Date("Mar 30 2020"),
      end: new Date("Mar 12 2022"),
      thumbnail: "/thumbnails/brain_food.webp",
      alt: "Pixel art of a rundown storefront named 'BRAIN FOOD,' featuring a large burger sign and a boarded-up window, in a post-apocalyptic or zombie setting."
    },
    // {
    //   name: "Mason Student Activities",
    //   ...studentActivities,
    //   link: "https://masonstudentactivities.github.io",
    //   repo: "https://github.com/masonstudentactivities/masonstudentactivities.github.io",
    //   type: "Web",
    //   platforms: ["Desktop", "Mobile"],
    //   description: "Volunteered at my school to redesign the student activities website.",
    //   thumbnail: "/thumbnails/site.webp",
    // },
    // {
    //   name: "INTERalliance",
    //   ...interalliance,
    //   link: "https://interalliance.org",
    //   type: "Web",
    //   platforms: ["Desktop", "Mobile"],
    //   description: "Worked at INTERalliance to implement a redesigned website.",
    //   thumbnail: "/thumbnails/ia_site.webp",
    // },
    {
      name: "Rotator",
      link: "/projects/rotator/index.html",
      repo: "https://github.com/luketrenaman/rotator",
      start: new Date("May 14 2021"),
      end: new Date("Dec 5 2021"),
      type: "Game",
      platforms: ["Desktop", "Mobile"],
      description: "A bullet hell where you control the bullets.",
      thumbnail: "/thumbnails/rotator.webp",
      alt: "The game Rotator, featuring a purple circle orbited by small orange triangles on a white background."
    },
    {
      name: "Snake Maze",
      link: "/projects/snakemaze/snakemaze/index.html",
      repo: "https://github.com/luketrenaman/snakemaze",
      start: new Date("Jul 27 2019"),
      end: new Date("Sep 14 2021"),
      description: "Snake, but a maze! Get the gems to escape.",
      type: "Game",
      platforms: ["Desktop"],
      thumbnail: "/thumbnails/snakemaze.webp",
      alt: "The title screen for the pixel-art game 'Snake Maze,' with a green snake winding through the letters."
    },
    {
      name: "Luketris",
      start: new Date("May 16 2019"),
      end: new Date("Sep 14 2021"),
      link: "/projects/luketris/index.html",
      repo: "https://github.com/luketrenaman/luketris/",
      description: "Tetris, but I’m the pieces!",
      type: "Game",
      platforms: ["Desktop"],
      thumbnail: "/thumbnails/luketris.webp",
      alt: "A graphic for Luketris, combining a person in a headstand with a Tetris-style red, yellow, and white grid."
    },
    {
      name: "Duck Souls",
      start: new Date("Aug 28 2021"),
      end: new Date("Aug 28 2021"),
      link: "/projects/ducksouls/index.html",
      repo: "https://github.com/luketrenaman/ducksouls",
      description: "A duck-like game featuring the amazing art of Gabe Salazar.",
      type: "Game",
      platforms: ["Desktop"],
      thumbnail: "/thumbnails/duck_souls.webp",
      alt: "The pixelated, gothic-style logo for the game 'Duck Souls' on a black background."
    },
    // TODO: add more accurate dates for archives
    {
      name: "Tandem",
      ...archives,
      end: new Date("Sept 25 2018"),
      link: "/projects/archives/tandem/index.html",
      repo: "https://github.com/archives/tandem",
      description: "A cooperative rhythm game featuring original music.",
      type: "Game",
      platforms: ["Desktop"],
      thumbnail: "/thumbnails/tandem.webp",
      alt: "A two-player rhythm game showing falling blocks on vertical lanes, keyboard inputs, and player scores."
    },
    {
      name: "Ukulele Chord Generator",
      ...archives,
      end: new Date("Dec 2 2018"),
      link: "/projects/archives/ukulele/index.html",
      repo: "https://github.com/archives/ukulele",
      description: "A useful utility for determining ukulele chord charts.",
      type: "Web",
      platforms: ["Desktop", "Mobile"],
      thumbnail: "/thumbnails/ukulele.webp",
      alt: "A musical chord diagram showing finger placements with colored dots on a dark fretboard."
    },
    {
      name: "Platformer Engine",
      link: "/projects/archives/2d/index.html",
      repo: "https://github.com/luketrenaman/archives/2d",
      ...archives,
      end: new Date("Dec 2 2018"),
      description: "A custom platformer engine with camera interpolation and physics.",
      type: "Game",
      platforms: ["Desktop"],
      thumbnail: "/thumbnails/platformer.webp",
      alt: "A minimalist platformer game showing a blue square character on orange and green platforms against a dark background."
    },
    {
      name: "Conway's Game",
      link: "/projects/archives/conway/index.html",
      repo: "https://github.com/luketrenaman/archives/conway",
      ...archives,
      end: new Date("Dec 2 2018"),
      description: "A small simulation of the Conway's Game Of Life simulation.",
      type: "Web",
      platforms: ["Desktop", "Mobile"],
      thumbnail: "/thumbnails/conways.webp",
      alt: "A random, static-like pattern of black and white pixels."
    },
    {
      name: "Space Glider",
      link: "/projects/archives/space_glider/index.html",
      repo: "https://github.com/luketrenaman/archives/space_glider",
      start: new Date("Dec 21, 2019"),
      end: new Date("Dec 31 2019"),
      description: "An experiment with developing 3D games",
      type: "Game",
      platforms: ["Desktop"],
      thumbnail: "/thumbnails/space_glider.webp",
      alt: "A 3D abstract scene showing a small, white and red character amidst a chaotic explosion of white spheres and cubes on a black background."
    },
    {
      name: "Portals Plugin",
      start: new Date("Jun 10 2019"),
      end: new Date("Jul 25 2019"),
      link: "https://github.com/luketrenaman/portals",
      description: "Minecraft plugin that allows the creation of portals that can connect to other players' portals",
      thumbnail: "/thumbnails/portals.webp",
      type: "Other",
      platforms: [],
      alt: "A Minecraft screenshot of a small obsidian portal in a stone cave, marked by a sign that reads '[Portal] TheCavern'."
    },
    // {
    //   name: "Cloud Keys",
    //   link: "https://github.com/luketrenaman/cloudkeys",
    //   description: "A realtime streaming service for MIDI keyboard performances.",
    //   ...cloudkeys,
    //   type: "Web",
    //   platforms: ["Desktop"],
    //   thumbnail: "/thumbnails/cloud_keys.webp",
    // },
    // {
    //   name: "Geofare",
    //   ...geofare,
    //   description: "Food bank map made for HooHacks 2022.",
    //   type: "Web",
    //   platforms: ["Desktop", "Mobile"],
    //   link: "https://geofare.github.io",
    //   repo: "https://github.com/geofare/geofare.github.io",
    //   thumbnail: "/thumbnails/geofare.webp",
    // },
    // {
    //   name: "Wage Worker of Wall Street",
    //   link: "https://ucstocks.github.io/",
    //   repo: "https://github.com/ucstocks/ucstocks.github.io",
    //   type: "Game",
    //   platforms: ["Desktop"],
    //   description: "Financial literacy simulator to teach kids about stocks",
    //   thumbnail: "/thumbnails/wahoo_finance.webp",
    //   ...wwww,
    // },
    // {
    //   name: "Minesweeper",
    //   start: new Date("Nov 16, 2022"),
    //   end: new Date("Jan 3 2023"),
    //   link: "https://luketrenaman.com/minesweeper",
    //   description: "Clone of the popular game minesweeper",
    //   type: "Web",
    //   platforms: ["Desktop"],
    // },
    // {
    //   name: "Mirage opmodes",
    //   start: new Date("Dec 11 2021"),
    //   end: new Date("Feb 21 2022"),
    //   link: "https://github.com/luketrenaman/mirage-opmodes/",
    //   description: "I was on a robotics team for a bit",
    //   type: "Other",
    //   platforms: [],
    // },
  ],
  contests: [
    {
      name: "CincyHacks",
      start: new Date("Jan 25 2020"),
      end: new Date("Jan 26 2020"),
      link: {
        name: "Forgotten Curse",
        url: "https://devpost.com/software/forgotten-curse"
      },
      awards: ["Runner Up for Best Game"],
    },
    {
      name: "CincyHacks",
      start: new Date("Sep 22 2018"),
      end: new Date("Sep 23 2018"),
      awards: [],
    },
    {
      name: "HackCincinnati",
      ...cloudkeys,
      link: {
        name: "Cloud Keys",
        url: "https://devpost.com/software/cloud-keys"
      },
      awards: ["Best Startup Award Winner"],
    },
    {
      name: "Hoohacks",
      ...geofare,
      start: new Date("Mar 26 2022"),
      end: new Date("Mar 27 2022"),
      link: {
        name: "GeoFare",
        url: "https://geofare.github.io/"
      },
      awards: [],
    },
    {
      name: "RevUC",
      ...wwww,
      start: new Date("Feb 26 2022"),
      end: new Date("Feb 27 2022"),
      link: {
        name: "Wage Worker of Wall Street",
        url: "https://devpost.com/software/the-wage-worker-of-wall-street"
      },
      awards: ["Fifth Third - deFINe Award Winner"],
    },
    {
      name: "HACK OHI/O",
      start: new Date("October 8 2022"),
      end: new Date("October 9 2022"),
      link: {
        name: "Square One",
        url: "https://github.com/hackiolearning/hackiolearning.github.io",
      },
      awards: [],
    },
    {
      name: "Code For Good",
      start: new Date("November 3 2023"),
      end: new Date("November 4 2023"),
      awards: ["Winner (Future Ready Five)"],
    },
    {
      name: "Buckeye Programming Competition",
      start: new Date("October 28 2022"),
      end: new Date("October 30 2022"),
      awards: ["First Place (OSU Division)"],
      link: {
        name: "Solutions",
        url: "https://github.com/luketrenaman/BPC",
      },
    },
    {
      name: "BuckeyeCTF",
      start: new Date("September 29 2023"),
      end: new Date("October 1 2023"),
      link: {
        name: "Solutions",
        url: "https://github.com/luketrenaman/bctf-2023"
      },
      awards: ["First Place (OSU Division)"],
    },
    {
      name: "Arcade of Code",
      start: new Date("September 23 2023"),
      end: new Date("September 23 2023"),
      awards: ["Code Golf Minigame Winner","Second Place (Overall)"],
    },
    {
      name: "BuckeyeCTF",
      start: new Date("September 27 2024"),
      end: new Date("September 29 2024"),
      awards: ["Third Place (OSU Division)"]
    }
  ],
  jobs: [
    {
      name: "Fiverr",
      title: "Freelance Web Developer",
      location: "Mason, Ohio, United States",
      description: [
        "Handle client requests, communicate professionally and efficiently",
        "Complete a total of 17 gigs with 12 different clients"
      ],
      start: new Date("Aug 2018"),
      end: new Date("Aug 2020"),
    },
    {
      name: "William Mason High School",
      title: "Lead Web Devleopment Intern",
      location: "Mason, Ohio, United States",
      description: [
        "Lead a team of two students, a designer and a developer",
        "Use web development technologies to develop a custom website (masonstudentactivities.github.io), usable by two schools, and 100+ clubs",
        "Set up a Content Management System for clients to quickly update the website",
      ],
      start: new Date("Sep 2021"),
      end: new Date("May 2022"),
    },
    {
      name: "The INTERalliance of Greater Cincinnati",
      title: "Frontend Web Development Intern",
      location: "Cincinnati, Ohio, United States",
      description: [
        "Work on a team of 5 to rebuild Interalliance’s Wordpress site (interalliance.org)",
        "Optimize website to reduce load times by more than 50%, enforce ADA guidelines",
        "Implement more than 20 custom designs from our team’s UX Designer, with reusable components and documentation for future developers",
      ],
      start: new Date("Jun 2022"),
      end: new Date("Aug 2022"),
    },
    // TODO: add bullet points for KV
    {
      name: "Kinetic Vision",
      title: "Software Development Co-op",
      location: "Evendale, Ohio, United States",
      description: [],
      start: new Date("May 2023"),
      end: new Date("Dec 2023"),
    }
  ]
};
