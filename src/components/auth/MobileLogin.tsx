'use client';

import { useState } from 'react';
import { 
  Ship, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Anchor,
  Waves,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Fingerprint,
  Shield
} from 'lucide-react';

interface MobileLoginProps {
  onLogin?: (credentials: { username: string; password: string; biometric?: boolean }) => void;
}

export default function MobileLogin({ onLogin }: MobileLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [biometricAvailable] = useState(true); // Simulate biometric availability

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      if (formData.username && formData.password) {
        onLogin?.(formData);
        window.location.href = '/mobile';
      } else {
        setError('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleBiometricLogin = () => {
    setIsLoading(true);
    
    // Simulate biometric authentication
    setTimeout(() => {
      onLogin?.({ username: 'captain', password: '', biometric: true });
      window.location.href = '/mobile';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      {/* Status Bar Simulation */}
      <div className="bg-black/20 h-6 flex items-center justify-between px-4 text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 border border-white rounded-sm">
            <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
        
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <Waves className="w-full h-full text-cyan-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Ship className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent mb-2">
              Captain&apos;s Eye
            </h1>
            <p className="text-slate-400 text-sm">Mobile Command Center</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-600/30 rounded-xl flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Captain ID
              </label>
              <div className="relative">
                <User className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-lg"
                  placeholder="Enter Captain ID"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Security Code
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-14 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-lg"
                  placeholder="Enter security code"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-slate-300">Keep me signed in</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-3" />
                  Access Bridge
                </>
              )}
            </button>
          </form>

          {/* Biometric Login */}
          {biometricAvailable && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-400">or</span>
                </div>
              </div>

              <button
                onClick={handleBiometricLogin}
                disabled={isLoading}
                className="w-full mt-6 py-4 bg-slate-800/50 border-2 border-slate-600 text-slate-300 rounded-xl font-medium hover:bg-slate-700/50 hover:border-slate-500 focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                <Fingerprint className="h-5 w-5 mr-3" />
                Use Biometric Authentication
              </button>
            </div>
          )}

          {/* Emergency Access */}
          <div className="mt-8 p-4 bg-orange-900/20 border border-orange-600/30 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Emergency Access</span>
            </div>
            <p className="text-xs text-orange-300/80">
              In case of emergency, contact the Shore Operations Center for immediate access authorization.
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
            <div className="text-center text-xs text-slate-500">
              <p className="mb-2 font-medium">Demo Access:</p>
              <div className="space-y-1">
                <div><span className="text-cyan-400">Captain ID:</span> CAPT001</div>
                <div><span className="text-cyan-400">Security Code:</span> demo123</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-slate-500 text-xs">
          <Anchor className="h-3 w-3" />
          <span>Secure Maritime Authentication</span>
        </div>
      </div>
    </div>
  );
}
