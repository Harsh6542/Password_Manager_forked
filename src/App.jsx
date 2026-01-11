import React, { useState, useCallback, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import './App.css'
import Form from './components/Form';
import Sites from './components/Sites';
import axios from 'axios'; 

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-6 right-6 p-3 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 dark:from-blue-600 dark:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 border-2 border-yellow-500 dark:border-blue-500"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span className="text-2xl">☀️</span>
      ) : (
        <span className="text-2xl">🌙</span>
      )}
    </button>
  );
};

function App() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
        theme={darkMode ? "dark" : "light"}
        transition={Bounce}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 pb-10">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-7xl mx-auto px-4">
          <Form onSiteAdded={fetchSites} />
          <Sites sites={sites} loading={loading} onSiteAdded={fetchSites} />
        </div>
      </div>
    </>
  );
}

export default App
