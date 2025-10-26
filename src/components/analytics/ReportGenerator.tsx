'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Send, 
  Eye, 
  Settings,
  CheckSquare,
  Square,
  Ship,
  Users,
  Shield,
  Leaf,
  Lock,
  Briefcase,
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  Mail,
  Printer,
  Save
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'compliance' | 'operational' | 'financial' | 'safety';
  estimatedTime: string;
  icon: React.ElementType;
  color: string;
}

type ReportParameterValue = string | string[] | { from?: string; to?: string } | boolean;

interface ReportParameter {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'daterange' | 'checkbox' | 'text';
  required: boolean;
  options?: string[];
  value?: ReportParameterValue;
}

interface GeneratedReport {
  id: string;
  template: string | undefined;
  generatedAt: string;
  parameters: { [key: string]: ReportParameterValue };
  status: 'completed';
  fileSize: string;
  pages: number;
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'compliance-summary',
    name: 'Fleet Compliance Summary',
    description: 'Comprehensive overview of fleet compliance across all maritime regulations',
    category: 'compliance',
    estimatedTime: '5-10 min',
    icon: Shield,
    color: 'text-green-400 bg-green-900/30'
  },
  {
    id: 'safety-audit',
    name: 'Safety Audit Report',
    description: 'Detailed safety compliance report including SOLAS requirements',
    category: 'safety',
    estimatedTime: '10-15 min',
    icon: Shield,
    color: 'text-red-400 bg-red-900/30'
  },
  {
    id: 'environmental-impact',
    name: 'Environmental Impact Report',
    description: 'MARPOL compliance and environmental performance analysis',
    category: 'compliance',
    estimatedTime: '8-12 min',
    icon: Leaf,
    color: 'text-green-400 bg-green-900/30'
  },
  {
    id: 'operational-performance',
    name: 'Operational Performance',
    description: 'Fleet efficiency, fuel consumption, and delivery performance metrics',
    category: 'operational',
    estimatedTime: '6-8 min',
    icon: BarChart3,
    color: 'text-blue-400 bg-blue-900/30'
  },
  {
    id: 'crew-management',
    name: 'Crew Management Report',
    description: 'MLC compliance, crew certifications, and training records',
    category: 'compliance',
    estimatedTime: '7-10 min',
    icon: Users,
    color: 'text-purple-400 bg-purple-900/30'
  },
  {
    id: 'port-state-control',
    name: 'Port State Control Summary',
    description: 'PSC inspection results and compliance tracking',
    category: 'compliance',
    estimatedTime: '5-8 min',
    icon: Lock,
    color: 'text-yellow-400 bg-yellow-900/30'
  },
  {
    id: 'financial-summary',
    name: 'Financial Performance',
    description: 'Operational costs, fuel expenses, and revenue analysis',
    category: 'financial',
    estimatedTime: '10-15 min',
    icon: Briefcase,
    color: 'text-cyan-400 bg-cyan-900/30'
  },
  {
    id: 'vessel-specific',
    name: 'Individual Vessel Report',
    description: 'Comprehensive report for a specific vessel including all metrics',
    category: 'operational',
    estimatedTime: '8-12 min',
    icon: Ship,
    color: 'text-indigo-400 bg-indigo-900/30'
  }
];

const reportParameters: { [key: string]: ReportParameter[] } = {
  'compliance-summary': [
    {
      id: 'vessels',
      label: 'Select Vessels',
      type: 'multiselect',
      required: false,
      options: ['All Vessels', 'MV Northern Star', 'MV Atlantic Pioneer', 'MV Pacific Explorer', 'MV Arctic Voyager', 'MV Mediterranean Sun']
    },
    {
      id: 'daterange',
      label: 'Report Period',
      type: 'daterange',
      required: true
    },
    {
      id: 'categories',
      label: 'Compliance Categories',
      type: 'multiselect',
      required: true,
      options: ['SOLAS Safety', 'MARPOL Environmental', 'ISPS Security', 'MLC Labor', 'Port State Control', 'Flag State Inspection']
    },
    {
      id: 'includeCharts',
      label: 'Include Charts and Graphs',
      type: 'checkbox',
      required: false
    },
    {
      id: 'includeRecommendations',
      label: 'Include Recommendations',
      type: 'checkbox',
      required: false
    }
  ],
  'safety-audit': [
    {
      id: 'vessels',
      label: 'Select Vessels',
      type: 'multiselect',
      required: true,
      options: ['MV Northern Star', 'MV Atlantic Pioneer', 'MV Pacific Explorer', 'MV Arctic Voyager', 'MV Mediterranean Sun']
    },
    {
      id: 'auditType',
      label: 'Audit Type',
      type: 'select',
      required: true,
      options: ['Internal Audit', 'External Audit', 'Flag State Inspection', 'Port State Control']
    },
    {
      id: 'daterange',
      label: 'Audit Period',
      type: 'daterange',
      required: true
    },
    {
      id: 'includePhotos',
      label: 'Include Photo Evidence',
      type: 'checkbox',
      required: false
    }
  ]
};

