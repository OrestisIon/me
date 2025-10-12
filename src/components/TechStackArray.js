import { useState, useEffect } from "react";

const parseTechStack = (mdContent) => {
  const techStack = [];
  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const name = line.substr(3).trim();
      const imageLine = lines[++i];
      const image = imageLine.match(/!\[(.*)\]\((.*)\)/)[2];
      const category = lines[++i].split(":")[1].trim();

      techStack.push({
        name,
        image,
        category,
      });
    }
  }

  return techStack;
};

const TechStackArray = () => {
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    fetch("/content/TechStack.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setTechStack(parseTechStack(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return techStack;
};

export default TechStackArray;
