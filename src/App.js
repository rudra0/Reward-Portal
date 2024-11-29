import React from 'react';
import { useFetchData } from './hooks/useFetchData';
import LoadingIndicator from './components/loadingIndicator';
import ErrorMessage from './components/errorMessage';
import RewardPortalPage from './pages/rewardPortalPage';
import { fetchTransactions } from './service/api';

const App = () => {
  const { data, loading, error } = useFetchData(fetchTransactions);

  if (loading) return <LoadingIndicator />;
  if (!data || data.length === 0 || error) return <ErrorMessage />;

  return (
    <div className="App">
      <RewardPortalPage data={data || []} />
    </div>
  );
};

export default App;
