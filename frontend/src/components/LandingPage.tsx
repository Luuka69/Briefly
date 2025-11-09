import { 
  ArrowRight, CheckCircle, Newspaper, Shield, Zap, 
  Sparkles, Globe, TrendingUp, Users, Clock, Brain,
  Play
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BrieflyLogo } from './BrieflyLogo';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { type Page } from '../App'; 

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced natural language processing analyzes and summarizes news from thousands of sources.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Verified & Trusted',
      description: 'Only content from verified, reputable news organizations makes it to your feed.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Breaking news delivered instantly as events unfold around the world.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Stay informed about local and international events that matter to you.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Personalized For You',
      description: 'Your news feed adapts to your interests and reading patterns over time.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Get the essential information in seconds, without scrolling through endless feeds.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '1M+', label: 'Articles Analyzed Daily' },
    { value: '100+', label: 'News Sources' },
    { value: '4.9★', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-white py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-sm">Powered by Advanced AI</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-slate-900 leading-tight">
                  Your AI Press Agent.
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Stay Briefed.
                  </span>
                </h1>
                
                <p className="text-slate-600 max-w-lg text-lg">
                  Briefly summarizes and updates you with the latest, verified news in real time. 
                  Get personalized briefings from trusted sources, powered by advanced AI.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('chatbot')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/30 group"
                >
                  Try Briefly <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('subscribe')}
                  className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600"
                >
                  <Play size={18} className="mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={18} className="text-green-600" />
                  </div>
                  <span className="text-sm text-slate-600">Real-time updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={18} className="text-blue-600" />
                  </div>
                  <span className="text-sm text-slate-600">Verified sources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={18} className="text-purple-600" />
                  </div>
                  <span className="text-sm text-slate-600">No credit card</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative lg:h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1730817403180-e1efaba2f0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbmV3cyUyMGFwcHxlbnwxfHx8fDE3NjEzMDUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Smartphone News App"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute top-10 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-200"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Newspaper className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Daily Briefing</div>
                    <div className="text-sm text-slate-900">42 new updates</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-200"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Trending Now</div>
                    <div className="text-sm text-slate-900">AI & Tech</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-blue-100 text-blue-700 px-4 py-1">Features</Badge>
            <h2 className="text-slate-900">Why Choose Briefly?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Cutting through the noise to deliver what matters most. Our AI-powered platform 
              transforms how you consume news.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 space-y-4 border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full group">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* About Text with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1609336390509-22ea6fdf62e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjByZWFkaW5nJTIwbW9ybmluZ3xlbnwxfHx8fDE3NjEzMDUwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Reading News"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <BrieflyLogo size="lg" />
                <h2 className="text-slate-900">About Briefly</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Briefly is your AI-powered press agent, designed to cut through the noise and deliver 
                what matters most. Using cutting-edge natural language processing and machine learning, 
                we analyze thousands of news articles from trusted sources every minute.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to empower you with the information you need, when you need it—without 
                the overwhelm. Whether you're catching up on your morning briefing or diving deep into 
                specific topics, Briefly adapts to your needs.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge variant="outline" className="px-3 py-1 border-blue-200 text-blue-700">NLP Technology</Badge>
                <Badge variant="outline" className="px-3 py-1 border-purple-200 text-purple-700">Machine Learning</Badge>
                <Badge variant="outline" className="px-3 py-1 border-green-200 text-green-700">Real-time Analysis</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section id="sources" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-purple-100 text-purple-700 px-4 py-1">Trusted Partners</Badge>
            <h2 className="text-slate-900">Premium News Sources</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We aggregate news from the world's most reputable and trustworthy news organizations 
              to ensure you get accurate, unbiased information.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'BBC News', color: 'from-red-500 to-pink-500' },
              { name: 'Reuters', color: 'from-orange-500 to-red-500' },
              { name: 'The Guardian', color: 'from-blue-500 to-cyan-500' },
              { name: 'Associated Press', color: 'from-purple-500 to-pink-500' },
              { name: 'NPR', color: 'from-indigo-500 to-blue-500' },
              { name: 'Financial Times', color: 'from-pink-500 to-rose-500' },
              { name: 'The Economist', color: 'from-green-500 to-emerald-500' },
              { name: 'Bloomberg', color: 'from-cyan-500 to-blue-500' }
            ].map((source, idx) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-white border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${source.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  <div className="text-center text-slate-700 relative z-10">{source.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Visual showcase */}
          <motion.div
            className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1558181445-eca4774b2a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBtaW5pbWFsfGVufDF8fHx8MTc2MTE5NzYwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern Workspace"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-white mb-2">News from everywhere, curated just for you</h3>
                <p className="text-slate-200">Access premium content from over 100 trusted sources worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-green-100 text-green-700 px-4 py-1">Get in Touch</Badge>
            <h2 className="text-slate-900">Contact Us</h2>
            <p className="text-slate-600">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-slate-200 shadow-xl">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-slate-700">Name</label>
                  <Input 
                    placeholder="Enter your name" 
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700">Message</label>
                  <Textarea 
                    placeholder="Tell us what's on your mind..." 
                    className="border-slate-300 min-h-32 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white">Ready to Stay Briefed?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Join thousands of users who trust Briefly to keep them informed. 
              Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('chatbot')}
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-xl"
              >
                Start Free Trial <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('subscribe')}
                className="border-2 border-white text-white hover:bg-white/10"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
