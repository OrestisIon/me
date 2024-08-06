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

  console.log(line)

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
          profile.about = "I'm a final-year Computer Science student brimming with enthusiasm and a strong technical foundation. My academic journey has been an exhilarating exploration of algorithms, data structures, and software engineering, but what truly ignites my passion is the art of coding and the relentless pursuit of innovation. Collaborating with diverse teams on projects has not only sharpened my technical skills but also enhanced my ability to communicate effectively. I'm actively seeking opportunities to contribute to innovative projects, combining my technical expertise with a commitment to making a transformative impact through technology. Welcome to my portfolio, where I showcase my passion, curiosity, and dedication to excellence. Let's embark on this exciting journey of tech exploration and professional growth together!";
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
          profile["pproject"] = "https://github.com/OrestisIon/FeedGPT";
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
