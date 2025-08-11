import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search,
  Phone,
  Video,
  Info,
  Send,
  Paperclip,
  Smile
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isUser: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  dealName: string;
  unread: boolean;
  avatar: string;
}

export function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState<string>('michael-chen');
  const [messageText, setMessageText] = useState('');

  const conversations: Conversation[] = [
    {
      id: 'michael-chen',
      name: 'Michael Chen',
      lastMessage: 'Thanks for sharing the financials. When can we schedule a call?',
      timestamp: '2h',
      dealName: 'TechStart Solutions',
      unread: true,
      avatar: 'MC'
    },
    {
      id: 'sarah-williams',
      name: 'Sarah Williams',
      lastMessage: 'I\'d like to move forward with due diligence',
      timestamp: '1d',
      dealName: 'E-commerce Plus',
      unread: false,
      avatar: 'SW'
    },
    {
      id: 'david-rodriguez',
      name: 'David Rodriguez',
      lastMessage: 'Could you provide more details about the customer acquisition strategy?',
      timestamp: '3d',
      dealName: 'Digital Dynamics',
      unread: false,
      avatar: 'DR'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Michael Chen',
      content: 'Hi John, I\'ve reviewed your business profile and I\'m very interested in learning more about TechStart Solutions. The growth trajectory looks impressive!',
      timestamp: 'Yesterday, 2:30 PM',
      isUser: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Thank you for your interest, Michael! I\'d be happy to share more details. What specific areas would you like to know more about?',
      timestamp: 'Yesterday, 3:15 PM',
      isUser: true
    },
    {
      id: '3',
      sender: 'Michael Chen',
      content: 'I\'m particularly interested in your customer acquisition strategy, retention rates, and the technology stack. Also, could you share your financial performance over the last 3 years?',
      timestamp: 'Today, 10:45 AM',
      isUser: false
    },
    {
      id: '4',
      sender: 'You',
      content: 'Absolutely! I\'ll prepare a comprehensive overview covering all those areas. Thanks for sharing the financials. When can we schedule a call to discuss in detail?',
      timestamp: 'Today, 2:20 PM',
      isUser: true
    }
  ];

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-10" 
              placeholder="Search conversations" 
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation === conversation.id 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{conversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{conversation.name}</p>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {conversation.dealName}
                      </Badge>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{activeConversation?.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{activeConversation?.name}</h3>
                <p className="text-sm text-gray-600">{activeConversation?.dealName} Deal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.isUser ? 'justify-end' : ''}`}>
              {!message.isUser && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="text-xs">{activeConversation?.avatar}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex-1 max-w-md ${message.isUser ? 'max-w-xs' : ''}`}>
                <div className={`rounded-lg p-3 shadow-sm ${
                  message.isUser 
                    ? 'bg-primary text-white' 
                    : 'bg-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : ''}`}>
                  {message.timestamp}
                </p>
              </div>
              {message.isUser && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="text-xs">JS</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input 
                className="pr-12"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
