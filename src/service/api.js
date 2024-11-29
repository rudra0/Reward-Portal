import axios from 'axios';

export const fetchTransactions = async () => {
  const response = await axios.get('/data/sampleData.json');
  console.log(response, "my response")
  return response.data;
};