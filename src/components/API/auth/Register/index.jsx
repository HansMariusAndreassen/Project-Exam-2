import { useEffect, useState } from "react";

const useRegister = (method, url, body = null) => {
  const baseUrl = "https://v2.api.noroff.dev/";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrl + url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [method, url, body]);
  return { loading, error, data };
};

export default useRegister;
