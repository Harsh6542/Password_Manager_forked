import React, { useState, useCallback } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Form from './components/Form';
import Sites from './components/Sites';
import axios from 'axios'; 

function App() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSites = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000');
      setSites(response.data);
    } catch (error) {
      setSites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSites();
  }, [fetchSites]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <Form onSiteAdded={fetchSites} /> <Sites sites={sites} loading={loading} onSiteAdded={fetchSites} /> </>,
      errorElement: <div>Not Found</div>
    }
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App
