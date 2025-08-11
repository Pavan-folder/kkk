import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Questionnaire } from '@/components/business/questionnaire';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already onboarded (in a real app, this would check auth state)
    const isOnboarded = localStorage.getItem('user_onboarded');
    if (isOnboarded) {
      setLocation('/discover');
    }
  }, [setLocation]);

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserType(type);
  };

  const handleComplete = (data: any) => {
    // In a real app, this would send data to the backend
    console.log('Onboarding completed:', { userType, ...data });
    
    // Store onboarding completion
    localStorage.setItem('user_onboarded', 'true');
    localStorage.setItem('user_type', userType || '');
    localStorage.setItem('user_data', JSON.stringify(data));

    toast({
      title: "Profile Created Successfully!",
      description: "Welcome to BizMatch. Let's find your perfect business match.",
    });

    // Redirect to discover page
    setTimeout(() => {
      setLocation('/discover');
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Questionnaire 
          userType={userType}
          onUserTypeSelect={handleUserTypeSelect}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
