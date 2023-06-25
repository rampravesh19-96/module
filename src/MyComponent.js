import React, { useState, useEffect } from 'react';
import useApiData from './useApiData';

const MyComponent = () => {
  const [apiData, setApiData] = useState(null);
  const { data, isLoading, error } = useApiData('https://jsonplaceholder.typicode.com/posts', 'GET', null, null);

  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the component using the fetched data (apiData)

  return (
    <div>
      {/* Render the fetched data */}
      {console.log(apiData)}
    </div>
  );
};

export default MyComponent;
