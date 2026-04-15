import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="2" stroke="white" strokeWidth="2.5"/>
    <path d="M7 12H17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <Logo />
        <span className="nav-brand">Core</span>
      </Link>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.5rem' }}>
              {user.name}
            </span>
            <Link to="/dashboard" className="btn btn-outline" style={{ height: '32px' }}>Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: '0.75rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Sign in</Link>
            <Link to="/register" className="btn btn-primary">Start</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
