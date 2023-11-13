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
}
export interface Contest extends Timeline {
    link?: string;
    award?: string;
    description?: string;
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
}
const cloudkeys = {
    start: new Date("Jun 20 2019"),
    end: new Date("Jul 21 2019"),
}
const wwww = {
    start: new Date("Feb 26 2022"),
    end: new Date("Feb 27 2022"),
}

// Jobs with projects
const studentActivities = {
    start: new Date("Sep 2021"),
    end: new Date("May 2022"),
}
const interalliance = {
    start: new Date("Jun 2022"),
    end: new Date("Aug 2022"),
}

// Dates were lost for archives projects (they were retrieved from my filesystem before using Git)
// This is just the timeframe in which projects have been added to archives
const archives = {
    start: new Date("Jan 1 2018"),
}

// TODO: add correct timelines for school semesters
const au2018 = {
    start: new Date("Aug 17 2018"),
    end: new Date("Dec 20 2018"),
};
const au2019 = {
    start: new Date("Aug 17 2019"),
    end: new Date("Dec 20 2019"),
};;
const sp2019 = {
    start: new Date("Jan 3 2019"),
    end: new Date("May 30 2019"),
};;
const au2022 = {
    start: new Date("Aug 23 2022"),
    end: new Date("December 14 2022"),
};;
const sp2023 = {
    start: new Date("Jan 9 2023"),
    end: new Date("May 2 2023"),
};;
const au2023 = {
    start: new Date("Aug 22 2022"),
    end: new Date("December 15 2022"),
};;
export const resume: Resume = {
    courses: [
        {
            name: "Project Euler",
            start: new Date("Oct 7 2021"),
            end: new Date("Dec 27 2021"),
            institution: "https://projecteuler.net/"
        },
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

    ],
    projects: [
        {
            name: "Brain Food",
            link: "https://brainfoodgame.github.io/",
            type: "Game",
            platforms: ["Desktop"],
            description: "Build and launch burgers in a post-apocalyptic diner.",
            start: new Date("Mar 30 2020"),
            end: new Date("Mar 12 2022"),
            thumbnail: "thumbnails/brain_food.png",
        },
        {
            name: "Brain Food Wave Editor",
            link: "https://luketrenaman.com/wave_editor",
            type: "Other",
            repo: "https://github.com/luketrenaman/wave_editor",
            platforms: ["Desktop"],
            description: "Wave editor for brain food",
            start: new Date("Jun 30 2020"),
            end: new Date("Jan 13, 2021"),
        },
        {
            name: "Mason Student Activities",
            ...studentActivities,
            link: "https://masonstudentactivities.github.io",
            repo: "https://github.com/masonstudentactivities/masonstudentactivities.github.io",
            type: "Web",
            platforms: ["Desktop", "Mobile"],
            description: "Volunteered at my school to redesign the student activities website.",
            thumbnail: "thumbnails/site.png",
        },
        {
            name: "INTERalliance",
            ...interalliance,
            link: "https://interalliance.org",
            type: "Web",
            platforms: ["Desktop", "Mobile"],
            description: "Worked at INTERalliance to implement a redesigned website.",
            thumbnail: "thumbnails/ia_site.png",
        },
        {
            name: "Rotator",
            link: "https://luketrenaman.com/rotator",
            repo: "https://github.com/luketrenaman/rotator",
            start: new Date("May 14 2021"),
            end: new Date("Dec 5 2021"),
            type: "Game",
            platforms: ["Desktop", "Mobile"],
            description: "A bullet hell where you control the bullets.",
            thumbnail: "thumbnail/rotator.png",
        },
        {
            name: "Snake Maze",
            link: "https://luketrenaman.com/snakemaze/snakemaze/",
            repo: "https://github.com/luketrenaman/snakemaze",
            start: new Date("Jul 27 2019"),
            end: new Date("Sep 14 2021"),
            description: "Snake, but a maze! Get the gems to escape.",
            type: "Game",
            platforms: ["Desktop"],
            thumbnail: "thumbnail/snakemaze.png",
        },
        {
            name: "Snake Maze Editor",
            start: new Date("Jul 27 2019"),
            end: new Date("Sep 14 2021"),
            link: "https://luketrenaman.com/snakemaze/mazemake/",
            repo: "https://github.com/luketrenaman/snakemaze/",
            description: "Level editor for snake maze.",
            type: "Game",
            platforms: ["Desktop"],
        },
        {
            name: "Luketris",
            start: new Date("May 16 2019"),
            end: new Date("Sep 14 2021"),
            link: "https://luketrenaman.com/luketris/",
            repo: "https://github.com/luketrenaman/luketris/",
            description: "Tetris, but I’m the pieces!",
            type: "Game",
            platforms: ["Desktop"],
            thumbnail: "thumbnail/luketris.png",
        },
        {
            name: "Duck Souls",
            start: new Date("Aug 28 2021"),
            end: new Date("Aug 28 2021"),
            link: "https://luketrenaman.com/ducksouls/",
            repo: "https://github.com/luketrenaman/ducksouls",
            description: "A souls-like game featuring the amazing art of Gabe Salazar.",
            type: "Game",
            platforms: ["Desktop"],
            thumbnail: "thumbnail/duck_souls.png",
        },
        // TODO: add more accurate dates for archives
        {
            name: "Tandem",
            ...archives,
            end: new Date("Sept 25 2018"),
            link: "https://luketrenaman.com/archives/tandem",
            repo: "https://github.com/archives/tandem",
            description: "A cooperative rhythm game featuring original music.",
            type: "Game",
            platforms: ["Desktop"],
            thumbnail: "thumbnail/tandem.png",
        },
        {
            name: "Platformer Engine",
            link: "https://luketrenaman.com/archives/2d",
            repo: "https://github.com/luketrenaman/archives/2d",
            ...archives,
            end: new Date("Dec 2 2018"),
            description: "A custom platformer engine with camera interpolation and physics.",
            type: "Game",
            platforms: ["Desktop"],
            thumbnail: "thumbnail/platformer.png",
        },
        {
            name: "Conway's Game",
            link: "https://luketrenaman.com/archives/conway",
            repo: "https://github.com/luketrenaman/archives/conway",
            ...archives,
            end: new Date("Dec 2 2018"),
            description: "A small simulation of the Conway's Game Of Life simulation.",
            type: "Web",
            platforms: ["Desktop", "Mobile"],
            thumbnail: "thumbnail/conways.png",
        },
        {
            name: "Space Glider",
            link: "https://luketrenaman.com/archives/space_glider",
            repo: "https://github.com/luketrenaman/archives/space_glider",
            start: new Date("Dec 21, 2019"),
            end: new Date("Dec 31 2019"),
            description: "An experiment with developing 3D games",
            type: "Game",
            platforms: ["Desktop"],

        },
        {
            name: "Portals Plugin",
            start: new Date("Jun 10 2019"),
            end: new Date("Jul 25 2019"),
            link: "https://github.com/luketrenaman/portals",
            description: "Minecraft plugin that allows the creation of portals that can connect to other players' portals",
            type: "Web",
            platforms: [],
        },
        {
            name: "Minesweeper",
            start: new Date("Nov 16, 2022"),
            end: new Date("Jan 3 2023"),
            link: "https://github.com/luketrenaman/minesweeper",
            description: "Clone of the popular game minesweeper",
            type: "Web",
            platforms: ["Desktop"],
        },
        {
            name: "Mirage opmodes",
            start: new Date("Dec 11 2021"),
            end: new Date("Feb 21 2022"),
            link: "https://github.com/luketrenaman/mirage-opmodes/",
            description: "I was on a robotics team for a bit",
            type: "Other",
            platforms: [],
        },
        {
            name: "Cloud Keys",
            link: "https://github.com/luketrenaman/cloudkeys",
            description: "A realtime streaming service for MIDI keyboard performances.",
            ...cloudkeys,
            type: "Web",
            platforms: ["Desktop"],
            thumbnail: "thumbnail/cloud_keys.png",
        },
        {
            name: "Geofare",
            ...geofare,
            description: "Food bank map made for HooHacks 2022.",
            type: "Web",
            platforms: ["Desktop", "Mobile"],
            link: "https://geofare.github.io",
            repo: "https://github.com/geofare/geofare.github.io",
            thumbnail: "thumbnail/geofare.png",
        },
        {
            name: "Wage Worker of Wall Street",
            link: "https://ucstocks.github.io/",
            repo: "https://github.com/ucstocks/ucstocks.github.io",
            type: "Web",
            platforms: ["Desktop"],
            description: "Financial literacy simulator to teach kids about stocks",
            ...wwww,
        },
    ],
    contests: [
        {
            name: "CincyHacks",
            start: new Date("Jan 25 2020"),
            end: new Date("Jan 26 2020"),
            link: "https://devpost.com/software/forgotten-curse",
            award: "Runner Up for Best Game",
        },
        {
            name: "CincyHacks",
            start: new Date("Sep 22 2018"),
            end: new Date("Sep 23 2018"),
        },
        {
            name: "HackCincinnati",
            ...cloudkeys,
            link: "https://devpost.com/software/cloud-keys",
            award: "Best Startup Award Winner"
        },
        {
            name: "Hoohacks",
            ...geofare,
            start: new Date("Mar 26 2022"),
            end: new Date("Mar 27 2022"),
            link: "https://geofare.github.io/",
        },
        {
            name: "RevUC",
            ...wwww,
            start: new Date("Feb 26 2022"),
            end: new Date("Feb 27 2022"),
            link: "https://devpost.com/software/the-wage-worker-of-wall-street",
            award: "Fifth Third - deFINe Award Winner"
        },
        {
            name: "HACK OHI/O",
            start: new Date("October 8 2022"),
            end: new Date("October 9 2022"),
            link: "https://github.com/hackiolearning/hackiolearning.github.io",
        },
        {
            name: "Code For Good",
            start: new Date("November 3 2022"),
            end: new Date("November 4 2022"),
            award: "Winner (Future Ready Five)",
        },
        {
            name: "Buckeye Programming Competition",
            start: new Date("October 28 2022"),
            end: new Date("October 30 2022"),
            award: "First Place (OSU Division)",
            link: "https://github.com/luketrenaman/BPC",
        },
        {
            name: "BuckeyeCTF",
            start: new Date("September 29 2023"),
            end: new Date("October 1 2023"),
            link: "https://github.com/luketrenaman/bctf-2023",
            award: "First Place (OSU Division)",
        },
        {
            name: "Arcade of Code",
            start: new Date("September 23 2023"),
            end: new Date("September 23 2023"),
            award: "Code Golf Minigame Winner",
        },
        {
            name: "Arcade of Code",
            start: new Date("September 23 2023"),
            end: new Date("September 23 2023"),
            award: "Second Place (Algorithms Contest)",
        },
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
}