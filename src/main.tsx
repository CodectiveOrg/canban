import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import "./styles/colors.css";
import "./styles/shadows.css";
import "./styles/shapes.css";
import "./styles/typography.css";

createRoot(document.getElementById("root")!).render(<App />);
