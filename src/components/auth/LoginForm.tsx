'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Ship, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Shield, 
  Anchor,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Users,
  BarChart3
} from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  permissions: string[];
}

const userRoles: UserRole[] = [
  {
    id: 'captain',
    name: 'Captain',
    description: 'Ship operations and mission management',
    icon: Ship,
    color: 'text-cyan-400 bg-cyan-900/30 border-cyan-500',
    permissions: ['mission_execution', 'crew_management', 'safety_reporting', 'navigation_control']
  },
  {
    id: 'shore_manager',
    name: 'Shore Manager',
    description: 'Fleet oversight and compliance monitoring',
    icon: BarChart3,
    color: 'text-blue-400 bg-blue-900/30 border-blue-500',
    permissions: ['fleet_management', 'mission_assignment', 'compliance_monitoring', 'analytics_access']
  },
  {
    id: 'admin',
    name: 'System Administrator',
    description: 'Full system access and user management',
    icon: Shield,
    color: 'text-purple-400 bg-purple-900/30 border-purple-500',
    permissions: ['user_management', 'system_configuration', 'audit_access', 'full_permissions']
  }
];

interface LoginFormProps {
  variant?: 'web' | 'mobile';
}

export default function LoginForm({ variant = 'web' }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'credentials' | 'role_selection' | 'success'>('credentials');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      if (formData.username && formData.password) {
        setStep('role_selection');
      } else {
        setError('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRoleSelection = (roleId: string) => {
    setFormData(prev => ({ ...prev, role: roleId }));
    setIsLoading(true);
    
    // Simulate role assignment
    setTimeout(() => {
      setStep('success');
      setIsLoading(false);
      
      // Redirect after success
      setTimeout(() => {
        window.location.href = roleId === 'captain' ? '/mobile' : '/dashboard';
      }, 2000);
    }, 1000);
  };

  const isMobile = variant === 'mobile';

  if (step === 'success') {
    const selectedRole = userRoles.find(role => role.id === formData.role);
    
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4`}>
        <div className={`bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 p-8 w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} text-center`}>
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h2>
          <p className="text-slate-400 mb-4">Successfully authenticated as {selectedRole?.name}</p>
          
          <div className={`p-4 rounded-xl border-l-4 ${selectedRole?.color} mb-6`}>
            <div className="flex items-center space-x-3">
              {selectedRole && <selectedRole.icon className="h-6 w-6" />}
              <div className="text-left">
                <div className="font-semibold text-white">{selectedRole?.name}</div>
                <div className="text-sm text-slate-400">{selectedRole?.description}</div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-slate-500">
            Redirecting to your dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (step === 'role_selection') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4`}>
        <div className={`bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 p-8 w-full ${isMobile ? 'max-w-sm' : 'max-w-2xl'}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Select Your Role</h2>
            <p className="text-slate-400">Choose your role to access the appropriate interface</p>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            {userRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelection(role.id)}
                disabled={isLoading}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${role.color} hover:shadow-lg`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <role.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{role.name}</h3>
                  <p className="text-sm text-slate-300 mb-4">{role.description}</p>
                  
                  <div className="text-xs text-slate-400">
                    <div className="font-medium mb-1">Permissions:</div>
                    <div className="space-y-1">
                      {role.permissions.slice(0, 2).map((permission) => (
                        <div key={permission} className="capitalize">
                          {permission.replace('_', ' ')}
                        </div>
                      ))}
                      {role.permissions.length > 2 && (
                        <div>+{role.permissions.length - 2} more</div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setStep('credentials')}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
        {/* Header */}
        <div className="p-8 pb-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Ship className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent mb-2">
              Captain&apos;s Eye
            </h1>
            <p className="text-slate-400 text-sm">Maritime Fleet Management System</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-600/30 rounded-lg flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleCredentialsSubmit} className="p-8 pt-0">
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username or Email
              </label>
              <div className="relative">
                <User className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-slate-300">Remember me</span>
              </label>
              
              <Link href="/auth/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 pb-8">
          <div className="border-t border-slate-700 pt-6">
            <div className="text-center text-sm text-slate-500">
              <p className="mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs">
                <div><span className="text-cyan-400">Captain:</span> captain@ship.com / demo123</div>
                <div><span className="text-blue-400">Shore Manager:</span> manager@fleet.com / demo123</div>
                <div><span className="text-purple-400">Admin:</span> admin@system.com / demo123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
