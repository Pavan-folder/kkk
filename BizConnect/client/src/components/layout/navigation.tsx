import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Heart, 
  Settings, 
  MessageCircle, 
  FileText, 
  Bell,
  User,
  Handshake
} from 'lucide-react';

const navItems = [
  { href: '/discover', label: 'Discover', icon: Search },
  { href: '/matches', label: 'Matches', icon: Heart },
  { href: '/workflow', label: 'Workflow', icon: FileText },
  { href: '/messages', label: 'Messages', icon: MessageCircle },
];

export function Navigation() {
  const [location] = useLocation();
  const [notifications] = useState(3);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/discover" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Handshake className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">BizMatch</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2",
                        isActive ? "nav-active" : "nav-inactive"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.href === '/messages' && notifications > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </Button>
            
            <Link href="/profile">
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:block text-sm font-medium">Profile</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start flex items-center space-x-2",
                    isActive ? "nav-active" : "nav-inactive"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.href === '/messages' && notifications > 0 && (
                    <span className="ml-auto px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {notifications}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
