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
  Eye,
  Edit,
  Trash2,
  Plus
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
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                  <span className="text-sm font-medium">Agent</span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Administrateur</h1>
            <p className="text-gray-600">Bienvenue dans votre espace de gestion d'utilisateurs</p>
          </div>

          <div className="p-6 border-b border-gray-200">
                
                {/* Search and Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher un utilisateur..."
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

          {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 text-sm font-medium">Nombre d'utilisateurs</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                      <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 text-sm font-medium">+8%</span>
                      <span className="text-gray-500 text-sm">vs hier</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                      <Users className="text-purple-700 w-6 h-6" />
                    </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                    href="/agence/utilisateurs/liste-utilisateurs"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                    >
                    Voir la liste
                    </a>
                  </div>
                  </div>

                  <div className="bg-yellow-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-yellow-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 text-sm font-medium"> Activité récente</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                      <div className="flex items-center gap-1 mt-2">
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 text-sm font-medium">-12%</span>
                      <span className="text-gray-500 text-sm">vs hier</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center">
                      <Clock className="text-yellow-700 w-6 h-6" />
                    </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                    href=""
                    className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors w-full justify-center"
                    >
                    Voir tout le journal
                    </a>
                  </div>
                  </div>

                  <div className="bg-green-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-green-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 text-sm font-medium">Exportation des rapports
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">7</p>
                      <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 text-sm font-medium">+15%</span>
                      <span className="text-gray-500 text-sm">vs hier</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                      <FileText className="text-green-700 w-6 h-6" />
                    </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                    href=""
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full justify-center"
                    >
                    Exporter maintenant
                    </a>
                  </div>
                  </div>

                  <div className="bg-indigo-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-indigo-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700 text-sm font-medium">Agents actifs</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
                      <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600 text-sm font-medium">Stable</span>
                      <span className="text-gray-500 text-sm">aujourd'hui</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center">
                      <Users className="text-indigo-700 w-6 h-6" />
                    </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                    href=""
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full justify-center"
                    >
                    Voir les connexions
                    </a>
                  </div>
                  </div>
                  {/* Carte Création Utilisateur */}
              <div className="bg-blue-200/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                <div>
            <p className="text-gray-700 text-sm font-medium flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-500" />
              Création utilisateur
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">Ajouter</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-blue-600 text-sm font-medium">Créer un nouvel utilisateur</span>
            </div>
                </div>
                <div className="mt-4">
            {/* Remplacez ce bouton par un lien ou une logique de boîte de dialogue selon votre besoin */}
            <a href="/agence/utilisateurs/form-utilisateur"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
              //onClick={(FormUtilisateur) => setShowUserDialog(true)} // Exemple pour ouvrir une boîte de dialogue
            >
              <Plus className="w-4 h-4" />
              Ajouter un utilisateur
              
            </a>
            {/* Placez ici la logique de redirection ou de boîte de dialogue */}
                </div>
              </div>
              {/* Carte Création Catégorie de Courrier */}
              <div className="bg-green-200/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-green-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                <div>
            <p className="text-gray-700 text-sm font-medium flex items-center gap-1">
              <FileText className="w-4 h-4 text-green-500" />
              Création catégorie
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">Ajouter</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-green-600 text-sm font-medium">Créer une nouvelle catégorie de courrier</span>
            </div>
                </div>
                <div className="mt-4">
            <a href="/agence/utilisateurs/form-categorie"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full justify-center"
            >
              <Plus className="w-4 h-4" />
              Ajouter une catégorie
            </a>
                </div>
              </div>
            {/* Carte Alertes Système */}
                  <div className="bg-red-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                    <div>
                    <p className="text-gray-700 text-sm font-medium flex items-center gap-1">
                      <Bell className="w-4 h-4 text-red-500" />
                      Alertes système
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-red-600 text-sm font-medium">Nouvelles alertes</span>
                    </div>
                    </div>
                    <div className="mt-4">
                    <a
                    href="/agence/agents"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full justify-center"
                    >
                    Gerer les alertes
                    </a>
                  </div>
                  </div>
                  
                    {/* Carte Paramètres */}
              <div className="bg-gray-200/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-300 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 text-sm font-medium">Paramètres</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">1</p>
              <div className="flex items-center gap-1 mt-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 text-sm font-medium">Configurer</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
              <Settings className="text-gray-700 w-6 h-6" />
            </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
       
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 p-3 text-left rounded-lg transition-colors border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 shadow"
                  style={{ boxShadow: '0 2px 8px 0 rgba(59,130,246,0.08)' }}
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Réinitialiser</span>
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 p-3 text-left rounded-lg transition-colors border-2 border-green-200 bg-green-50 hover:bg-green-100 shadow"
                  style={{ boxShadow: '0 2px 8px 0 rgba(34,197,94,0.08)' }}
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">Générer rapport</span>
                </button>
                <a
                  href="/agence/roles/ajout-role"
                  className="flex-1 flex items-center justify-center gap-2 p-3 text-left rounded-lg transition-colors border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 shadow"
                  style={{ boxShadow: '0 2px 8px 0 rgba(139,92,246,0.08)' }}
                >
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Gérer les rôles</span>
                </a>
              </div>
            </div>
            {/* <div className="bg-white/70 backdrop-blur-sm rounded-2x2 shadow-sm border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Agenda du jour</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Réunion équipe</p>
                    <p className="text-xs text-gray-600">09:00 - 10:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Traitement urgent</p>
                    <p className="text-xs text-gray-600">14:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* System Status */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État du système</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Base de données</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Opérationnel</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Serveur mail</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Opérationnel</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sauvegarde</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-600">En cours</span>
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