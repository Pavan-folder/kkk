import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Upload,
  Download,
  Share2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Lightbulb,
  Bot
} from 'lucide-react';

export function AITools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'document-analyzer',
      title: 'Financial Document Analyzer',
      description: 'AI-powered analysis of financial statements with risk assessment and insights.',
      icon: FileText,
      status: 'completed',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'valuation',
      title: 'AI Valuation Assistant',
      description: 'Automated business valuations based on industry data and financial metrics.',
      icon: Calculator,
      status: 'new',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'risk-assessment',
      title: 'AI Risk Assessment',
      description: 'Automated risk evaluation based on industry data and business metrics.',
      icon: TrendingUp,
      status: 'processing',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const analysisResults = {
    healthScore: 87,
    revenueGrowth: '+34%',
    profitMargin: '23.5%',
    cashFlow: 'Strong'
  };

  const insights = [
    {
      type: 'positive',
      title: 'Strong Revenue Growth',
      description: 'Consistent 30%+ growth over the past 3 years indicates strong market position',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      type: 'warning',
      title: 'Customer Concentration Risk',
      description: 'Top 3 customers represent 45% of revenue. Consider diversification strategies',
      icon: AlertTriangle,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    {
      type: 'opportunity',
      title: 'Optimization Opportunity',
      description: 'Operating expenses could be reduced by 8-12% through automation',
      icon: Lightbulb,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    }
  ];

  const documents = [
    {
      name: 'Financial_Statement_2023.pdf',
      size: '2.4 MB',
      status: 'verified',
      uploadedDate: 'today'
    },
    {
      name: 'Revenue_Analysis_Q4.xlsx',
      size: '1.8 MB', 
      status: 'processing',
      uploadedDate: 'today'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 ${
                selectedTool === tool.id ? 'border-primary' : 'border-gray-200'
              }`}
              onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="text-white h-6 w-6" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                  <Badge variant={tool.status === 'completed' ? 'default' : tool.status === 'processing' ? 'secondary' : 'outline'}>
                    {tool.status === 'completed' && 'COMPLETE'}
                    {tool.status === 'processing' && 'PROCESSING'}
                    {tool.status === 'new' && 'NEW'}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <Button size="sm" className="w-full">
                  {tool.status === 'completed' ? 'View Report' : 
                   tool.status === 'processing' ? 'View Progress' : 'Start Analysis'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Document Analyzer Tool */}
      {selectedTool === 'document-analyzer' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Bot className="text-white h-5 w-5" />
              </div>
              <div>
                <CardTitle>AI Document Analyzer</CardTitle>
                <p className="text-gray-600">Upload your financial documents for instant analysis</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Upload Documents</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h4>
                  <p className="text-gray-600 mb-4">Supported formats: PDF, Excel, CSV (Max 50MB)</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline">Financial Statements</Badge>
                    <Badge variant="outline">P&L Reports</Badge>
                    <Badge variant="outline">Cash Flow</Badge>
                  </div>
                </div>

                {/* Uploaded Files */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 border rounded-lg ${
                        doc.status === 'verified' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <FileText className={doc.status === 'verified' ? 'text-green-600' : 'text-blue-600'} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">{doc.size}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === 'verified' ? (
                            <span className="text-green-600 text-sm">✓ Analyzed</span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span className="text-blue-600 text-sm">Processing...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Analysis Results</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Financial Health Score</h4>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{analysisResults.healthScore}/100</div>
                    <p className="text-gray-600">Excellent financial health</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Revenue Growth</span>
                      <span className="font-medium text-green-600">{analysisResults.revenueGrowth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Profit Margin</span>
                      <span className="font-medium text-blue-600">{analysisResults.profitMargin}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Cash Flow</span>
                      <span className="font-medium text-green-600">{analysisResults.cashFlow}</span>
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
                  <div className="space-y-3">
                    {insights.map((insight, index) => {
                      const Icon = insight.icon;
                      return (
                        <div key={index} className={`flex gap-3 p-3 border rounded-lg ${insight.color}`}>
                          <Icon className="mt-1 h-4 w-4" />
                          <div>
                            <p className="font-medium text-gray-900">{insight.title}</p>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Analysis
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
