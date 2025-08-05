import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [recentMails, setRecentMails] = useState([]);
  const [nom, setNom] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);


 useEffect(() => {
  const api = axios.create({
    baseURL: 'http://192.168.100.14:8000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  api.get(`/api/gosoft/courriers?page=${currentPage}`)
    .then(res => {
      if (res.data && Array.isArray(res.data.items)) {
        const mailsFormates = res.data.items.map(item => ({
          id: item.id,
          sender: item.nom_structure || 'Inconnu',
          subject: item.code || 'Sans objet',
          type: item.type_courrier || 'Inconnu',
          status: item.statut === 1 ? 'pending' : item.statut === 2 ? 'processed' : 'rejected',
          priority: 'medium',
          date: new Date(item.created_at).toLocaleDateString(),
          time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));

        setRecentMails(mailsFormates);
        setLastPage(res.data.last_page || 1);
      } else {
        console.error('Format inattendu des données API', res.data);
      }
    })
    .catch(err => {
      console.error('Erreur API courriers:', err);
    });
}, [currentPage]);

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
                  <span className="text-sm font-medium">{nom || 'Invité'} !</span>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Mail List */}
          <div className="lg:col-span-2">
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

              <div className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto">
                {recentMails.length > 0 ? (
                  recentMails
                    .filter(mail =>
                      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      mail.sender.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(mail => (
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
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
                  <p className="p-4 text-center text-gray-500">Aucun courrier trouvé.</p>
                )}
            </div>

             <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Précédent
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} sur {lastPage}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
                  disabled={currentPage === lastPage}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Suivant
                </button>
            </div>

            </div>
          </div>

          {/* Sidebar */}
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
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
  const [recentMails, setRecentMails] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nbRecu, setNbRecu] = useState(0);
  const [nbAttente, setNbAttente] = useState(0);
  const [nbTraite, setNbTraite] = useState(0);
  const [nbEncours, setNbEncours] = useState(0);
  const [allCourriers, setAllCourriers] = useState([]);
  const [periode, setPeriode] = useState('day');
  const [stats, setStats] = useState({ total: 0, parStatut: [] });


  
  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://192.168.100.14:8000',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });

    api.get('/api/gosoft/statuts')
      .then(res => {
        if (res.data && Array.isArray(res.data.items)) {
          setStatuts(res.data.items);
        } else {
          console.error('Format inattendu des statuts', res.data);
        }
      })
      .catch(err => {
        console.error('Erreur API statuts:', err);
      });
  }, []);

  const getNomStatut = (id) => {
    const statut = statuts.find(s => s.id === id);
    return statut ? statut.nom : 'Inconnu';
  };

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://192.168.100.14:8000',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });

    api.get(`/api/gosoft/courriers?page=${currentPage}`)
      .then(res => {
        if (res.data && Array.isArray(res.data.items)) {
          const mailsFormates = res.data.items.map(item => {
            const statutNom = getNomStatut(item.statut);
            return {
              id: item.id,
              sender: item.nom_structure || 'Inconnu',
              subject: item.code || 'Sans objet',
              type: item.type_courrier || 'Inconnu',
              status: statutNom,
              priority: 'medium',
              date: new Date(item.created_at).toLocaleDateString(),
              time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
          });

          setRecentMails(mailsFormates);
          setLastPage(res.data.last_page || 1);

          const typesUniques = [...new Set(mailsFormates.map(mail => mail.type))];
          setTypes(typesUniques);

          // Calcul des stats
          setNbRecu(mailsFormates.length);
          setNbAttente(mailsFormates.filter(m => m.status.toLowerCase().includes('attente')).length);
          setNbTraite(mailsFormates.filter(m => m.status.toLowerCase().includes('trait')).length);
          setNbEncours(mailsFormates.filter(m => m.status.toLowerCase().includes('cours')).length);

        } else {
          console.error('Format inattendu des données API', res.data);
        }
      })
      .catch(err => {
        console.error('Erreur API courriers:', err);
      });
  }, [currentPage, statuts]);
    const fetchStats = async (periodeChoisie = 'day') => {
    await axios.get(`http://192.168.100.14:8000/api/gosoft/statistiques?periode=${periodeChoisie}`)
      .then(res => {
        if (res.data && res.data.status_code === 200) {
          setStats({
            total: res.data.total_courriers || 0,
            parStatut: res.data.courriers_par_statut || []
          });
          setPeriode(periodeChoisie);
        } else {
          console.error("Erreur format des statistiques:", res.data);
        }
      })
      .catch(err => console.error("Erreur API stats:", err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reçu': return 'bg-yellow-100 text-yellow-800';
      case 'En Cours': return 'bg-blue-100 text-blue-800';
      case 'Traité': return 'bg-green-100 text-green-800';
      case 'Refusé': return 'bg-red-100 text-red-800';
      case 'Archivié': return 'bg-gray-200 text-gray-700';
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

  const filteredMails = recentMails.filter(mail => {
    const searchLower = searchTerm.toLowerCase();
    return (
      mail.subject.toLowerCase().includes(searchLower) ||
      mail.sender.toLowerCase().includes(searchLower) ||
      mail.status.toLowerCase().includes(searchLower) ||
      mail.type.toLowerCase().includes(searchLower)
    );
  });
  useEffect(() => {
  fetchStats('day');
  }, []);

  // ... le reste de ton composant (JSX) ne change pas car déjà complet
 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
     
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
              <LogOut className="text-gray-500" />
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

       {/* Stats Cards */}
      {/* Sélecteur de période */}
<div className="mb-4">
  <label className="text-sm font-medium text-gray-700 mr-2">Filtrer par :</label>
  <select
    value={periode}
    onChange={(e) => fetchStats(e.target.value)}
    className="border border-gray-300 rounded px-3 py-1 bg-white text-sm"
  >
    <option value="day">Jour</option>
    <option value="month">Mois</option>
    <option value="year">Année</option>
  </select>
</div>

{/* Stats Cards dynamiques */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {stats.parStatut.map((stat) => {
    const icons = {
      "Reçu": <Mail className="text-blue-600 w-6 h-6" />,
      "En attente": <Clock className="text-yellow-600 w-6 h-6" />,
      "Traité": <FileText className="text-green-600 w-6 h-6" />,
      "En cours": <Users className="text-purple-600 w-6 h-6" />,
    };

    const bgColors = {
      "Reçu": "bg-blue-100",
      "En attente": "bg-yellow-100",
      "Traité": "bg-green-100",
      "En cours": "bg-purple-100",
    };

    const arrows = {
      "Reçu": <ArrowUpRight className="w-4 h-4 text-green-500" />,
      "En attente": <ArrowDownRight className="w-4 h-4 text-red-500" />,
      "Traité": <ArrowUpRight className="w-4 h-4 text-green-500" />,
      "En cours": <TrendingUp className="w-4 h-4 text-blue-500" />,
    };

    const nom = stat.nom || "Statut";
    const total = stat.total || 0;

    return (
      <div key={stat.id} className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">{nom}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{total}</p>
            <div className="flex items-center gap-1 mt-2">
              {arrows[nom] || <TrendingUp className="w-4 h-4 text-gray-500" />}
              <span className="text-sm font-medium text-gray-600">Stable</span>
              <span className="text-gray-500 text-sm">aujourd'hui</span>
            </div>
          </div>
          <div className={`w-12 h-12 ${bgColors[nom] || 'bg-gray-200'} rounded-xl flex items-center justify-center`}>
            {icons[nom] || <Mail className="text-gray-600 w-6 h-6" />}
          </div>
        </div>
      </div>
    );
  })}
</div>

     </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recent Mail List */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/20">
          <div className="p-6 border-b border-gray-200">
               <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Courriers récents</h2>
               </div>
               <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par code, structure, type ou statut..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
          />
        </div>
      </div>
          
      <div className="divide-y divide-gray-200">
        {filteredMails.length > 0 ? (
          filteredMails.map(mail => (
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
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
          <p className="p-4 text-center text-gray-500">Aucun courrier trouvé.</p>
        )}
        </div>
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Précédent
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} sur {lastPage}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
                  disabled={currentPage === lastPage}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Suivant
                </button>
                
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
