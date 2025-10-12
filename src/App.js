import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/NavBar';
import Header from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hobbies from './components/Hobbies';
import AccessControl from './components/AccessControl';
import AdminPanel from './components/AdminPanel';
import { getCurrentUser, logout } from './utils/accessStorage';
// import Thee from './components/Thee';

function App() {
  // Available Colours:
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow

  // edit this variable to change the color theme
  const color = "purple";

  const [currentUser, setCurrentUser] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleAccessGranted = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setShowAdminPanel(false);
  };

  const handleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  // Show access control if no user is logged in
  if (!currentUser) {
    return <AccessControl onAccessGranted={handleAccessGranted} color={color} />;
  }

  // Show admin panel if requested
  if (showAdminPanel) {
    return <AdminPanel color={color} onClose={() => setShowAdminPanel(false)} />;
  }

  return (
    <>
      <Nav
        color={color}
        currentUser={currentUser}
        onLogout={handleLogout}
        onAdminPanel={handleAdminPanel}
      />
      {/* <Thee color={color} /> */}
      <Header color={color} />
      <About color={color} />
      <TechStack color={color} />
      <Experience color={color} />
      <Projects color={color} />
      <Hobbies color={color} />
      <Contact color={color} />
      <Footer />
    </>
  );
}



export default App;
