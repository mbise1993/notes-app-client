import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import { Home } from './containers/Home';
import { NotFound } from './containers/NotFound';

import './App.css';
import { SignIn } from './containers/SignIn';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app container">
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => navigate('/sign-up')}>Sign Up</Nav.Link>
            <Nav.Link onClick={() => navigate('/sign-in')}>Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
