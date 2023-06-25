import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiData = (url, method, bodyData = null, params = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response;

        if (method === 'GET') {
          response = await axios.get(url, { params });
        } else if (method === 'POST') {
          response = await axios.post(url, bodyData);
        } else if (method === 'PUT') {
          response = await axios.put(url, bodyData);
        } else if (method === 'DELETE') {
          response = await axios.delete(url);
        }

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, bodyData, params]);

  return { data, isLoading, error };
};

export default useApiData;










// import { useState, useEffect } from 'react';

// const useApiData = (url, method, bodyData = null, params = null) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         let response;

//         if (method === 'GET') {
//           response = await fetch(url, { params });
//         } else {
//           response = await fetch(url, {
//             method,
//             body: JSON.stringify(bodyData),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//         }

//         if (!response.ok) {
//           throw new Error('Request failed');
//         }

//         const responseData = await response.json();
//         setData(responseData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [url, method, bodyData, params]);

//   return { data, isLoading, error };
// };

// export default useApiData;
