import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, Store } from 'lucide-react';

interface QuestionnaireProps {
  userType: 'buyer' | 'seller' | null;
  onUserTypeSelect: (type: 'buyer' | 'seller') => void;
  onComplete: (data: any) => void;
}

export function Questionnaire({ userType, onUserTypeSelect, onComplete }: QuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  if (!userType) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to BizMatch</h1>
          <p className="text-lg text-gray-600">Let's set up your profile to find the perfect business match</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">I am a...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:border-primary hover:bg-blue-50 transition-all duration-200"
              onClick={() => onUserTypeSelect('buyer')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Buyer</h3>
                <p className="text-gray-600">Looking to acquire a business</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-secondary hover:bg-green-50 transition-all duration-200"
              onClick={() => onUserTypeSelect('seller')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="text-secondary h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Seller</h3>
                <p className="text-gray-600">Looking to sell my business</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'buyer') {
    return <BuyerQuestionnaire onComplete={onComplete} />;
  }

  return <SellerQuestionnaire onComplete={onComplete} />;
}

function BuyerQuestionnaire({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    budgetRange: '',
    industries: [] as string[],
    experience: '',
    timeline: '',
    goals: ''
  });

  const steps = [
    'Investment Budget',
    'Industry Preferences', 
    'Experience & Goals'
  ];

  const budgetOptions = [
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k-1m', label: '$500K - $1M' },
    { value: '1m-5m', label: '$1M - $5M' },
    { value: '5m+', label: '$5M+' }
  ];

  const industries = [
    'Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Services', 'Other'
  ];

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        industries: [...prev.industries, industry]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        industries: prev.industries.filter(i => i !== industry)
      }));
    }
  };

  const canContinue = () => {
    switch (step) {
      case 0: return formData.budgetRange;
      case 1: return formData.industries.length > 0;
      case 2: return formData.experience && formData.timeline;
      default: return false;
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl">Buyer Profile</CardTitle>
          <div className="flex space-x-2">
            {steps.map((_, i) => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? 'bg-primary' : 'bg-gray-300'
                }`} 
              />
            ))}
          </div>
        </div>
        <Progress value={(step + 1) / steps.length * 100} />
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">What's your investment budget range?</h3>
            <div className="grid grid-cols-2 gap-3">
              {budgetOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.budgetRange === option.value ? "default" : "outline"}
                  className="p-4 h-auto text-left justify-start"
                  onClick={() => setFormData(prev => ({ ...prev, budgetRange: option.value }))}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Preferred industries (select all that apply)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Checkbox
                    id={industry}
                    checked={formData.industries.includes(industry)}
                    onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                  />
                  <Label htmlFor={industry} className="text-sm">{industry}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-semibold">Your acquisition experience</Label>
              <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-time">First-time buyer</SelectItem>
                  <SelectItem value="1-2">1-2 previous acquisitions</SelectItem>
                  <SelectItem value="3-5">3-5 previous acquisitions</SelectItem>
                  <SelectItem value="experienced">Experienced serial acquirer (5+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold">Timeline to close</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {['3-6 months', '6-12 months', '1+ years', 'Flexible'].map((timeline) => (
                  <Button
                    key={timeline}
                    variant={formData.timeline === timeline ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, timeline }))}
                  >
                    {timeline}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Investment goals</Label>
              <Textarea
                className="mt-2"
                placeholder="Describe your investment strategy and what you're looking for..."
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          
          {step < steps.length - 1 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={!canContinue()}
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={!canContinue()}
            >
              Complete Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SellerQuestionnaire({ onComplete }: { onComplete: (data: any) => void }) {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    revenueRange: '',
    yearsInBusiness: '',
    reasonForSelling: ''
  });

  const revenueOptions = [
    { value: 'under-250k', label: 'Under $250K' },
    { value: '250k-1m', label: '$250K - $1M' },
    { value: '1m-5m', label: '$1M - $5M' },
    { value: '5m+', label: '$5M+' }
  ];

  const canComplete = () => {
    return formData.businessName && formData.industry && formData.revenueRange && formData.yearsInBusiness;
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Seller Profile</CardTitle>
        <p className="text-gray-600">Tell us about your business</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold">Business name</Label>
          <Input
            className="mt-2"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          />
        </div>

        <div>
          <Label className="text-sm font-semibold">Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold">Annual revenue range</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {revenueOptions.map((option) => (
              <Button
                key={option.value}
                variant={formData.revenueRange === option.value ? "default" : "outline"}
                className="p-4 h-auto text-left justify-start"
                onClick={() => setFormData(prev => ({ ...prev, revenueRange: option.value }))}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">Years in business</Label>
          <Select value={formData.yearsInBusiness} onValueChange={(value) => setFormData(prev => ({ ...prev, yearsInBusiness: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select years in business" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-1">Less than 1 year</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5-10">5-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold">Reason for selling</Label>
          <Textarea
            className="mt-2"
            placeholder="Tell us why you're looking to sell..."
            value={formData.reasonForSelling}
            onChange={(e) => setFormData(prev => ({ ...prev, reasonForSelling: e.target.value }))}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            onClick={() => onComplete(formData)}
            disabled={!canComplete()}
            className="bg-secondary hover:bg-secondary/90"
          >
            Complete Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
