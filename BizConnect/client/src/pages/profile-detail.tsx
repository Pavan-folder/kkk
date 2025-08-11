import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { sampleBusinesses } from '@/lib/data';
import { BusinessProfile } from '@/types/business';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Users,
  Heart,
  X,
  Bookmark,
  Share2,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function ProfileDetailPage() {
  const [match, params] = useRoute('/profile-detail/:id');
  const [, setLocation] = useLocation();
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (match && params?.id) {
      // In a real app, this would fetch from API
      const foundBusiness = sampleBusinesses.find(b => b.id === params.id);
      setBusiness(foundBusiness || null);
    }
  }, [match, params]);

  const handleMatch = () => {
    if (business) {
      toast({
        title: "It's a match!",
        description: `You and ${business.name} can now start the acquisition process.`,
      });
      setLocation('/matches');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  if (!business) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Business not found</h2>
        <Button className="mt-4" onClick={() => setLocation('/discover')}>
          Back to Discovery
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setLocation('/discover')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
          <p className="text-gray-600">Detailed information about this business opportunity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <Card className="overflow-hidden">
            <div className="relative h-64">
              <img 
                src={business.images[0]} 
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{business.name}</h2>
                  <p className="text-lg opacity-90">{business.industry}</p>
                </div>
              </div>
              {business.isVerified && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VERIFIED BUSINESS
                  </Badge>
                </div>
              )}
            </div>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About This Business</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-6">
                {business.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{business.keyMetrics.activeClients || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Active Clients</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{business.keyMetrics.retentionRate || 'N/A'}%</div>
                  <div className="text-sm text-gray-600">Retention Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">{formatCurrency(business.annualRevenue)}</div>
                  <div className="text-sm text-gray-600">Annual Revenue</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-neutral">{business.employeeCount}</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Annual Revenue (2023)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(business.financials.revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Net Profit Margin</span>
                    <span className="font-semibold text-secondary">{business.financials.netProfitMargin}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">EBITDA</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(business.financials.ebitda)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Growth Rate (YoY)</span>
                    <span className="font-semibold text-secondary">+{business.growthRate}%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {business.financials.monthlyRecurringRevenue && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Monthly Recurring Revenue</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(business.financials.monthlyRecurringRevenue)}</span>
                    </div>
                  )}
                  {business.financials.customerAcquisitionCost && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Customer Acquisition Cost</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(business.financials.customerAcquisitionCost)}</span>
                    </div>
                  )}
                  {business.financials.lifetimeValue && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Lifetime Value</span>
                      <span className="font-semibold text-secondary">{formatCurrency(business.financials.lifetimeValue)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Cash Flow</span>
                    <span className="font-semibold text-secondary">{business.financials.cashFlow}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operations */}
          <Card>
            <CardHeader>
              <CardTitle>Operations Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {business.operations.technologyStack && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Technology Stack</h4>
                      <p className="text-gray-600 text-sm">{business.operations.technologyStack}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Users className="text-secondary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Team Structure</h4>
                    <p className="text-gray-600 text-sm">{business.operations.teamStructure}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-accent h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Growth Opportunities</h4>
                    <p className="text-gray-600 text-sm">{business.operations.growthOpportunities}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarFallback className="text-lg">
                    {business.owner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h4 className="font-semibold text-gray-900">{business.owner.name}</h4>
                <p className="text-sm text-gray-600">{business.owner.title}</p>
                {business.isVerified && (
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-sm text-gray-600">Verified Seller</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleMatch}>
                  <Heart className="h-4 w-4 mr-2" />
                  Match Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save for Later
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">{business.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Years in Business</span>
                  <span className="font-medium">{business.yearsInBusiness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{business.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees</span>
                  <span className="font-medium">{business.employeeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Asking Price</span>
                  <span className="font-semibold text-accent">{formatCurrency(business.askingPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Market Size</span>
                  <Badge variant="secondary">{business.keyMetrics.marketSize}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Competition</span>
                  <Badge variant="outline">{business.keyMetrics.competition}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Scalability</span>
                  <Badge variant="secondary">{business.keyMetrics.scalability}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
