import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCourriers } from '../direction1/direction1.controller';
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
  Eye,
  Share2,
  Plus,
  BarChart2,
  PieChart,
  AlertTriangle,
  List,
  Clock as ClockIcon,
  UserCheck,
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('Jour');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const { courriers, loading, error } = useCourriers();

  if (loading) return <p>Chargement des courriers...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const getStatusColor = (statut) => {
    switch (statut) {
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

  const getStatusText = (statut) => {
    switch (statut) {
      case 'pending': return 'En attente';
      case 'processed': return 'Traité';
      case 'rejected': return 'Rejeté';
      default: return 'Inconnu';
    }
  };

  const filterCourriersByStatus = (courriers, statusFilter) => {
    if (statusFilter === 'Tous') {
      return courriers;
    }
    const statusMap = {
      'Traité': 'processed',
      'En attente': 'pending',
      'Refusé': 'rejected'
    };
    const status = statusMap[statusFilter];
    return courriers.filter(courrier => courrier.statut === status);
  };

  const filteredCourriers = filterCourriersByStatus(courriers, statusFilter);

  // Données pour le graphique de répartition par département
  const departmentData = {
    labels: ['Comptabilité', 'RH', 'Ventes', 'Marketing', 'Technique'],
    datasets: [
      {
        label: 'Nombre de courriers',
        data: [25, 20, 30, 15, 10],
        backgroundColor: [
          'rgba(104, 124, 254, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(104, 124, 254, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  // Options pour le graphique
  const departmentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B5563',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Répartition des courriers par département',
        color: '#1F2937',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre de courriers',
          color: '#6B7280',
        },
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Départements',
          color: '#6B7280',
        },
        ticks: {
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
    barPercentage: 0.5,
    categoryPercentage: 0.8,
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
                <div className="flex flex-wrap items-end gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Rechercher un courrier..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                    <div className="relative">
                      <select
                        value={periodFilter}
                        onChange={(e) => setPeriodFilter(e.target.value)}
                        className="block appearance-none w-full bg-white/50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="Jour">Jour</option>
                        <option value="Semaine">Semaine</option>
                        <option value="Mois">Mois</option>
                        <option value="Année">Année</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block appearance-none w-full bg-white/50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Traité">Traité</option>
                        <option value="En attente">En attente</option>
                        <option value="Refusé">Refusé</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredCourriers.length > 0 ? (
                  filteredCourriers.map((mail) => (
                    <div key={mail.id} className={`p-4 hover:bg-gray-50/50 transition-colors border-l-4 ${getPriorityColor(mail.priority)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900 truncate">{mail.type_courrier || 'Sujet inconnu'}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mail.status)}`}>
                              {getStatusText(mail.statut)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>De: {mail.nom || 'Expéditeur inconnu'}</span>
                            <span>•</span>
                            <span>{mail.type_personne || 'Type inconnu'}</span>
                            <span>•</span>
                            <span>
                              {format(new Date(mail.created_at), 'dd MMMM yyyy HH:mm', { locale: fr })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500">Aucun courrier à afficher</p>
                )}
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
          {/* Department Distribution */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Répartition par département</h3>
            </div>
            <div className="h-64">
              <Bar data={departmentData} options={departmentOptions} />
            </div>
          </div>
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
