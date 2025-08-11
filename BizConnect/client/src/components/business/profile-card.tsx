import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BusinessProfile } from '@/types/business';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  X, 
  Eye,
  CheckCircle
} from 'lucide-react';

interface ProfileCardProps {
  business: BusinessProfile;
  onAccept: (businessId: string) => void;
  onReject: (businessId: string) => void;
  onViewDetails: (businessId: string) => void;
}

export function ProfileCard({ business, onAccept, onReject, onViewDetails }: ProfileCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onReject(business.id);
    }, 300);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  return (
    <Card 
      className={`card-hover overflow-hidden border border-gray-100 transition-all duration-300 ${
        isAnimating ? 'transform -translate-x-full opacity-0' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={business.images[0]} 
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          {business.isVerified && (
            <Badge className="bg-secondary text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              VERIFIED
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
            {business.industry}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{business.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-secondary">
              {formatCurrency(business.annualRevenue)}
            </div>
            <div className="text-xs text-gray-500">Annual Revenue</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{business.yearsInBusiness} years</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{business.employeeCount} employees</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleReject}
          >
            <X className="h-4 w-4 mr-2" />
            Pass
          </Button>
          <Button 
            className="flex-1 bg-secondary hover:bg-secondary/90"
            onClick={() => onAccept(business.id)}
          >
            <Heart className="h-4 w-4 mr-2" />
            Match
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onViewDetails(business.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
