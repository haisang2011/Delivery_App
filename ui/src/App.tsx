import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface User {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(
    () => {
      (async () => {
        setLoading(true);
        try {
          const data = await fetch('http://localhost:8888/user/api/user', { method: 'GET' });
          const result = await data.json();
          setUsers(result);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    },
    []
  )

  if (loading) return (<div>Loading...</div>);

  if (error) return <div>Has Error while fetch users</div>;

  return users.map(user => <div>
    {JSON.stringify(user)}
  </div>)
}

export default App
