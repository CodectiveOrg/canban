import type { ListType } from "@/types/list.ts";

export const listsData: ListType[] = [
  {
    id: "list-1",
    title: "🔜 To Do",
    items: [
      { id: "item-1", title: "Implement Landing Page" },
      { id: "item-2", title: "Implement Search Page" },
      { id: "item-3", title: "Navbar Component" },
      { id: "item-4", title: "Toaster Provider" },
      { id: "item-5", title: "Carousel Component" },
      { id: "item-6", title: "User API" },
    ],
  },
  {
    id: "list-2",
    title: "🔨 Doing",
    items: [
      { id: "item-7", title: "Root Layout" },
      { id: "item-8", title: "Icon Component" },
      { id: "item-9", title: "Authentication" },
      { id: "item-10", title: "Design Landing Page" },
    ],
  },
  {
    id: "list-3",
    title: "🎉 Done",
    items: [
      { id: "item-11", title: "Find a Good Name for the Project" },
      { id: "item-12", title: "Setup Frontend Project" },
      { id: "item-13", title: "Setup Backend Project" },
      { id: "item-14", title: "Typography" },
      { id: "item-15", title: "Colors" },
      { id: "item-16", title: "Setup API Connection" },
    ],
  },
];
