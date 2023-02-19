import { ThemeProvider } from '@mui/material';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './components/appLayout.jsx';
import { ErrorBoundaryFallback } from './utils/errors';
import theme from './utils/styles/theme';

function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                    <Router>
                        <AppLayout />
                    </Router>
                </ErrorBoundary>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
