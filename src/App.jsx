import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ErrorBoundaryFallback } from './common/Elements';
import { HomePage } from './components/homePage';
import { NavigationBar } from './components/navigationBar';

function App() {
  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path='/' component={<HomePage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;
