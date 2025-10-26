import { 
  MapPin, 
  Compass, 
  Thermometer, 
  Wind, 
  Waves, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Anchor,
  Users,
  Fuel,
  Ship
} from 'lucide-react';

const vesselStatus = {
  position: { lat: "59°55'N", lng: "10°45'E" },
  course: "085°",
  speed: "12.3 kts",
  weather: {
    temperature: "8°C",
    windSpeed: "15 kts",
    windDirection: "NW",
    waveHeight: "1.2m"
  },
  alerts: [
    { id: 1, type: 'warning', message: 'Engine oil pressure low', time: '14:15' },
    { id: 2, type: 'info', message: 'Port approach in 2 hours', time: '14:10' },
  ],
  missions: [
    { id: 1, title: 'Safety Drill - Fire Response', status: 'pending', due: '15:30' },
    { id: 2, title: 'Navigation Check', status: 'completed', due: '13:00' },
    { id: 3, title: 'Engine Inspection', status: 'in-progress', due: '16:00' },
  ]
};

export default function CaptainDashboard() {
  return (
    <div className="p-4 space-y-4">
      {/* Vessel Status Card */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Ship className="h-5 w-5 mr-2 text-cyan-400" />
            Vessel Status
          </h2>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">Position</div>
                <div className="text-sm font-medium text-white">
                  {vesselStatus.position.lat}
                </div>
                <div className="text-sm font-medium text-white">
                  {vesselStatus.position.lng}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Compass className="h-4 w-4 text-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">Course</div>
                <div className="text-sm font-medium text-white">{vesselStatus.course}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Navigation className="h-4 w-4 text-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">Speed</div>
                <div className="text-sm font-medium text-white">{vesselStatus.speed}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Anchor className="h-4 w-4 text-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">Status</div>
                <div className="text-sm font-medium text-green-400">Underway</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Card */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <h2 className="text-lg font-bold text-white flex items-center mb-4">
          <Thermometer className="h-5 w-5 mr-2 text-cyan-400" />
          Weather Conditions
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-orange-400" />
            <div>
              <div className="text-xs text-slate-400">Temperature</div>
              <div className="text-sm font-medium text-white">{vesselStatus.weather.temperature}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-blue-400" />
            <div>
              <div className="text-xs text-slate-400">Wind</div>
              <div className="text-sm font-medium text-white">
                {vesselStatus.weather.windSpeed} {vesselStatus.weather.windDirection}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Waves className="h-4 w-4 text-cyan-400" />
            <div>
              <div className="text-xs text-slate-400">Wave Height</div>
              <div className="text-sm font-medium text-white">{vesselStatus.weather.waveHeight}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-400" />
            <div>
              <div className="text-xs text-slate-400">Crew</div>
              <div className="text-sm font-medium text-white">18/20</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <h2 className="text-lg font-bold text-white flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
          Active Alerts
        </h2>

        <div className="space-y-3">
          {vesselStatus.alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.type === 'warning' 
                  ? 'bg-amber-900/20 border border-amber-700/50' 
                  : 'bg-blue-900/20 border border-blue-700/50'
              }`}
            >
              <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{alert.message}</div>
                <div className="text-xs text-slate-400 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Missions */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <h2 className="text-lg font-bold text-white flex items-center mb-4">
          <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
          Today&apos;s Missions
        </h2>

        <div className="space-y-3">
          {vesselStatus.missions.map((mission) => (
            <div key={mission.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  mission.status === 'completed' ? 'bg-green-500' :
                  mission.status === 'in-progress' ? 'bg-yellow-500' :
                  'bg-slate-500'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-white">{mission.title}</div>
                  <div className="text-xs text-slate-400 capitalize">{mission.status.replace('-', ' ')}</div>
                </div>
              </div>
              <div className="text-xs text-slate-400">{mission.due}</div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors">
          View All Missions
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <Fuel className="h-4 w-4" />
            <span className="text-sm font-medium">Fuel Report</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Crew Status</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Report Issue</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Update Position</span>
          </button>
        </div>
      </div>
    </div>
  );
}

