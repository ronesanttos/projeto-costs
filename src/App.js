import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from './componentes/pages/Home'
import Project from "./componentes/pages/Project";
import Company from './componentes/pages/Company'
import Contact from './componentes/pages/Contact'
import Newproject from './componentes/pages/Newproject'
import EditProject from "./componentes/pages/EditProject";

import Container from "./componentes/layout/Container";
import Navbar from './componentes/layout/Navbar'
import Footer from "./componentes/layout/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route element={<Home />} exact path="/" />
          <Route element={<Project />} path="/projects" />
          <Route element={<Company />} path="/company" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Newproject />} path="/newproject" />
          <Route element={<EditProject />} path="/editproject/:id" />
        </Routes>
      </Container>
      <Footer />
    </Router>

  );
}

export default App;

// iniciar npm start
// depois npm run back-end