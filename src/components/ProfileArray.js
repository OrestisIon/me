import { useState, useEffect } from "react";

const parseProfile = (mdContent) => {
  const profile = {
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "orestisj@gmail.com",
    logo: "",
  };

  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

  // console.log(line)

    if (line.startsWith("## ")) {
      const section = line.substr(3).trim();

      switch (section) {
        case "Header":
          profile.headerName = lines[++i].substr(2).trim();
          profile.headerName = "Hi, my name is Orestis"
          profile.headerRole = lines[++i].substr(2).trim();
          profile.headerDesc = lines[++i].substr(2).trim();
          break;
        case "About":
          profile.about = lines[++i].trim();
          profile.about = "Software Engineer at Thought Machine, working on cloud-native core banking infrastructure used by leading financial institutions worldwide. I graduated with a First Class BSc in Computer Science from the University of Warwick, where I built a strong foundation across software engineering, algorithms, systems programming, and cyber security. I enjoy working across the stack — from distributed systems and infrastructure to full-stack features — and thrive in environments where engineering decisions have real impact at scale.";
          break;
        case "Contact":
          profile.contact = lines[++i].trim();
          const contactLinks = ["LinkedIn", "GitHub", "Email"];
          for (const link of contactLinks) {
            const linkLine = lines[++i].substr(2).trim();
            if (linkLine.startsWith(link)) {
              profile[link.toLowerCase()] = linkLine.split(": ")[1].trim();
            }
          }
          profile["linkedin"] = "https://www.linkedin.com/in/orestis-iona-cs/";
          profile["email"] = "orestisj@gmail.com";
          profile["github"] = "https://github.com/OrestisIon";
          profile["project"] = "https://github.com/OrestisIon/FeedGPT";
          break;
        case "Logo":
          profile.logo = lines[++i].substr(2).trim();
          break;
        default:
          // do nothing
          break;
      }
    }
  }

  return profile;
};

const ProfileArray = () => {
  const [profile, setProfile] = useState({
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "",
    logo: "",
  });

  useEffect(() => {
    fetch("/content/Profile.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setProfile(parseProfile(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return profile;
};

export default ProfileArray;
