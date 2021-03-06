import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import { Home } from './containers/Home';
import { NotFound } from './containers/NotFound';
import { SignIn } from './containers/SignIn';
import { AppContext } from './state/appContext';
import { Errors } from './utils/errors';
import { SignUp } from './containers/SignUp';
import { NewNote } from './containers/NewNote';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { UnauthenticatedRoute } from './components/UnauthenticatedRoute';

import './App.css';
import { Note } from './containers/Note';

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
          Errors.handle(e);
        }
      }

      setIsAuthenticating(false);
    };

    authenticate();
  }, []);

  const handleSignOut = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
    navigate('/sign-in');
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
            <AuthenticatedRoute path="/">
              <Home />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/notes/new">
              <NewNote />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/notes/:id">
              <Note />
            </AuthenticatedRoute>

            <UnauthenticatedRoute path="/sign-in">
              <SignIn />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/sign-up">
              <SignUp />
            </UnauthenticatedRoute>

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
