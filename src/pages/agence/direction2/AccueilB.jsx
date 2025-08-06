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
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  CheckCircle,
  X,
  Send,
  MapPin,
  Paperclip,
  Download,
  ExternalLink,
  Image,
  File
} from 'lucide-react';

// Composant pour afficher les fichiers joints
const FichierJoint = ({ fichier, onView }) => {
  const baseURL = 'http://192.168.100.14:8000';
  
  const getFileIcon = (path) => {
    const extension = path?.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return <Image size={16} className="text-blue-500" />;
    }
    if (extension === 'pdf') {
      return <FileText size={16} className="text-red-500" />;
    }
    return <File size={16} className="text-gray-500" />;
  };

  const getFileName = (path) => {
    return path?.split('/').pop() || 'Fichier';
  };

  const getFileSize = (fichier) => {
    // Si vous avez une taille dans l'API, utilisez-la, sinon "Taille inconnue"
    return 'Taille inconnue';
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center space-x-3">
        {getFileIcon(fichier.fichier_path)}
        <div>
          <p className="text-sm font-medium text-gray-900">{getFileName(fichier.fichier_path)}</p>
          <p className="text-xs text-gray-500">{getFileSize(fichier)}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onView({
            ...fichier,
            nom: getFileName(fichier.fichier_path),
            url: `${baseURL}/storage/${fichier.fichier_path}`,
            type: fichier.fichier_path?.split('.').pop()?.toLowerCase()
          })}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="Voir le fichier"
        >
          <Eye size={14} />
        </button>
        <button
          onClick={() => window.open(`${baseURL}/storage/${fichier.fichier_path}`, '_blank')}
          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
          title="Télécharger"
        >
          <Download size={14} />
        </button>
      </div>
    </div>
  );
};

