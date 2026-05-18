import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { loginUser, registerUser } from '../services/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = isLogin ? await loginUser(formData) : await registerUser(formData);
      login(response.data.user, response.data.token);
      navigate('/overview');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-branding">
          <div className="brand-badge">S</div>
          <div>
            <h1>{isLogin ? 'Welcome back' : 'Create your account'}</h1>
            <p>{isLogin ? 'Sign in to access your sales dashboard.' : 'Register and start managing users.'}</p>
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          )}
          <input
            name="email"
            placeholder="Email address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <button type="submit" className="solid-button" disabled={isSubmitting}>
            {isSubmitting ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="auth-switch">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button type="button" className="ghost-button" onClick={() => setIsLogin(!isLogin)} disabled={isSubmitting}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
