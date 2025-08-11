import { ChatInterface } from '@/components/messaging/chat-interface';

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Communicate with buyers and sellers throughout the acquisition process</p>
      </div>

      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
}
