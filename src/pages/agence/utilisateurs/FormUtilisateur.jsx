import React, { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, Calendar, Save, X, Eye, EyeOff } from 'lucide-react';

const FormUtilisateur = () => {
  // Simulation de useParams pour la démo
  const id = null; // Changez à un ID pour tester le mode édition
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    dateNaissance: '',
    motDePasse: '',
    confirmMotDePasse: '',
    role: 'utilisateur'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur si l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!id) { // Seulement pour la création
      if (!formData.motDePasse) {
        newErrors.motDePasse = 'Le mot de passe est requis';
      } else if (formData.motDePasse.length < 6) {
        newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      
      if (formData.motDePasse !== formData.confirmMotDePasse) {
        newErrors.confirmMotDePasse = 'Les mots de passe ne correspondent pas';
      }
    }
    
    if (formData.telephone && !/^\+?[\d\s-()]{10,}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Données du formulaire:', formData);
      alert(id ? 'Utilisateur modifié avec succès!' : 'Utilisateur créé avec succès!');
    }
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      dateNaissance: '',
      motDePasse: '',
      confirmMotDePasse: '',
      role: 'utilisateur'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-t-2xl shadow-xl p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? 'Modifier un utilisateur' : 'Créer un nouvel utilisateur'}
              </h1>
              <p className="text-gray-600 mt-1">
                {id ? 'Modifiez les informations de l\'utilisateur' : 'Remplissez les informations pour créer un nouveau compte'}
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom */}
            <div className="space-y-2">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                Nom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.nom ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Entrez le nom"
                />
              </div>
              {errors.nom && <p className="text-red-500 text-sm flex items-center"><X className="w-4 h-4 mr-1" />{errors.nom}</p>}
            </div>

            {/* Prénom */}
            <div className="space-y-2">
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                Prénom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.prenom ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Entrez le prénom"
                />
              </div>
              {errors.prenom && <p className="text-red-500 text-sm flex items-center"><X className="w-4 h-4 mr-1" />{errors.prenom}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="exemple@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm flex items-center"><X className="w-4 h-4 mr-1" />{errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.telephone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              {errors.telephone && <p className="text-red-500 text-sm flex items-center"><X className="w-4 h-4 mr-1" />{errors.telephone}</p>}
            </div>

            {/* Date de naissance */}
            <div className="space-y-2">
              <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
                Date de naissance
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="dateNaissance"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Rôle */}
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rôle
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all"
              >
                <option value="utilisateur">Utilisateur</option>
                <option value="admin">Administrateur</option>
                <option value="moderateur">Modérateur</option>
              </select>
            </div>
          </div>

          {/* Adresse */}
          <div className="mt-6 space-y-2">
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all resize-none"
                placeholder="Entrez l'adresse complète"
              />
            </div>
          </div>

          {/* Mots de passe (seulement pour la création) */}
          {!id && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mot de passe */}
              <div className="space-y-2">
                <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="motDePasse"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.motDePasse ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.motDePasse && <p className="text-red-500 text-sm flex items-center"><X className="w-4 h-4 mr-1" />{errors.motDePasse}</p>}
              </div>

              {/* Confirmation mot de passe */}
              <div className="space-y-2">
                <label htmlFor="confirmMotDePasse" className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmMotDePasse"
                    name="confirmMotDePasse"
                    value={formData.confirmMotDePasse}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.confirmMotDePasse ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Confirmer le mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmMotDePasse && <p className="text-red-500 text-sm flex items-center"><X className="w-4 h-4 mr-1" />{errors.confirmMotDePasse}</p>}
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Réinitialiser</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{id ? 'Modifier' : 'Créer'} l'utilisateur</span>
            </button>
          </div>
        </div>

        {/* Note d'information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note :</strong> Les champs marqués d'un astérisque (*) sont obligatoires. 
            {!id && " Le mot de passe doit contenir au moins 6 caractères."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormUtilisateur;