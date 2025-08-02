import React, { useState, useEffect } from 'react';
import { User, Building2, ArrowLeft, CheckCircle, Users, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

const ChoixType = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const profileTypes = [
    {
      id: 'physique',
      title: 'Personne Physique',
      subtitle: 'Particulier',
      description: 'Pour vos démarches personnelles et individuelles',
      icon: <User className="w-8 h-8" />,
      route: '/formulaire-physique',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      features: ['Démarches simplifiées', 'Interface intuitive', 'Suivi personnalisé']
    },
    {
      id: 'morale',
      title: 'Personne Morale',
      subtitle: 'Entreprise / Organisation',
      description: 'Pour vos démarches professionnelles et institutionnelles',
      icon: <Building2 className="w-8 h-8" />,
      route: '/formulaire-morale',
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
      features: ['Gestion d\'entreprise', 'Documents officiels', 'Support dédié']
    }
  ];

  const handleCardClick = (type) => {
    setSelectedType(type.id);
    // Simuler la navigation
    setTimeout(() => {
      window.location.href = type.route;
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-bounce" />
        
        {/* Floating elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Back button */}
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 group transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Retour à l'accueil</span>
          </a>

          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Quel est votre{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              type de profil
            </span>{' '}
            ?
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sélectionnez votre profil pour accéder au formulaire adapté à vos besoins
          </p>
        </div>

        {/* Profile Cards */}
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full transition-all duration-1000 transform delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {profileTypes.map((type, index) => (
            <div
              key={type.id}
              className={`group relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 cursor-pointer border border-white/50 overflow-hidden ${
                selectedType === type.id ? 'scale-95' : 'hover:scale-105'
              } ${hoveredCard === type.id ? 'z-10' : ''}`}
              onMouseEnter={() => setHoveredCard(type.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(type)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
              
              {/* Animated border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}
                   style={{ padding: '2px' }}>
                <div className="bg-white rounded-3xl w-full h-full" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {type.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {type.title}
                    </h3>
                    <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <p className={`text-sm font-medium bg-gradient-to-r ${type.color} bg-clip-text text-transparent mb-3`}>
                    {type.subtitle}
                  </p>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {type.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.color} rounded-full`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${type.color} group-hover:${type.hoverColor} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <span>Continuer</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Help section */}
        <div className={`mt-12 text-center transition-all duration-1000 transform delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <Users className="w-4 h-4" />
            <span>Besoin d'aide ? Contactez notre support</span>
          </div>
        </div>
      </div>

      {/* Loading overlay when selected */}
      {selectedType && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex items-center gap-4">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-700 font-medium">Chargement...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoixType;