import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './utils/routes';
import EmailContextContainer, { EmailContext } from './context/EmailContextContainer';
import "./styles.css";

export default function App() {
  return (
    <Router basename={''}>
      <EmailContextContainer>
        <EmailContext.Consumer>
          {(loginContext) => (<PublicRoutes />)}
        </EmailContext.Consumer>
      </EmailContextContainer>
    </Router>
  );
}
