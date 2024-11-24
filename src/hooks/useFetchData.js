import { useState, useEffect } from 'react';
import logger from '../utils/logger';

export const useFetchData = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        logger.info('Fetching data...');
        const response = await apiCall();
        setData(response);
      } catch (err) {
        logger.error('Error fetching data', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiCall]);

  return { data, loading, error };
};
