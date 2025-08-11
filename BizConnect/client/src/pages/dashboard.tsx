import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { 
  TrendingUp, 
  Heart, 
  CheckCircle, 
  Trophy,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const [, setLocation] = useLocation();

  const stats = [
    {
      title: 'Active Matches',
      value: '12',
      icon: Heart,
      color: 'text-primary',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Deals in Progress',
      value: '5', 
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Completed Deals',
      value: '8',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Success Rate',
      value: '87%',
      icon: Trophy,
      color: 'text-accent',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentMatches = [
    {
      name: 'David Rodriguez',
      company: 'Tech Innovations LLC',
      timeAgo: '2 hours ago',
      status: 'New Match'
    },
    {
      name: 'Sarah Chen',
      company: 'Global Ventures',
      timeAgo: '5 hours ago',
      status: 'In Review'
    }
  ];

  const dealPipeline = [
    {
      company: 'TechStart Solutions',
      stage: 'Due Diligence',
      value: '$2.5M',
      color: 'bg-blue-50'
    },
    {
      company: 'Digital Marketing Pro',
      stage: 'Negotiation',
      value: '$1.8M',
      color: 'bg-yellow-50'
    },
    {
      company: 'E-commerce Plus',
      stage: 'Final Review',
      value: '$3.2M',
      color: 'bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Track your deals and discover qualified buyers</p>
        </div>
        <Button onClick={() => setLocation('/discover')}>
          <Plus className="h-4 w-4 mr-2" />
          Start New Match
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`${stat.color} h-6 w-6`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Matches
              <Button variant="ghost" size="sm" onClick={() => setLocation('/matches')}>
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{match.name}</p>
                    <p className="text-sm text-gray-600">{match.company}</p>
                    <p className="text-xs text-gray-500">{match.timeAgo}</p>
                  </div>
                  <Badge variant={match.status === 'New Match' ? 'default' : 'secondary'}>
                    {match.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deal Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Deal Pipeline
              <Button variant="ghost" size="sm" onClick={() => setLocation('/workflow')}>
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealPipeline.map((deal, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${deal.color}`}>
                  <div>
                    <p className="font-medium text-gray-900">{deal.company}</p>
                    <p className="text-sm text-gray-600">{deal.stage}</p>
                  </div>
                  <span className="font-semibold text-primary">{deal.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
