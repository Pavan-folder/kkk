import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Camera,
  CheckCircle,
  Clock,
  Bell,
  Shield,
  Download,
  Trash2,
  Save
} from 'lucide-react';

export default function ProfilePage() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    budgetRange: '500k-1m',
    preferredIndustries: ['Technology', 'Retail'],
    experience: '1-2',
    timeline: '6-12 months'
  });

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    dealUpdates: true,
    weeklyReports: false
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile:', profileData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const industries = [
    'Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Services', 'Real Estate'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-semibold">First Name</Label>
                  <Input
                    className="mt-2"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold">Last Name</Label>
                  <Input
                    className="mt-2"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Email Address</Label>
                <Input
                  type="email"
                  className="mt-2"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-semibold">Phone Number</Label>
                  <Input
                    type="tel"
                    className="mt-2"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold">Location</Label>
                  <Input
                    className="mt-2"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-semibold">Budget Range</Label>
                <Select value={profileData.budgetRange} onValueChange={(value) => setProfileData(prev => ({ ...prev, budgetRange: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m+">$5M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Preferred Industries</Label>
                <div className="grid grid-cols-2 gap-3">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={industry}
                        checked={profileData.preferredIndustries.includes(industry)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProfileData(prev => ({
                              ...prev,
                              preferredIndustries: [...prev.preferredIndustries, industry]
                            }));
                          } else {
                            setProfileData(prev => ({
                              ...prev,
                              preferredIndustries: prev.preferredIndustries.filter(i => i !== industry)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={industry} className="text-sm">{industry}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-semibold">Experience Level</Label>
                  <Select value={profileData.experience} onValueChange={(value) => setProfileData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
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
                  <Label className="text-sm font-semibold">Timeline</Label>
                  <Select value={profileData.timeline} onValueChange={(value) => setProfileData(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6-12 months">6-12 months</SelectItem>
                      <SelectItem value="1+ years">1+ years</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Match Notifications</p>
                  <p className="text-sm text-gray-600">Get notified when you have a new buyer match</p>
                </div>
                <Switch
                  checked={notifications.newMatches}
                  onCheckedChange={(checked) => handleNotificationChange('newMatches', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Message Notifications</p>
                  <p className="text-sm text-gray-600">Get notified of new messages from buyers</p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Deal Updates</p>
                  <p className="text-sm text-gray-600">Get notified about important deal milestones</p>
                </div>
                <Switch
                  checked={notifications.dealUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('dealUpdates', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Reports</p>
                  <p className="text-sm text-gray-600">Receive weekly activity summaries</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-600 mb-4">JPG, PNG up to 10MB</p>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Profile Completion</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Profile Completion</span>
                    <span className="font-medium text-secondary">87%</span>
                  </div>
                  <Progress value={87} />
                  <p className="text-sm text-gray-600">Complete verification to reach 100%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-1" />
                    <span className="text-sm font-medium text-secondary">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone Verified</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-1" />
                    <span className="text-sm font-medium text-secondary">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Identity Verified</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-accent mr-1" />
                    <span className="text-sm font-medium text-accent">Pending</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50">
                  <Bell className="h-4 w-4 mr-3" />
                  Notification Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50">
                  <Shield className="h-4 w-4 mr-3" />
                  Privacy Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-3" />
                  Export Data
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={handleSave} className="px-8">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
