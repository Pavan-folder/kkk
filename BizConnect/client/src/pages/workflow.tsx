import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { AITools } from '@/components/workflow/ai-tools';
import { sampleDeals } from '@/lib/data';
import { 
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  MessageCircle,
  Phone,
  Video,
  Upload,
  Download,
  Send,
  Bot,
  TrendingUp,
  Users,
  Building
} from 'lucide-react';

export default function WorkflowPage() {
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [showAITools, setShowAITools] = useState(false);
  const [messageText, setMessageText] = useState('');

  const deal = sampleDeals[0]; // Using the first sample deal

  const stages = [
    { id: 1, name: 'Initial Contact', status: 'completed' },
    { id: 2, name: 'Due Diligence', status: 'active' },
    { id: 3, name: 'Negotiation', status: 'pending' },
    { id: 4, name: 'Closing', status: 'pending' }
  ];

  const pipelineDeals = [
    {
      id: '1',
      company: 'TechStart Solutions',
      buyer: 'Michael Chen',
      value: '$2.5M',
      stage: 'Due Diligence',
      progress: 45,
      lastUpdated: '2 hours ago',
      status: 'active'
    },
    {
      id: '2', 
      company: 'CloudFlow Systems',
      buyer: 'David Rodriguez',
      value: '$4.2M',
      stage: 'Due Diligence',
      progress: 60,
      lastUpdated: '3 hours ago',
      status: 'warning'
    },
    {
      id: '3',
      company: 'RetailTech Pro',
      buyer: 'Lisa Chang',
      value: '$6.1M',
      stage: 'Negotiation',
      progress: 75,
      lastUpdated: '1 hour ago',
      status: 'progress'
    },
    {
      id: '4',
      company: 'E-commerce Plus',
      buyer: 'Robert Kim',
      value: '$3.2M',
      stage: 'Closing',
      progress: 90,
      lastUpdated: '30 minutes ago',
      status: 'success'
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Acquisition Workflow</h1>
          <p className="text-gray-600">Streamlined process to complete your business acquisitions</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setShowAITools(!showAITools)}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Tools
          </Button>
          <Button>
            <Building className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* AI Tools Section */}
      {showAITools && (
        <div className="mb-8">
          <AITools />
        </div>
      )}

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Initial Contact */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Initial Contact</h3>
                <span className="text-sm text-gray-600">3 deals</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">TechStart Solutions</h4>
                    <span className="text-sm text-blue-600 font-medium">$2.5M</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Michael Chen</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Updated 2h ago</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Due Diligence */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Due Diligence</h3>
                <span className="text-sm text-gray-600">2 deals</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">CloudFlow Systems</h4>
                    <span className="text-sm text-yellow-600 font-medium">$4.2M</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">David Rodriguez</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Updated 3h ago</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Negotiation */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Negotiation</h3>
                <span className="text-sm text-gray-600">1 deal</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">RetailTech Pro</h4>
                    <span className="text-sm text-orange-600 font-medium">$6.1M</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Lisa Chang</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Updated 1h ago</span>
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Closing</h3>
                <span className="text-sm text-gray-600">1 deal</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">E-commerce Plus</h4>
                    <span className="text-sm text-green-600 font-medium">$3.2M</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Robert Kim</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Updated 30m ago</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Deal Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Current Tasks */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Tasks</CardTitle>
                <Badge variant="secondary">Due Diligence Phase</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Task 1 - Completed */}
                <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Review Financial Documents</h4>
                    <p className="text-sm text-gray-600 mt-1">3-year P&L statements, tax returns, and cash flow reports</p>
                    <div className="mt-2 text-sm text-secondary font-medium">
                      <CheckCircle className="h-3 w-3 mr-1 inline" />
                      Completed
                    </div>
                  </div>
                </div>

                {/* Task 2 - In Progress */}
                <div className="flex items-start space-x-4 p-4 border-2 border-accent bg-amber-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Legal Document Review</h4>
                    <p className="text-sm text-gray-600 mt-1">Contracts, leases, and legal agreements analysis</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm text-accent font-medium">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        In Progress
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-blue-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Task 3 - Pending */}
                <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Market Analysis Report</h4>
                    <p className="text-sm text-gray-600 mt-1">Industry trends and competitive landscape assessment</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1 inline" />
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Deal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expected Close Date:</span>
                  <span className="font-medium">Q2 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Days Since Match:</span>
                  <span className="font-medium">12 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Communication & Documents */}
        <div className="space-y-6">
          {/* Communication Panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Communication</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm text-gray-600">Sarah Chen (Seller)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Message Thread */}
              <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-900">Hi! I've uploaded the requested financial documents to the secure portal. Let me know if you need any additional information.</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Sarah Chen • 2 hours ago</p>
                  </div>
                </div>

                <div className="flex space-x-3 justify-end">
                  <div className="flex-1 max-w-xs">
                    <div className="bg-primary text-white rounded-lg p-3">
                      <p className="text-sm">Thank you! Our team will review the documents and get back to you within 48 hours with any questions.</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">You • 1 hour ago</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">JS</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex space-x-3">
                <Input 
                  className="flex-1"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-3 w-3 mr-1" />
                  Video
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Repository */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deal.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.uploadedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={doc.status === 'verified' ? 'default' : doc.status === 'processing' ? 'secondary' : 'outline'}>
                        {doc.status.toUpperCase()}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-dashed border-2">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
