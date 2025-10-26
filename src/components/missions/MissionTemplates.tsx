import { Navigation, Anchor, Ship, Zap, Shield, Compass, Plus } from 'lucide-react';

const missionTemplates = [
  {
    id: 'safety-drill',
    title: 'Maritime Safety Drill',
    description: 'Comprehensive safety drill including fire, abandon ship, and emergency procedures',
    category: 'Safety & Emergency',
    icon: Zap,
    gradient: 'from-red-600 to-red-700',
    estimatedTime: '45 min',
    complexity: 'High',
    usage: 156
  },
  {
    id: 'navigation-check',
    title: 'Navigation Equipment Test',
    description: 'Complete testing of all navigation systems, GPS, radar, and communication equipment',
    category: 'Navigation & Equipment',
    icon: Compass,
    gradient: 'from-blue-600 to-blue-700',
    estimatedTime: '30 min',
    complexity: 'Medium',
    usage: 89
  },
  {
    id: 'cargo-inspection',
    title: 'Cargo Hold Inspection',
    description: 'Pre-loading and post-loading inspection of cargo holds and securing systems',
    category: 'Cargo Operations',
    icon: Ship,
    gradient: 'from-indigo-600 to-indigo-700',
    estimatedTime: '60 min',
    complexity: 'Medium',
    usage: 234
  },
  {
    id: 'security-check',
    title: 'Port Security Assessment',
    description: 'ISPS compliance check and security assessment for port operations',
    category: 'Security & Compliance',
    icon: Shield,
    gradient: 'from-purple-600 to-purple-700',
    estimatedTime: '90 min',
    complexity: 'High',
    usage: 67
  },
  {
    id: 'anchor-operations',
    title: 'Anchoring Procedures',
    description: 'Safe anchoring operations including anchor watch and position monitoring',
    category: 'Seamanship',
    icon: Anchor,
    gradient: 'from-teal-600 to-teal-700',
    estimatedTime: '20 min',
    complexity: 'Low',
    usage: 123
  },
  {
    id: 'route-planning',
    title: 'Voyage Planning',
    description: 'Complete route planning including weather routing and passage planning',
    category: 'Navigation & Planning',
    icon: Navigation,
    gradient: 'from-green-600 to-green-700',
    estimatedTime: '120 min',
    complexity: 'High',
    usage: 45
  }
];

export default function MissionTemplates() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h2 text-navy-800 mb-2 flex items-center">
              <Navigation className="h-8 w-8 mr-3 text-ocean-600" />
              🚢 Maritime Mission Templates
            </h2>
            <p className="text-body text-ocean-700">Pre-built mission templates for common maritime operations and compliance requirements</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create Custom Template
          </button>
        </div>
      </div>

      <div className="grid-auto-fill">
        {missionTemplates.map((template, index) => (
          <div key={template.id} className="maritime-card-gradient p-6 rounded-2xl shadow-lg border border-ocean-200/30 maritime-hover backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-r ${template.gradient} rounded-2xl flex items-center justify-center shadow-lg animate-float`} style={{ animationDelay: `${index * 0.1}s` }}>
                <template.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-body-sm text-ocean-700 font-semibold">{template.usage} uses</div>
                <div className="text-xs text-navy-600">{template.estimatedTime}</div>
              </div>
            </div>

            <div className="space-xs mb-4">
              <h3 className="text-h3 text-navy-800 font-bold">{template.title}</h3>
              <p className="text-body-sm text-ocean-700">{template.description}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-ocean-100 text-ocean-800 rounded-full text-xs font-semibold">
                {template.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                template.complexity === 'High' ? 'bg-red-100 text-red-800' :
                template.complexity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {template.complexity}
              </span>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white rounded-xl font-semibold hover:from-ocean-700 hover:to-ocean-800 transition-all duration-300">
                Use Template
              </button>
              <button className="px-4 py-2 border border-ocean-300 text-ocean-700 rounded-xl font-semibold hover:bg-ocean-50 transition-all duration-300">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
