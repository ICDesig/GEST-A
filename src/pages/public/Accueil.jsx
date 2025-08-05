import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, ArrowRight, Sparkles, FileText, Clock, Shield } from 'lucide-react';
//import '../../index.css';

const Accueil = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Interface Intuitive",
      description: "Soumettez vos courriers en quelques clics"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Traitement Rapide",
      description: "Vos demandes traitées efficacement"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sécurisé",
      description: "Vos données protégées et confidentielles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
            transition: 'all 2s ease-out'
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header Section */}
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Logo/Brand area */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl mb-6 transform hover:rotate-6 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-bounce">
              <CheckCircle className="w-4 h-4 text-white m-1" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            GEC (Gestion Electronique des Courriers)
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            La solution moderne pour vos courriers
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Simplifiez vos démarches administratives avec notre plateforme intuitive. 
            Soumettez, suivez et gérez vos courriers en toute simplicité.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <a 
              href="/choix-type" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              Soumettre un courrier
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 transform delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center gap-2 text-gray-400">
          <Mail className="w-5 h-5" />
          <span className="text-sm">Votre partenaire numérique de confiance</span>
        </div>
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-30 animate-pulse pointer-events-none" 
           style={{ 
             background: `conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)`,
             animation: 'spin 20s linear infinite'
           }} />
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Accueil;