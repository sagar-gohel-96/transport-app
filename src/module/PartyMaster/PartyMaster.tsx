import { Box } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { Table } from './components';
import axios from 'axios';

export const PartyMaster = () => {
  const [userData, setUserData] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setUserData(data);
    })();
  }, [fetchData]);

  return (
    <Box>
      <Table data={userData} />
    </Box>
  );
};
