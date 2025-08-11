import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { sampleMatches } from '@/lib/data';
import { MatchData } from '@/types/business';
import { MessageCircle, FileText } from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // In a real app, this would fetch matches from API
    setMatches(sampleMatches);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-secondary text-white';
      case 'in_process': return 'bg-gray-500 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No matches yet</h2>
        <p className="text-gray-600 mb-8">Start discovering businesses to find your perfect match!</p>
        <Button onClick={() => setLocation('/discover')}>
          Discover Businesses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
        <p className="text-gray-600">Businesses that have matched with your profile</p>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-semibold">
                      {match.business.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{match.business.name}</h3>
                    <p className="text-sm text-gray-600">{match.business.industry}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(match.status)}>
                  {match.status === 'new' ? 'NEW MATCH' : 
                   match.status === 'in_process' ? 'IN PROCESS' : 
                   match.status.toUpperCase()}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {match.business.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{formatCurrency(match.business.annualRevenue)}</span> revenue
                </div>
                <div className="text-sm text-gray-600">
                  Matched <span className="font-medium">{match.timeAgo}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  className="flex-1"
                  onClick={() => setLocation('/workflow')}
                >
                  {match.status === 'new' ? 'Start Process' : 'Continue Process'}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setLocation('/messages')}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Match Score Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">How matching works</h3>
          <p className="text-gray-600 text-sm">
            Our AI algorithm analyzes your investment preferences, industry focus, and budget range to find businesses 
            that match your criteria. Match scores are based on compatibility across multiple factors including 
            financial performance, growth potential, and strategic fit.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
