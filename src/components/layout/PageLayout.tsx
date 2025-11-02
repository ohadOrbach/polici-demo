import Navigation from './Navigation';
import Header from './Header'; // New component to be created

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 bg-slate-800/80 border-r border-slate-700">
        <Navigation />
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="relative z-10 p-8 flex-1">
          <main>{children}</main>
        </div>
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
