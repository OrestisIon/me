import React from 'react';
import './App.css';
import Nav from './components/NavBar';
import Header from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hobbies from './components/Hobbies';
// import Thee from './components/Thee';

function App() {
  // Available Colours:
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow

  // edit this variable to change the color theme
  const color = "purple";

  return (
    <>
      <Nav color={color} />
      {/* <Thee color={color} /> */}
      <Header color={color} />
      <About color={color} />
      <TechStack color={color} />
      <Projects color={color} />
      <Hobbies color={color} />
      <Contact color={color} />
      <Footer />
    </>
  );
}



export default App;
