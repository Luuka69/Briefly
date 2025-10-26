import { CheckCircle, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SubscribePageProps {
  onNavigate: (page: string) => void;
}

export function SubscribePage({ onNavigate }: SubscribePageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('chatbot');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-slate-900">Subscribe to Briefly Premium</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get unlimited access to personalized news briefings, real-time updates, 
            and advanced AI-powered insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Subscription Form */}
          <Card className="p-8 border-slate-200 shadow-lg">
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="space-y-2">
                <label className="text-slate-700">Full Name</label>
                <Input 
                  placeholder="John Doe" 
                  className="border-slate-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700">Email</label>
                <Input 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="border-slate-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="border-slate-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700">Payment Method</label>
                <div className="flex items-center space-x-4 p-4 border border-slate-300 rounded-lg">
                  <CreditCard className="text-slate-400" size={24} />
                  <div className="flex-1 text-slate-600 text-sm">Credit or Debit Card</div>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">VISA</div>
                    <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs">MC</div>
                    <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">PP</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Input 
                  placeholder="Card Number" 
                  className="border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="MM/YY" 
                  className="border-slate-300"
                  required
                />
                <Input 
                  placeholder="CVV" 
                  className="border-slate-300"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Chatbot
              </Button>
            </form>
          </Card>

          {/* Pricing Card */}
          <div className="space-y-6">
            <Card className="p-6 border-slate-200 bg-white">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    billingCycle === 'monthly' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    billingCycle === 'yearly' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Yearly
                </button>
              </div>

              <div className="text-center space-y-4">
                <div>
                  <div className="text-slate-900">
                    <span className="text-5xl">${billingCycle === 'monthly' ? '19' : '199'}</span>
                  </div>
                  <div className="text-slate-600">
                    per {billingCycle === 'monthly' ? 'month' : 'year'}
                  </div>
                  {billingCycle === 'yearly' && (
                    <Badge className="mt-2 bg-green-100 text-green-700">
                      Save $29
                    </Badge>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-6 space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Unlimited AI-powered news summaries</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Real-time breaking news alerts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Personalized news feed</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Advanced topic filtering</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Access to premium sources</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Chat history and saved articles</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-600 text-sm">Priority customer support</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-200 bg-blue-50">
              <div className="space-y-2">
                <div className="text-slate-900">30-Day Money-Back Guarantee</div>
                <p className="text-slate-600 text-sm">
                  Try Briefly risk-free. If you're not completely satisfied within the first 
                  30 days, we'll refund your subscription—no questions asked.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
