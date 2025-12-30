import './App.css'
import axios from 'axios'
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Scanner from './pages/Scanner';
axios.defaults.baseURL = "http://localhost:3000/csv";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminKey');
  if(token) {
    config.headers['x-admin-key'] = token;
  }
  return config;
})

function App() {
  return (
    <>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/scan' element={
          <ProtectedRoute>
            <Scanner />
          </ProtectedRoute>
        }/>
        <Route path="*" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
