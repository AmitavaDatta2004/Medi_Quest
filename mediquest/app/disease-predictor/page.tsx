import { Suspense } from 'react';
import SymptomChecker from '@/components/SymptomChecker';
import { Activity, Heart, Sparkles, Shield } from 'lucide-react';

// Decorative particle component
function Particle({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={`particle ${className}`}
      style={{
        '--translate-x': `${Math.random() * 200 - 100}px`,
        '--translate-y': `${Math.random() * 200 - 100}px`,
        ...style
      } as React.CSSProperties}
    >
      <Sparkles className="h-4 w-4 text-primary/20" />
    </div>
  );
}

export default function Home() {
  // Generate multiple particles
  const particles = Array.from({ length: 15 }, (_, i) => (
    <Particle 
      key={i}
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
        {particles}
      </div>

      {/* Hero Section */}
      <section className="mt-20 container mx-auto px-4 py-16 text-center relative">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="h-16 w-16 text-primary animate-pulse" />
            <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-float" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate relative inline-block">
          AI-Powered Disease Prediction
          <span className="cursor-blink">|</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-scale">
          Get instant insights about your health based on your symptoms using advanced AI analysis.
        </p>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 gap-8">
          <div className="glass-card rounded-lg shadow-lg p-6 hover-lift">
            <Suspense fallback={<div>Loading symptom checker...</div>}>
              <SymptomChecker />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 relative">
        <h2 className="text-3xl font-bold text-center mb-12 text-gradient-animate">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <Activity className="h-8 w-8" />,
    title: 'Smart Symptom Analysis',
    description: 'Advanced AI-powered analysis of your symptoms for accurate disease prediction.',
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Comprehensive Health Insights',
    description: 'Get detailed information about potential conditions, treatments, and preventive measures.',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Personalized Recommendations',
    description: 'Receive tailored diet plans, exercise routines, and lifestyle suggestions.',
  },
];

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="gradient-border hover-lift">
      <div className="p-6 h-full card-hover-effect">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary glow animate-glow">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center text-gradient-animate">
          {title}
        </h3>
        <p className="text-muted-foreground text-center">{description}</p>
      </div>
    </div>
  );
}