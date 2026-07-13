import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../services/firebase/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await registerUser(formData.email, formData.password, formData.username);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success('Registration successful!');
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="text-small">Start managing tournaments faster</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input 
            id="username"
            type="text"
            label="Username"
            placeholder="Organizer Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <Input 
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full mt-2" isLoading={loading}>
            Register
          </Button>
        </form>
        <div className="auth-footer">
          <p className="text-small">
            Already have an account? <Link to="/login" className="text-primary">Login</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
