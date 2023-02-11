import { ErrorBoundary } from 'react-error-boundary';

import './App.css';
import useGetItem from './api/useGetItem';
import { ErrorBoundaryFallback } from './common/Elements';

function App() {
  const id = 'ZmGrkLRPXOTpxsU4jjAc';
  const { data, isSuccess } = useGetItem(id);
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <div className='App'>
        <div className='card'>
          {isSuccess && data && console.log(data)}
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className='read-the-docs'>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </ErrorBoundary>
  );
}

export default App;
