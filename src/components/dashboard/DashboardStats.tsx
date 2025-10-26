import { Ship, Compass, Anchor, Navigation, Zap, MapPin } from 'lucide-react';

const stats = [
  {
    name: 'Fleet Vessels',
    value: '24',
    change: '+2',
    changeType: 'positive',
    icon: Ship,
    gradient: 'from-cyan-600 to-cyan-700'
  },
  {
    name: 'Active Missions',
    value: '156',
    change: '+12',
    changeType: 'positive',
    icon: Navigation,
    gradient: 'from-cyan-600 to-cyan-700'
  },
  {
    name: 'Completed Today',
    value: '43',
    change: '+8',
    changeType: 'positive',
    icon: Anchor,
    gradient: 'from-cyan-600 to-cyan-700'
  },
  {
    name: 'Overdue Alerts',
    value: '7',
    change: '-2',
    changeType: 'negative',
    icon: Zap,
    gradient: 'from-red-600 to-red-700'
  },
  {
    name: 'Harbor Review',
    value: '18',
    change: '+3',
    changeType: 'neutral',
    icon: MapPin,
    gradient: 'from-cyan-600 to-cyan-700'
  },
  {
    name: 'Maritime Compliance',
    value: '94.2%',
    change: '+1.2%',
    changeType: 'positive',
    icon: Compass,
    gradient: 'from-cyan-600 to-cyan-700'
  }
];

export default function DashboardStats() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-h2 text-white mb-2 flex items-center">
          <Compass className="h-8 w-8 mr-3 text-cyan-400" />
          🚢 Fleet Command Status
        </h2>
        <p className="text-body text-slate-400">Maritime performance indicators across all vessels and operations</p>
      </div>
      
      <div className="grid-auto-fit">
        {stats.map((stat, index) => (
          <div key={stat.name} className="bg-slate-800 hover:bg-slate-700 hover:shadow-2xl p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-xl animate-float`} style={{ animationDelay: `${index * 0.2}s` }}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                stat.changeType === 'positive' 
                  ? 'bg-green-900/30 text-green-400' 
                  : stat.changeType === 'negative' 
                  ? 'bg-red-900/30 text-red-400' 
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div className="space-xs">
              <div className="text-h2 text-white font-black leading-none">
                {stat.value}
              </div>
              <div className="text-body-sm text-slate-400 font-semibold">
                {stat.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
