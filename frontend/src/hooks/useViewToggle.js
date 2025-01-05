import { useState } from "react";

const useViewToggle = (initialView = "users") => {
  const [view, setView] = useState(initialView);

  const toggleView = (newView) => setView(newView);

  return { view, toggleView };
};

export default useViewToggle;
