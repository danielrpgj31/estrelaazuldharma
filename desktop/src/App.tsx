import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import IntroducaoNivel1 from './pages/IntroducaoNivel1';
import IntroducaoNivel2 from './pages/IntroducaoNivel2';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/introducao-nivel-1" element={<IntroducaoNivel1 />} />
          <Route path="/introducao-nivel-2" element={<IntroducaoNivel2 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
