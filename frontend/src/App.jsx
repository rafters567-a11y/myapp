import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ status: 'error' }));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '80px' }}>
      <h1>Hyyy, welcome to Multi Service App</h1>
      <p>API status: <strong>{data ? data.status : 'loading...'}</strong></p>
      {data && data.color && <p>Running on: <strong>{data.color}</strong> (build {data.version})</p>}
      {data && data.dbTime && <p>Database time: {data.dbTime}</p>}
    </div>
  );
}
