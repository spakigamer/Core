import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12vh' }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ width: '100%', maxWidth: '340px' }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Core</h1>
          <p className="text-muted">Sign in to your account</p>
        </div>

        {error && (
          <div style={{ border: '1px solid var(--danger)', color: 'var(--danger)', fontSize: '0.75rem', padding: '0.625rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              autoFocus
            />
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label style={{ marginBottom: 0 }}>Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '40px', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Processing...' : 'Sign in'}
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.8125rem' }} className="text-muted">
          No account? <Link to="/register" style={{ color: 'var(--text-main)', fontWeight: 500, textDecoration: 'none' }}>Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