export default function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [parameters, setParameters] = useState<{ [key: string]: ReportParameterValue }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setParameters({});
    setGeneratedReport(null);
  };

  const handleParameterChange = (parameterId: string, value: ReportParameterValue) => {
    setParameters(prev => ({
      ...prev,
      [parameterId]: value
    }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const template = reportTemplates.find(t => t.id === selectedTemplate);
      setGeneratedReport({
        id: `report_${Date.now()}`,
        template: template?.name,
        generatedAt: new Date().toISOString(),
        parameters,
        status: 'completed',
        fileSize: '2.4 MB',
        pages: Math.floor(Math.random() * 20) + 10
      });
      setIsGenerating(false);
    }, 3000);
  };

  const selectedTemplateData = reportTemplates.find(t => t.id === selectedTemplate);
  const templateParameters = selectedTemplate ? reportParameters[selectedTemplate] || [] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Report Generator</h2>
            <p className="text-slate-400">Generate comprehensive maritime compliance and operational reports</p>
          </div>
          
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Recent Reports
            </button>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Templates
            </button>
          </div>
        </div>
      </div>

      {!selectedTemplate ? (
        /* Template Selection */
        <div className="space-y-6">
          <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Select Report Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="p-6 bg-slate-700 hover:bg-slate-600 rounded-xl border border-slate-600 hover:border-slate-500 cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-lg ${template.color}`}>
                      <template.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="capitalize">{template.category}</span>
                    <span>{template.estimatedTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Report Configuration */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${selectedTemplateData?.color}`}>
                    {selectedTemplateData && <selectedTemplateData.icon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedTemplateData?.name}</h3>
                    <p className="text-slate-400 text-sm">{selectedTemplateData?.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Change Template
                </button>
              </div>

              {/* Parameters */}
              <div className="space-y-6">
                {templateParameters.map((param) => (
                  <div key={param.id} className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      {param.label}
                      {param.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    
                    {param.type === 'select' && (
                      <select
                        value={(parameters[param.id] as string) || ''}
                        onChange={(e) => handleParameterChange(param.id, e.target.value)}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Select {param.label}</option>
                        {param.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {param.type === 'multiselect' && (
                      <div className="space-y-2">
                        {param.options?.map((option) => {
                          const value = (parameters[param.id] as string[]) || [];
                          return (
                            <label key={option} className="flex items-center space-x-3 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                              <input
                                type="checkbox"
                                checked={value.includes(option)}
                                onChange={(e) => {
                                  const updated = e.target.checked
                                    ? [...value, option]
                                    : value.filter((item) => item !== option);
                                  handleParameterChange(param.id, updated);
                                }}
                                className="w-4 h-4 text-cyan-600 bg-slate-600 border-slate-500 rounded focus:ring-cyan-500"
                              />
                              <span className="text-sm text-white">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                    
                    {param.type === 'daterange' && (() => {
                      const value = parameters[param.id];
                      const dateRangeValue = (typeof value === 'object' && value !== null && !Array.isArray(value))
                        ? value as { from?: string; to?: string }
                        : {};

                      return (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">From Date</label>
                            <input
                              type="date"
                              value={dateRangeValue.from || ''}
                              onChange={(e) => {
                                const newValue = { ...dateRangeValue, from: e.target.value };
                                handleParameterChange(param.id, newValue);
                              }}
                              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">To Date</label>
                            <input
                              type="date"
                              value={dateRangeValue.to || ''}
                              onChange={(e) => {
                                const newValue = { ...dateRangeValue, to: e.target.value };
                                handleParameterChange(param.id, newValue);
                              }}
                              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      );
                    })()}
                    
                    {param.type === 'checkbox' && (
                      <label className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={parameters[param.id] || false}
                          onChange={(e) => handleParameterChange(param.id, e.target.checked)}
                          className="w-4 h-4 text-cyan-600 bg-slate-600 border-slate-500 rounded focus:ring-cyan-500"
                        />
                        <span className="text-sm text-white">{param.label}</span>
                      </label>
                    )}
                    
                    {param.type === 'text' && (
                      <input
                        type="text"
                        value={parameters[param.id] || ''}
                        onChange={(e) => handleParameterChange(param.id, e.target.value)}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder={`Enter ${param.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {/* Generation Controls */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h4 className="text-lg font-bold text-white mb-4">Generate Report</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Estimated Time:</span>
                    <span className="text-white font-medium">{selectedTemplateData?.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Format:</span>
                    <span className="text-white font-medium">PDF</span>
                  </div>
                </div>

                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Report */}
            {generatedReport && (
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h4 className="text-lg font-bold text-white mb-4">Report Generated</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckSquare className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Generation Complete</span>
                    </div>
                    <p className="text-sm text-slate-300">{generatedReport.template}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                      <span>{generatedReport.pages} pages</span>
                      <span>{generatedReport.fileSize}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                    
                    <button className="w-full py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center justify-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </button>
                    
                    <button className="w-full py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
