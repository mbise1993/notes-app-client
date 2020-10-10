import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { Home } from './containers/Home';
import { NotFound } from './containers/NotFound';

import './App.css';
import { SignIn } from './containers/SignIn';
import { AppContext } from './state/appContext';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);

  React.useEffect(() => {
    const authenticate = async () => {
      try {
        await Auth.currentSession();
        setIsAuthenticated(true);
      } catch (e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }

      setIsAuthenticating(false);
    };

    authenticate();
  }, []);

  const handleSignOut = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    !isAuthenticating && (
      <div className="app container">
        <Navbar collapseOnSelect bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {isAuthenticated ? (
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              ) : (
                <>
                  <Nav.Link onClick={() => navigate('/sign-up')}>
                    Sign Up
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate('/sign-in')}>
                    Sign In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