// Modal pour voir les fichiers
const ModalViewFile = ({ fichier, onClose }) => {
  if (!fichier) return null;

  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fichier.type);
  const isPdf = fichier.type === 'pdf';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{fichier.nom}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-auto">
          {isImage ? (
            <img src={fichier.url} alt={fichier.nom} className="max-w-full h-auto mx-auto" />
          ) : isPdf ? (
            <iframe src={fichier.url} className="w-full h-96 border rounded" />
          ) : (
            <div className="text-center py-8">
              <File size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aperçu non disponible pour ce type de fichier</p>
              <button
                onClick={() => window.open(fichier.url, '_blank')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Télécharger le fichier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Modal Component pour les détails du courrier
const ModalDetailCourrier = ({ courrier, onClose, onSend }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!courrier) return null;

  const isPersonnePhysique = courrier.type_personne === 'physique';
  const isPersonneMorale = courrier.type_personne === 'morale';

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
          <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Détails du courrier</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSend(courrier)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} />
                  <span>Envoyer</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Code</label>
                <p className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg">{courrier.code}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Statut</label>
                <div className="flex items-center space-x-2">
                  {courrier.statut_id === 1 && <AlertCircle className="text-orange-500" size={16} />}
                  {courrier.statut_id === 2 && <Clock className="text-blue-500" size={16} />}
                  {courrier.statut_id === 3 && <CheckCircle className="text-green-500" size={16} />}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    courrier.statut_id === 1 ? 'bg-orange-100 text-orange-800' :
                    courrier.statut_id === 2 ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {courrier.statut_id === 1 ? 'Reçu' : courrier.statut_id === 2 ? 'En cours' : 'Traité'}
                  </span>
                </div>
              </div>
              
              {/* Type de personne */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type de personne</label>
                <p className="text-gray-900">{courrier.type_personne || 'N/A'}</p>
              </div>
              
              {/* Type de courrier */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type de courrier</label>
                <p className="text-gray-900">{courrier.type_courrier || 'N/A'}</p>
              </div>

              {/* Affichage conditionnel selon le type de personne */}
              {!isPersonneMorale && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nom</label>
                    <p className="text-gray-900">{courrier.nom || 'N/A'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Prénom</label>
                    <p className="text-gray-900">{courrier.prenom || 'N/A'}</p>
                  </div>
                </>
              )}
              
              {!isPersonnePhysique && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Structure</label>
                  <p className="text-gray-900">{courrier.nom_structure || 'N/A'}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{courrier.email || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Téléphone</label>
                <p className="text-gray-900">{courrier.phone || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date de création</label>
                <p className="text-gray-900">{courrier.created_at ? new Date(courrier.created_at).toLocaleDateString('fr-FR') : 'N/A'}</p>
              </div>
            </div>

            {/* Contenu du courrier */}
            {courrier.texte && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contenu du courrier</h4>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                    {courrier.texte}
                  </div>
                </div>
              </div>
            )}

            {/* Fichiers joints */}
            {courrier.fichiers && courrier.fichiers.length > 0 && (
              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Paperclip size={20} className="text-gray-700" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Fichiers joints ({courrier.fichiers.length})
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courrier.fichiers.map((fichier, index) => (
                    <FichierJoint
                      key={index}
                      fichier={fichier}
                      onView={setSelectedFile}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de visualisation des fichiers */}
      {selectedFile && (
        <ModalViewFile
          fichier={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
};

// Modal pour l'envoi de courrier
const ModalEnvoyerCourrier = ({ courrier, onClose, onConfirm }) => {
  /*const [destinataire, setDestinataire] = useState('');*/
  /*const [message, setMessage] = useState('');*/
  const [loading, setLoading] = useState(false);

  const handleEnvoyer = async () => {
    if (!courrier) return;
    
    setLoading(true);
    try {
      await onConfirm({
        courrier_id: courrier.id,
       // destinataire: destinataire.trim(),
       // message: message.trim()
      });
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi du courrier');
    } finally {
      setLoading(false);
    }
  };

  if (!courrier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl border border-white/20">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Envoyer le courrier</h3>
          <p className="text-sm text-gray-600 mt-1">Code: {courrier.code}</p>
        </div>
        
        <div className="p-6 space-y-4">
         
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={handleEnvoyer}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Envoi...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Envoyer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [courriers, setCourriers] = useState([]);
  const [periode, setPeriode] = useState('day');
  const [statistiques, setStatistiques] = useState([]);
  const [totalCourriers, setTotalCourriers] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourriers, setFilteredCourriers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCourrier, setSelectedCourrier] = useState(null);
  const [courrierToSend, setCourrierToSend] = useState(null);
  const [allCourriers, setAllCourriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    database: { status: 'checking', label: 'Vérification...' },
    api: { status: 'checking', label: 'Vérification...' },
    sync: { status: 'checking', label: 'Vérification...' }
  });

  const baseURL = 'http://192.168.100.14:8000';

  const fetchCourriers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/api/gosoft/courriers?periode=${periode}&page=${page}`);
      setCourriers(res.data.items);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error('Erreur récupération courriers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCourriers = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/gosoft/courriers?periode=${periode}`);
      setAllCourriers(res.data.items);
    } catch (error) {
      console.error('Erreur récupération tous les courriers:', error);
    }
  };

  const fetchStatistiques = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/gosoft/courriers/statistiques?periode=${periode}`);
      setStatistiques(res.data.courriers_par_statut);
      setTotalCourriers(res.data.total_courriers);
    } catch (error) {
      console.error('Erreur récupération statistiques:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/gosoft/courriers?periode=day`);
      setNotifications(res.data.items);
    } catch (error) {
      console.error('Erreur récupération notifications:', error);
    }
  };

  const checkSystemStatus = async () => {
    // Vérifier la base de données et l'API
    try {
      const response = await axios.get(`${baseURL}/api/gosoft/courriers/statistiques?periode=day`);
      setSystemStatus(prev => ({
        ...prev,
        database: { status: 'operational', label: 'Opérationnel' },
        api: { status: 'operational', label: 'Opérationnel' },
        sync: { status: 'operational', label: 'Récent' }
      }));
    } catch (error) {
      setSystemStatus(prev => ({
        ...prev,
        database: { status: 'error', label: 'Erreur' },
        api: { status: 'error', label: 'Erreur' },
        sync: { status: 'error', label: 'Échec' }
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'checking': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

 const handleEnvoyerCourrier = async (data) => {
    try {
      // Modifier uniquement le statut du courrier à "En cours" (statut_id = 2)
      const response = await axios.put(`${baseURL}/api/gosoft/courriers/edit/${data.courrier_id}`, {
        statut: 2  // ID pour "En cours"
      });
      
      // Actualiser les données après envoi
      await fetchCourriers();
      await fetchStatistiques();
      await fetchAllCourriers();
      
      alert('Courrier envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCourriers();
    fetchStatistiques();
    fetchNotifications();
    fetchAllCourriers();
    checkSystemStatus();
  }, [periode, page]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, allCourriers]);

  // Vérifier le statut du système toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      checkSystemStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = allCourriers.filter(c =>
      c.code?.toLowerCase().includes(term) ||
      c.nom?.toLowerCase().includes(term) ||
      c.prenom?.toLowerCase().includes(term) ||
      c.nom_structure?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.phone?.toLowerCase().includes(term) ||
      c.texte?.toLowerCase().includes(term)
    );
    setFilteredCourriers(results);
  };

  const handlePeriodeChange = (value) => {
    setPeriode(value);
    setPage(1);
  };

  const getStatutColor = (statut_id) => {
    switch (statut_id) {
      case 1: return 'bg-orange-100 text-orange-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut_id) => {
    switch (statut_id) {
      case 1: return <AlertCircle size={16} />;
      case 2: return <Clock size={16} />;
      case 3: return <CheckCircle size={16} />;
      default: return <Mail size={16} />;
    }
  };

  const getStatutLabel = (statut_id) => {
    switch (statut_id) {
      case 1: return 'Reçu';
      case 2: return 'En cours';
      case 3: return 'Traité';
      default: return 'Inconnu';
    }
  };

  const periodeLabels = {
    day: 'Aujourd\'hui',
    week: 'Cette semaine',
    month: 'Ce mois',
    year: 'Cette année'
  };

  // Calcul des statistiques corrigé pour l'affichage des cartes du haut
  const statsData = {
    today: totalCourriers,
    pending: statistiques.find(s => s.nom === 'Reçu')?.total || 0,
    processed: statistiques.find(s => s.nom === 'Traité')?.total || 0,
    inProgress: statistiques.find(s => s.nom === 'En cours')?.total || 0
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
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-12 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg w-80 max-h-96 overflow-auto z-20 border border-gray-200">
                    <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3 rounded-t-lg">
                      <h3 className="font-semibold text-gray-900">Notifications du jour</h3>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Bell size={24} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">Aucune notification</p>
                      </div>
                    ) : (
                      <div className="py-2">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="px-4 py-3 hover:bg-gray-50/50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                            onClick={() => {
                              setSelectedCourrier(notif);
                              setShowNotifications(false);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Nouveau courrier</p>
                                <p className="text-xs text-gray-500">Code: {notif.code}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue dans votre espace de gestion des courriers - {periodeLabels[periode]}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Courriers de la période</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{statsData.today}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-600 text-sm font-medium">Total</span>
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
                <p className="text-3xl font-bold text-gray-900 mt-1">{statsData.pending}</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-600 text-sm font-medium">À traiter</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="text-orange-600 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">En cours</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{statsData.inProgress}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-600 text-sm font-medium">En traitement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Traités</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{statsData.processed}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm font-medium">Terminés</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres de période */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar size={20} className="text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Période</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['day', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodeChange(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  periode === period
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {periodeLabels[period]}
              </button>
            ))}
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
                  <a 
                    href="/agence/direction2/choix"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nouveau courrier
                  </a>
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filtrer
                  </button>
                </div>
                {searchTerm && (
                  <p className="text-sm text-gray-600 mt-2">
                    {(searchTerm ? filteredCourriers : courriers).length} résultat(s) trouvé(s)
                  </p>
                )}
              </div>

              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">Chargement...</span>
                  </div>
                ) : (
                  (searchTerm ? filteredCourriers : courriers).slice(0, 10).map((courrier, index) => (
                    <div key={courrier.id} className={`p-4 hover:bg-gray-50/50 transition-colors border-l-4 ${
                      courrier.statut_id === 1 ? 'border-l-orange-500' :
                      courrier.statut_id === 2 ? 'border-l-blue-500' :
                      'border-l-green-500'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {courrier.texte ? 
                                (courrier.texte.length > 50 ? courrier.texte.substring(0, 50) + '...' : courrier.texte) :
                                `Courrier de ${courrier.prenom || ''} ${courrier.nom || courrier.nom_structure || 'Inconnu'}`
                              }
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatutColor(courrier.statut_id)}`}>
                              {getStatutLabel(courrier.statut_id)}
                            </span>
                            {courrier.fichiers && courrier.fichiers.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Paperclip size={12} className="text-gray-500" />
                                <span className="text-xs text-gray-600">{courrier.fichiers.length}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>De: {
                              courrier.type_personne === 'morale' ? 
                                (courrier.nom_structure || 'Structure inconnue') :
                                (`${courrier.prenom || ''} ${courrier.nom || ''}`.trim() || 'Nom inconnu')
                            }</span>
                            <span>•</span>
                            <span>Code: {courrier.code}</span>
                            {courrier.created_at && (
                              <>
                                <span>•</span>
                                <span>{new Date(courrier.created_at).toLocaleDateString('fr-FR')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button 
                            onClick={() => setSelectedCourrier(courrier)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setCourrierToSend(courrier)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {!searchTerm && lastPage > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      Page {page} sur {lastPage}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          page === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setPage(Math.min(lastPage, page + 1))}
                        disabled={page === lastPage}
                        className={`p-2 rounded-lg transition-colors ${
                          page === lastPage 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!loading && (searchTerm ? filteredCourriers : courriers).length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Aucun courrier à afficher</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <a 
                  href="/agence/direction2/choix"
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Enregistrer courrier</span>
                </a>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Générer rapport</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Gérer agents</span>
                </button>
              </div>
            </div>

            {/* Statistiques détaillées */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Statistiques détaillées</h3>
              </div>
              <div className="space-y-3">
                {statistiques.map((stat) => (
                  <div key={stat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {stat.nom === 'Reçus' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                      {stat.nom === 'En cours' && <Clock className="w-4 h-4 text-blue-500" />}
                      {stat.nom === 'Traités' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      <span className="font-medium text-sm">{stat.nom}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{stat.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État du système</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Base de données</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.database.status)}`}></div>
                    <span className={`text-sm font-medium ${getStatusTextColor(systemStatus.database.status)}`}>
                      {systemStatus.database.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Serveur API</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.api.status)}`}></div>
                    <span className={`text-sm font-medium ${getStatusTextColor(systemStatus.api.status)}`}>
                      {systemStatus.api.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dernière synchro</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.sync.status)}`}></div>
                    <span className={`text-sm font-medium ${getStatusTextColor(systemStatus.sync.status)}`}>
                      {systemStatus.sync.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de détails */}
        {selectedCourrier && (
          <ModalDetailCourrier
            courrier={selectedCourrier}
            onClose={() => setSelectedCourrier(null)}
            onSend={(courrier) => {
              setSelectedCourrier(null);
              setCourrierToSend(courrier);
            }}
          />
        )}

        {/* Modal d'envoi */}
        {courrierToSend && (
          <ModalEnvoyerCourrier
            courrier={courrierToSend}
            onClose={() => setCourrierToSend(null)}
            onConfirm={handleEnvoyerCourrier}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;