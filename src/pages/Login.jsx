import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../services/firebase/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await loginUser(formData.email, formData.password);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success('Successfully logged in!');
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p className="text-small">Login to manage your tournaments</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input 
            id="email"
            type="email"
            label="Email Address"
            placeholder="enter@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input 
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full mt-2" isLoading={loading}>
            Login
          </Button>
        </form>
        <div className="auth-footer">
          <p className="text-small">
            Don't have an account? <Link to="/register" className="text-primary">Register</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
