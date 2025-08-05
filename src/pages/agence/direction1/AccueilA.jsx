import React, { useState } from 'react';
import {
  Mail,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Share2,
  Plus,
  BarChart2,
  PieChart,
  AlertTriangle,
  List,
  Clock as ClockIcon,
  UserCheck,
} from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Données simulées pour les courriers récents
  const recentMails = [
    {
      id: 1,
      sender: 'Marie Dubois',
      subject: 'Demande de congé',
      type: 'Interne',
      status: 'pending',
      priority: 'high',
      date: '2025-08-02',
      time: '14:30'
    },
    {
      id: 2,
      sender: 'Service Comptabilité',
      subject: 'Facture Fournisseur #2024-001',
      type: 'Facture',
      status: 'processed',
      priority: 'medium',
      date: '2025-08-02',
      time: '13:15'
    },
    {
      id: 3,
      sender: 'Client SARL Martin',
      subject: 'Réclamation Produit',
      type: 'Réclamation',
      status: 'pending',
      priority: 'high',
      date: '2025-08-02',
      time: '11:45'
    },
    {
      id: 4,
      sender: 'Direction RH',
      subject: 'Nouvelle procédure',
      type: 'Circulaire',
      status: 'processed',
      priority: 'low',
      date: '2025-08-01',
      time: '16:20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processed': return 'Traité';
      case 'rejected': return 'Rejeté';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Gestion Courriers</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">DG</span>
                </div>
                <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                  <span className="text-sm font-medium">Directeur Général</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue dans votre espace de gestion des courriers</p>
        </div>

        {/* Stats Cards and Today's Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Courriers du jour</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm font-medium">+8%</span>
                  <span className="text-gray-500 text-sm">vs hier</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">En attente</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 text-sm font-medium">-12%</span>
                  <span className="text-gray-500 text-sm">vs hier</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Traités</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">7</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm font-medium">+15%</span>
                  <span className="text-gray-500 text-sm">vs hier</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Agents actifs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-600 text-sm font-medium">Stable</span>
                  <span className="text-gray-500 text-sm">aujourd'hui</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="text-purple-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Agenda du jour</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Réunion équipe</p>
                  <p className="text-xs text-gray-600">09:00 - 10:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Traitement urgent</p>
                  <p className="text-xs text-gray-600">14:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Recent Mail List */}
          <div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Courriers récents</h2>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Nouveau courrier
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher un courrier..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filtrer
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentMails.map((mail) => (
                  <div key={mail.id} className={`p-4 hover:bg-gray-50/50 transition-colors border-l-4 ${getPriorityColor(mail.priority)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900 truncate">{mail.subject}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mail.status)}`}>
                            {getStatusText(mail.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>De: {mail.sender}</span>
                          <span>•</span>
                          <span>{mail.type}</span>
                          <span>•</span>
                          <span>{mail.date} à {mail.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium py-2">
                  Voir tous les courriers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections for Director General */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Evolution */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Évolution mensuelle des courriers</h3>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-center text-gray-500">Graphique d'évolution mensuelle</p>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Répartition par département</h3>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-center text-gray-500">Graphique de répartition</p>
            </div>
          </div>

          {/* Critical Mails */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Courriers critiques non traités</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Courrier critique 1</p>
                  <p className="text-xs text-gray-600">Urgence élevée</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Courrier critique 2</p>
                  <p className="text-xs text-gray-600">Urgence moyenne</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Departments */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <List className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Top 5 des services les plus sollicités</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Service Comptabilité</p>
                  <p className="text-xs text-gray-600">25 courriers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Service RH</p>
                  <p className="text-xs text-gray-600">20 courriers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Times */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Délais moyens de traitement</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Service Comptabilité</p>
                  <p className="text-xs text-gray-600">2 jours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Service RH</p>
                  <p className="text-xs text-gray-600">1 jour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance des chefs de service</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Chef de service Comptabilité</p>
                  <p className="text-xs text-gray-600">Performance élevée</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Chef de service RH</p>
                  <p className="text-xs text-gray-600">Performance moyenne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
