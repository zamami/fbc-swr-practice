import { useState, useEffect } from "react";
import useSWR from "swr";
import "./App.css";

const headers = { Accept: "application/json" };
const fetcher = async (url) => {
  const res = await fetch(url, { headers });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const { data, error, isLoading } = useSWR(url, fetcher);

  const [status, setStatus] = useState("");
  useEffect(() => {
    if (data) {
      setStatus(data.description);
    }
  }, [data]);

  if (error)　{
    return (
        <>
          <p>Failed to load.</p>
        </>
    );
  }

  if (isLoading) {
    return (
        <>
          <p>Loading...</p>
        </>
    );
  }

  return <>{status && <p>Status : {status}</p>}</>;
}

export default App;

// まずはSWRを使う
