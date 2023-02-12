import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundaryFallback } from './common/Elements';
import AppLayout from './components/appLayout.jsx';

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
