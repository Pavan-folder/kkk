import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/business/profile-card';
import { sampleBusinesses } from '@/lib/data';
import { BusinessProfile } from '@/types/business';
import { useToast } from '@/hooks/use-toast';
import { Filter, SortAsc } from 'lucide-react';

export default function DiscoverPage() {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has completed onboarding
    const isOnboarded = localStorage.getItem('user_onboarded');
    if (!isOnboarded) {
      setLocation('/onboarding');
      return;
    }

    // Load businesses (in a real app, this would be an API call)
    setBusinesses(sampleBusinesses);
  }, [setLocation]);

  const handleAccept = (businessId: string) => {
    // In a real app, this would create a match in the backend
    const business = businesses.find(b => b.id === businessId);
    
    toast({
      title: "It's a match!",
      description: `You and ${business?.name} can now message each other.`,
      duration: 3000,
    });

    // Remove the business from the list
    setBusinesses(prev => prev.filter(b => b.id !== businessId));
  };

  const handleReject = (businessId: string) => {
    // Remove the business from the list
    setBusinesses(prev => prev.filter(b => b.id !== businessId));
  };

  const handleViewDetails = (businessId: string) => {
    setLocation(`/profile-detail/${businessId}`);
  };

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No more businesses to review</h2>
        <p className="text-gray-600 mb-8">You've reviewed all available businesses in your criteria. Check back later for new opportunities!</p>
        <Button onClick={() => setLocation('/matches')}>
          View Your Matches
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Sellers</h1>
          <p className="text-gray-600">Review seller profiles and find your perfect business match</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <ProfileCard
            key={business.id}
            business={business}
            onAccept={handleAccept}
            onReject={handleReject}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
