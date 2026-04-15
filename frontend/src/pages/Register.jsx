import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ width: '100%', maxWidth: '360px' }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Core</h1>
          <p className="text-muted">Create a new workspace</p>
        </div>

        {error && (
          <div style={{ border: '1px solid var(--danger)', color: 'var(--danger)', fontSize: '0.75rem', padding: '0.625rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              name="email"
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              name="password"
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '40px', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Working...' : 'Create account'}
          </button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.8125rem' }} className="text-muted">
          Have an account? <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
