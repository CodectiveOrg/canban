import type { BoardType } from "@/types/board.ts";

export const boardsData: BoardType[] = [
  {
    id: "board-1",
    title: "Sprint Tasks",
    description:
      "A board to keep track of the team's work during each sprint. Tasks move from To Do through In Progress until they reach Done.",
    color: "blue",
    lists: [
      {
        id: "list-1",
        title: "🔜 To Do",
        items: [
          {
            id: "item-1",
            title: "Implement Landing Page",
            description: "Build hero, features, and footer for marketing site.",
            dueDate: "2025-09-20",
          },
          {
            id: "item-2",
            title: "Implement Search Page",
            description: "Create search UI and data fetching for results page.",
            dueDate: "2025-09-27",
          },
          {
            id: "item-3",
            title: "Navbar Component",
            description:
              "Reusable navigation with responsive menu and active states.",
            dueDate: "",
          },
          {
            id: "item-4",
            title: "Toaster Provider",
            description:
              "Global toast notifications with variants and queueing.",
            dueDate: "",
          },
          {
            id: "item-5",
            title: "Carousel Component",
            description: "Image slider with autoplay and swipe gestures.",
            dueDate: "",
          },
          {
            id: "item-6",
            title: "User API",
            description: "Define CRUD endpoints and types for users.",
            dueDate: "",
          },
        ],
      },
      {
        id: "list-2",
        title: "🔨 Doing",
        items: [
          {
            id: "item-7",
            title: "Root Layout",
            description: "Scaffold shell, header, and main content regions.",
            dueDate: "",
          },
          {
            id: "item-8",
            title: "Icon Component",
            description: "Generic icon wrapper with size and color props.",
            dueDate: "",
          },
          {
            id: "item-9",
            title: "Authentication",
            description: "Login, register, and session handling with tokens.",
            dueDate: "2025-09-18",
          },
          {
            id: "item-10",
            title: "Design Landing Page",
            description: "Wireframe and UI kit for landing sections.",
            dueDate: "2025-09-22",
          },
        ],
      },
      {
        id: "list-3",
        title: "🎉 Done",
        items: [
          {
            id: "item-11",
            title: "Find a Good Name for the Project",
            description: "Brainstorm and shortlist memorable names.",
            dueDate: "",
          },
          {
            id: "item-12",
            title: "Setup Frontend Project",
            description: "Initialize project with Vite, TS, and ESLint.",
            dueDate: "",
          },
          {
            id: "item-13",
            title: "Setup Backend Project",
            description: "Set up service skeleton and folder structure.",
            dueDate: "",
          },
          {
            id: "item-14",
            title: "Typography",
            description: "Type scale and font pairing established.",
            dueDate: "",
          },
          {
            id: "item-15",
            title: "Colors",
            description: "Color palette and semantic tokens added.",
            dueDate: "",
          },
          {
            id: "item-16",
            title: "Setup API Connection",
            description: "HTTP client and base URL configured.",
            dueDate: "",
          },
        ],
      },
    ],
  },
  {
    id: "board-2",
    title: "Content Calendar",
    description:
      "Plan and manage posts, blogs, or videos ahead of time. Items flow from Idea to Draft and finally to Published for a smooth content pipeline.",
    color: "green",
    lists: [
      {
        id: "list-4",
        title: "💡 Idea",
        items: [
          {
            id: "item-17",
            title: "September blog ideas",
            description: "Collect topics for September posts.",
            dueDate: "",
          },
          {
            id: "item-18",
            title: "Q4 video series concept",
            description: "Outline theme and episode ideas.",
            dueDate: "",
          },
          {
            id: "item-19",
            title: "Interview guest shortlist",
            description: "List potential guests and contact info.",
            dueDate: "2025-10-01",
          },
          {
            id: "item-20",
            title: "SEO pillar topics",
            description: "Define 3-5 pillar pages to target.",
            dueDate: "",
          },
        ],
      },
      {
        id: "list-5",
        title: "✍️ Draft",
        items: [
          {
            id: "item-21",
            title: "How to use our Kanban app",
            description: "Write first draft with screenshots.",
            dueDate: "",
          },
          {
            id: "item-22",
            title: "Newsletter #12",
            description: "Draft copy and CTA.",
            dueDate: "",
          },
          {
            id: "item-23",
            title: "YouTube script: Productivity tips",
            description: "Script intro and key points.",
            dueDate: "2025-09-25",
          },
        ],
      },
      {
        id: "list-6",
        title: "📢 Published",
        items: [
          {
            id: "item-24",
            title: "Blog: Getting started guide",
            description: "Published on docs and blog.",
            dueDate: "",
          },
          {
            id: "item-25",
            title: "Tweet thread: Release notes",
            description: "Posted with visuals.",
            dueDate: "",
          },
          {
            id: "item-26",
            title: "Case study: Team Alpha",
            description: "Edited and live on site.",
            dueDate: "",
          },
        ],
      },
    ],
  },
  {
    id: "board-3",
    title: "Personal Goals",
    description: "Organize personal or professional goals into small tasks.",
    color: "yellow",
    lists: [
      {
        id: "list-7",
        title: "🔜 To Do",
        items: [
          {
            id: "item-27",
            title: "Set weekly fitness plan",
            description: "Plan 3 workouts and stretch sessions.",
            dueDate: "",
          },
          {
            id: "item-28",
            title: "Read one book",
            description: "Choose title and reading schedule.",
            dueDate: "",
          },
          {
            id: "item-29",
            title: "Start savings tracker",
            description: "Set monthly goal and sheet.",
            dueDate: "",
          },
          {
            id: "item-30",
            title: "Learn TypeScript generics",
            description: "Study patterns and practice tasks.",
            dueDate: "2025-10-05",
          },
        ],
      },
      {
        id: "list-8",
        title: "🔨 Doing",
        items: [
          {
            id: "item-31",
            title: "Morning routine",
            description: "Track wake time and journaling.",
            dueDate: "",
          },
          {
            id: "item-32",
            title: "Online course: React",
            description: "Complete hooks and context modules.",
            dueDate: "",
          },
          {
            id: "item-33",
            title: "Meal prep",
            description: "Prepare lunches for weekdays.",
            dueDate: "",
          },
        ],
      },
      {
        id: "list-9",
        title: "🎉 Done",
        items: [
          {
            id: "item-34",
            title: "Declutter workspace",
            description: "Clean desk and organize cables.",
            dueDate: "",
          },
          {
            id: "item-35",
            title: "Set personal OKRs",
            description: "Define 3 objectives for the quarter.",
            dueDate: "",
          },
          {
            id: "item-36",
            title: "Plan weekend hike",
            description: "Choose trail and invite friends.",
            dueDate: "",
          },
        ],
      },
    ],
  },
];
