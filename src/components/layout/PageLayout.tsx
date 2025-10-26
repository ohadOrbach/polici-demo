import Navigation from './Navigation';
import { Waves, Anchor } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-32 animate-float">
          <Waves className="h-24 w-24 text-cyan-400" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '3s' }}>
          <Anchor className="h-20 w-20 text-cyan-400" />
        </div>
      </div>
      
      <Navigation />
      
      <div className="relative z-10 container-lg py-8">
        {(title || description) && (
          <header className="mb-12">
            <div className="bg-slate-800/80 backdrop-blur-sm p-8 space-sm rounded-2xl border border-slate-700">
              {title && (
                <h1 className="text-h1 text-white flex items-center">
                  <div className="w-1.5 h-12 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full mr-4"></div>
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-body-lg text-slate-300 max-w-4xl">{description}</p>
              )}
            </div>
          </header>
        )}
        
        <main>{children}</main>
      </div>
      
      {/* Enhanced Mockup Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-3 shadow-2xl rounded-xl border border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-body-sm text-slate-300 font-semibold">🎨 Visual Mockup</span>
          </div>
        </div>
      </div>
    </div>
  );
}
