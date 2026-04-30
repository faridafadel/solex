import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HashScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return null;
};

export default HashScrollHandler;
