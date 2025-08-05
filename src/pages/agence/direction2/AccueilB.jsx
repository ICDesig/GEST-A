import React, { useState, useEffect } from 'react'; 
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
  Plus,
  X,
  Download,
  User,
  MapPin,
  Phone,
  Paperclip,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentMails, setRecentMails] = useState([]);
  const [allCourriers, setAllCourriers] = useState([]);
  const [filteredCourriers, setFilteredCourriers] = useState([]); // Courriers filtrés par période
  const [statuts, setStatuts] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nbTotal, setNbTotal] = useState(0);
  const [nbRecu, setNbRecu] = useState(0);
  const [nbAttente, setNbAttente] = useState(0);
  const [nbTraite, setNbTraite] = useState(0);
  const [nbEncours, setNbEncours] = useState(0);
  const [periode, setPeriode] = useState('day');
  const [stats, setStats] = useState({ total: 0, parStatut: [] });
  const [notificationCount, setNotificationCount] = useState(0);
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCourrierDetail, setShowCourrierDetail] = useState(false);
  const [selectedCourrier, setSelectedCourrier] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configuration API
  const API_BASE_URL = 'http://192.168.100.14:8000';
  
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur API ${endpoint}:`, error);
      throw error;
    }
  };

  // Charger les statuts
  useEffect(() => {
    apiCall('/api/gosoft/statuts')
      .then(data => {
        if (data && Array.isArray(data.items)) {
          setStatuts(data.items);
        } else {
          console.error('Format inattendu des statuts', data);
        }
      })
      .catch(err => {
        console.error('Erreur API statuts:', err);
      });
  }, []);

  // Fonction pour filtrer les courriers par période
  const filterCourriersByPeriod = (courriers, period) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate = new Date(now.getFullYear(), now.getMonth(), diff);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    return courriers.filter(courrier => {
      const courrierDate = new Date(courrier.created_at);
      return courrierDate >= startDate && courrierDate <= now;
    });
  };

  // Fonction pour récupérer TOUS les courriers
  const fetchAllCourriers = async () => {
    try {
      setLoading(true);
      let allData = [];
      let page = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await apiCall(`/api/gosoft/courriers?page=${page}`);
        if (response && Array.isArray(response.items)) {
          const mailsFormates = response.items.map(item => {
            const statutNom = getNomStatut(item.statut);
            return {
              id: item.id,
              sender: item.nom_structure || 'Inconnu',
              subject: item.code || 'Sans objet',
              type: item.type_courrier || 'Inconnu',
              status: statutNom,
              priority: 'medium',
              date: new Date(item.created_at).toLocaleDateString(),
              time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              created_at: item.created_at,
              // Données complètes pour la vue détaillée
              fullData: item
            };
          });
          
          allData = [...allData, ...mailsFormates];
          
          if (page >= response.last_page) {
            hasMorePages = false;
            setLastPage(response.last_page);
          } else {
            page++;
          }
        } else {
          hasMorePages = false;
        }
      }

      setAllCourriers(allData);
      
      // Appliquer le filtre de période actuel
      applyPeriodFilter(allData, periode);

      // Types uniques
      const typesUniques = [...new Set(allData.map(mail => mail.type))];
      setTypes(typesUniques);

    } catch (err) {
      console.error('Erreur lors de la récupération de tous les courriers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Appliquer le filtre de période et calculer les statistiques
  const applyPeriodFilter = (courriers, period) => {
    const filtered = filterCourriersByPeriod(courriers, period);
    setFilteredCourriers(filtered);
    
    // Calculer les statistiques basées sur les courriers filtrés
    setNbTotal(filtered.length);
    setNbRecu(filtered.filter(m => m.status.toLowerCase().includes('reçu')).length);
    setNbAttente(filtered.filter(m => m.status.toLowerCase().includes('attente')).length);
    setNbTraite(filtered.filter(m => m.status.toLowerCase().includes('trait')).length);
    setNbEncours(filtered.filter(m => m.status.toLowerCase().includes('cours')).length);

    // Notifications : courriers du jour
    const today = new Date().toDateString();
    const todayMails = courriers.filter(mail => 
      new Date(mail.created_at).toDateString() === today
    );
    setNotificationCount(todayMails.length);
    
    // Mettre à jour l'affichage des courriers récents
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setRecentMails(filtered.slice(startIndex, endIndex));
    setLastPage(Math.ceil(filtered.length / itemsPerPage));
  };

  const getNomStatut = (id) => {
    const statut = statuts.find(s => s.id === id);
    return statut ? statut.nom : 'Inconnu';
  };

  // Charger tous les courriers au démarrage
  useEffect(() => {
    if (statuts.length > 0) {
      fetchAllCourriers();
    }
  }, [statuts]);

  // Mise à jour lors du changement de page
  useEffect(() => {
    if (filteredCourriers.length > 0 && !searchTerm.trim()) {
      const itemsPerPage = 10;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setRecentMails(filteredCourriers.slice(startIndex, endIndex));
    }
  }, [currentPage, filteredCourriers, searchTerm]);

  // Récupérer les statistiques API par période
  const fetchStats = (periodeChoisie = 'day') => {
    apiCall(`/api/gosoft/statistiques?periode=${periodeChoisie}`)
      .then(data => {
        if (data && data.status_code === 200) {
          setStats({
            total: data.total_courriers || 0,
            parStatut: data.courriers_par_statut || []
          });
        } else {
          console.error("Erreur format des statistiques:", data);
        }
      })
      .catch(err => console.error("Erreur API stats:", err));
  };

  useEffect(() => {
    fetchStats('day');
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reçu': return 'bg-yellow-100 text-yellow-800';
      case 'En Cours': return 'bg-blue-100 text-blue-800';
      case 'Traité': return 'bg-green-100 text-green-800';
      case 'Refusé': return 'bg-red-100 text-red-800';
      case 'Archivé': return 'bg-gray-200 text-gray-700';
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

  const getPeriodLabel = (period) => {
    switch (period) {
      case 'day': return 'Aujourd\'hui';
      case 'week': return 'Cette semaine';
      case 'month': return 'Ce mois';
      case 'year': return 'Cette année';
      default: return 'Aujourd\'hui';
    }
  };

  // Filtrage pour la recherche
  const searchFilteredMails = searchTerm.trim() 
    ? filteredCourriers.filter(mail => {
        const searchLower = searchTerm.toLowerCase();
        return (
          mail.subject.toLowerCase().includes(searchLower) ||
          mail.sender.toLowerCase().includes(searchLower) ||
          mail.status.toLowerCase().includes(searchLower) ||
          mail.type.toLowerCase().includes(searchLower)
        );
      })
    : recentMails;

  // Pagination pour les résultats de recherche
  const itemsPerPage = 10;
  const totalFilteredPages = Math.ceil(searchFilteredMails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMails = searchTerm.trim() 
    ? searchFilteredMails.slice(startIndex, endIndex)
    : searchFilteredMails;

  const handlePeriodChange = (newPeriod) => {
    setPeriode(newPeriod);
    setCurrentPage(1);
    applyPeriodFilter(allCourriers, newPeriod);
    fetchStats(newPeriod);
    setShowPeriodFilter(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewCourrier = async (courrier) => {
    try {
      // Récupérer les détails complets du courrier
      const response = await apiCall(`/api/gosoft/courriers/${courrier.id}`);
      setSelectedCourrier(response.data || courrier.fullData);
      setShowCourrierDetail(true);
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      // Fallback sur les données disponibles
      setSelectedCourrier(courrier.fullData);
      setShowCourrierDetail(true);
    }
  };

  const getTodayMails = () => {
    const today = new Date().toDateString();
    return allCourriers.filter(mail => 
      new Date(mail.created_at).toDateString() === today
    );
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
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </button>
                
                {/* Dropdown des notifications */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Courriers d'aujourd'hui</h3>
                      <p className="text-sm text-gray-600">{notificationCount} nouveau(x) courrier(s)</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {getTodayMails().slice(0, 5).map(mail => (
                        <div 
                          key={mail.id} 
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                          onClick={() => {
                            handleViewCourrier(mail);
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Mail className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{mail.subject}</p>
                              <p className="text-sm text-gray-600 truncate">De: {mail.sender}</p>
                              <p className="text-xs text-gray-500">{mail.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {getTodayMails().length === 0 && (
                        <p className="p-4 text-center text-gray-500">Aucun courrier aujourd'hui</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <LogOut className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section avec filtre de période */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
            <p className="text-gray-600">
              Statistiques et courriers - {getPeriodLabel(periode)}
            </p>
          </div>
          
          {/* Filtre de période */}
          <div className="relative">
            <button
              onClick={() => setShowPeriodFilter(!showPeriodFilter)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{getPeriodLabel(periode)}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showPeriodFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  {[
                    { value: 'day', label: 'Aujourd\'hui' },
                    { value: 'week', label: 'Cette semaine' },
                    { value: 'month', label: 'Ce mois' },
                    { value: 'year', label: 'Cette année' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handlePeriodChange(option.value)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        periode === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats Cards - Statistiques filtrées par période */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Courriers</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{nbTotal}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm font-medium">{getPeriodLabel(periode)}</span>
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
                <p className="text-gray-600 text-sm font-medium">Reçus</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{nbRecu}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-yellow-600 text-sm font-medium">Nouveaux</span>
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
                <p className="text-gray-600 text-sm font-medium">En attente</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{nbAttente}</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-600 text-sm font-medium">À traiter</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-orange-600 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Traités</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{nbTraite}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm font-medium">Terminés</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Section statistiques API par période */}
        {stats.total > 0 && (
          <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition par statut - {getPeriodLabel(periode)} ({stats.total} courriers)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.parStatut.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-sm text-gray-600">{stat.statut}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content - Liste des courriers filtrés */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {searchTerm.trim() ? 
                    `Résultats de recherche (${searchFilteredMails.length})` : 
                    `Courriers - ${getPeriodLabel(periode)} (${filteredCourriers.length})`
                  }
                </h2>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Nouveau courrier
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`Rechercher dans les courriers (${getPeriodLabel(periode).toLowerCase()})...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                  />
                </div>
                {loading && (
                  <div className="text-blue-600 text-sm">Chargement...</div>
                )}
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {paginatedMails.length > 0 ? (
                paginatedMails.map(mail => (
                  <div key={mail.id} className={`p-4 hover:bg-gray-50/50 transition-colors border-l-4 ${getPriorityColor(mail.priority)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900 truncate">{mail.subject}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mail.status)}`}>
                            {mail.status}
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
                        <button 
                          onClick={() => handleViewCourrier(mail)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-8 text-center text-gray-500">
                  {searchTerm.trim() ? 
                    'Aucun courrier trouvé pour cette recherche.' : 
                    `Aucun courrier pour ${getPeriodLabel(periode).toLowerCase()}.`
                  }
                </p>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} sur {searchTerm.trim() ? totalFilteredPages : lastPage}
                {searchTerm.trim() && ` • ${filteredMails.length} résultats`}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, searchTerm.trim() ? totalFilteredPages : lastPage))}
                disabled={currentPage === (searchTerm.trim() ? totalFilteredPages : lastPage)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;