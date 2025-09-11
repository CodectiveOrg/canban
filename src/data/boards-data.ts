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
            description: "",
            dueDate: "",
          },
          {
            id: "item-2",
            title: "Implement Search Page",
            description: "",
            dueDate: "",
          },
          {
            id: "item-3",
            title: "Navbar Component",
            description: "",
            dueDate: "",
          },
          {
            id: "item-4",
            title: "Toaster Provider",
            description: "",
            dueDate: "",
          },
          {
            id: "item-5",
            title: "Carousel Component",
            description: "",
            dueDate: "",
          },
          { id: "item-6", title: "User API", description: "", dueDate: "" },
        ],
      },
      {
        id: "list-2",
        title: "🔨 Doing",
        items: [
          { id: "item-7", title: "Root Layout", description: "", dueDate: "" },
          {
            id: "item-8",
            title: "Icon Component",
            description: "",
            dueDate: "",
          },
          {
            id: "item-9",
            title: "Authentication",
            description: "",
            dueDate: "",
          },
          {
            id: "item-10",
            title: "Design Landing Page",
            description: "",
            dueDate: "",
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
            description: "",
            dueDate: "",
          },
          {
            id: "item-12",
            title: "Setup Frontend Project",
            description: "",
            dueDate: "",
          },
          {
            id: "item-13",
            title: "Setup Backend Project",
            description: "",
            dueDate: "",
          },
          { id: "item-14", title: "Typography", description: "", dueDate: "" },
          { id: "item-15", title: "Colors", description: "", dueDate: "" },
          {
            id: "item-16",
            title: "Setup API Connection",
            description: "",
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
    color: "gray",
    lists: [],
  },
  {
    id: "board-3",
    title: "Personal Goals",
    description: "Organize personal or professional goals into small tasks.",
    color: "yellow",
    lists: [],
  },
];
