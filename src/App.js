import React from 'react';
import { useFetchData } from './hooks/useFetchData';
import { transactions } from './data/sampleData';
import LoadingIndicator from './components/loadingIndicator';
import ErrorMessage from './components/errorMessage';
import RewardPortalPage from './pages/rewardPortalPage';

const App = () => {
  const mockApiCall = () => new Promise((resolve) => setTimeout(() => resolve(transactions), 1000));

  const { data, loading, error } = useFetchData(mockApiCall);

  if (loading) return <LoadingIndicator />;
  if (!data || data.length === 0 || error) return <ErrorMessage />;

  return (
    <div className="App">
      <RewardPortalPage data={data || []} />
    </div>
  );
};

export default App;
