import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockUsers } from '../../data/mockData';
import { User, Mail, Lock, LogIn, Shield, GraduationCap, Settings, Award, BookOpen } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password123') {
      setCurrentUser(user);
    } else {
      setError('Invalid email or password. Use password: password123');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (userEmail: string) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.email === userEmail);
    if (user) {
      setCurrentUser(user);
    }
    
    setIsLoading(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="h-5 w-5" />;
      case 'faculty':
        return <Shield className="h-5 w-5" />;
      case 'tech-secretary':
        return <Settings className="h-5 w-5" />;
      case 'club-lead':
        return <Award className="h-5 w-5" />;
      case 'phd-scholar':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      case 'faculty':
        return 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700';
      case 'tech-secretary':
        return 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700';
      case 'club-lead':
        return 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700';
      case 'phd-scholar':
        return 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700';
      default:
        return 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'tech-secretary':
        return 'Tech Secretary';
      case 'club-lead':
        return 'Club Lead';
      case 'phd-scholar':
        return 'PhD Scholar';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const isAdmin = (role: string) => {
    return ['faculty', 'tech-secretary', 'club-lead', 'phd-scholar'].includes(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            I2R Laboratory
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            KIT Engineering College
          </p>
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            Sign in to your account
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Access laboratory equipment and manage reservations
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Demo password: password123
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Demo Access
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try different user roles
            </p>
          </div>

          <div className="space-y-3">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleDemoLogin(user.email)}
                disabled={isLoading}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-white bg-gradient-to-r ${getRoleColor(user.role)} disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95`}
              >
                <div className="flex items-center space-x-3">
                  {getRoleIcon(user.role)}
                  <div className="text-left">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs opacity-90">{user.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {getRoleDisplayName(user.role)}
                  </span>
                  {isAdmin(user.role) && (
                    <span className="text-xs font-medium bg-red-500 bg-opacity-80 px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Secure laboratory management system for KIT Engineering College
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;