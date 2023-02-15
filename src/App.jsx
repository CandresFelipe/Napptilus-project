import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './components/appLayout.jsx';
import { ErrorBoundaryFallback } from './utils/errors';

function App() {
  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Router>
          <AppLayout />
        </Router>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;
