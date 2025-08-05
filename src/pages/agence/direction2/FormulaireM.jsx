import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  FileText, 
  Upload, 
  Send, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  X,
  Paperclip,
  Users,
  Briefcase,
  Globe,
  MapPin,
  Sparkles
} from 'lucide-react';
 import axios from 'axios';
const FormulaireMorale = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom_structure: '',
    //type_structure: '',
    //secteur_activite: '',
    //adresse: '',
    type_courrier: '',
    email: '',
    phone: '',
    //responsable_nom: '',
    //responsable_fonction: '',
    texte: '',
    statut: 1,
    type_personne: 'Morale',
    fichiers: []
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const types = [
    "Demande Emplois ou stage",
    "Demande de partenariat",
    "Demande de financement",
    "Proposition des solutions",
    "Demande des rendez-vous"
  ];

  const typesStructure = [
    "SARL",
    "SA",
    "SAS",
    "Association",
    "ONG",
    "Coopérative",
    "Entreprise individuelle",
    "Organisation internationale",
    "Institution publique"
  ];

  const secteursActivite = [
    "Agriculture",
    "Commerce",
    "Industrie",
    "Services",
    "Technologies",
    "Santé",
    "Éducation",
    "Tourisme",
    "Transport",
    "Construction",
    "Finance",
    "Télécommunications"
  ];

  const steps = [
    { id: 1, title: 'Informations structure', fields: ['nom_structure'] },
    { id: 2, title: 'Contact et responsable', fields: ['email', 'phone'] },
    { id: 3, title: 'Détails du courrier', fields: ['type_courrier', 'texte'] },
    { id: 4, title: 'Documents', fields: ['fichiers'] }
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'mail':
        if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors[name] = 'Email invalide';
        } else {
          delete newErrors[name];
        }
        break;
      case 'phone':
        if (!/^\+?[\d\s-()]{8,}$/.test(value)) {
          newErrors[name] = 'Numéro de téléphone invalide';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        if (value.trim() === '') {
          newErrors[name] = 'Ce champ est requis';
        } else {
          delete newErrors[name];
        }
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fichiers') {
      const fileArray = Array.from(files);
      setFormData({ ...formData, fichiers: [...formData.fichiers, ...fileArray] });
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData({ ...formData, fichiers: [...formData.fichiers, ...files] });
    }
  };

  const removeFile = (indexToRemove) => {
    setFormData({
      ...formData,
      fichiers: formData.fichiers.filter((_, index) => index !== indexToRemove)
    });
  };

  const canProceedToNext = () => {
    const currentFields = steps[currentStep - 1].fields;
    return currentFields.every(field => {
      if (field === 'fichiers') return formData.fichiers.length > 0;
      return formData[field] && formData[field].trim() !== '';
    }) && Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canProceedToNext()) return;
    
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key,value]) => {
        if (key === 'fichiers') {
          value.forEach((file) => formPayload.append('fichiers[]', file));

        } else {
          formPayload.append(key, value);
        }
      });
      for (let pair of formPayload.entries()) {
        console.log(pair[0]+':' + pair[1]);
      }

      const response = await axios.post('http://192.168.100.14:8000/api/gosoft/courriers/create',formPayload, {
        headers : {
          'Content-type':'multipart/form-data'
        }
      }) ;
      console.log('Reponse API:',response.data);
      setShowSuccess(true);
    } catch (error) {
      console.log("Eurreurs de validation :", error .response.data.errorsList);
    
    } finally {
      setIsSubmitting(false);
    }

    
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Nom de la structure *
              </label>
              <input
                type="text"
                name="nom_structure"
                value={formData.nom_structure}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                  errors.nom_structure 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-500 bg-white'
                }`}
                placeholder="Nom complet de votre organisation"
              />
              {errors.nom_structure && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.nom_structure}</p>}
            </div>
                  
            {/*<div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Type de structure *
                </label>
                <select
                  name="type_structure"
                  value={formData.type_structure}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
                >
                  <option value="">-- Sélectionnez --</option>
                  {typesStructure.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div> */}

             {/* <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Secteur d'activité *
                </label>
                <select
                  name="secteur_activite"
                  value={formData.secteur_activite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
                >
                  <option value="">-- Sélectionnez --</option>
                  {secteursActivite.map((secteur, index) => (
                    <option key={index} value={secteur}>{secteur}</option>
                  ))}
                </select>
              </div>
            </div>*?}

           {/* <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse complète *
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300 resize-none"
                placeholder="Adresse complète de votre structure"
              />
            </div>*/}
          </div> 
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email professionnel *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.mail 
                      ? 'border-red-300 focus:border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-green-500 bg-white'
                  }`}
                  placeholder="contact@entreprise.com"
                />
                {errors.mail && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.mail}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.phone 
                      ? 'border-red-300 focus:border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-green-500 bg-white'
                  }`}
                  placeholder="+242 XX XX XX XX"
                />
                {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
              </div>
            </div>

           {/*<div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Responsable du dossier
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-green-700">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="responsable_nom"
                          value={formData.responsable_nom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
                          placeholder="Nom du responsable"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-green-700">
                          Fonction *
                        </label>
                        <input
                          type="text"
                          name="responsable_fonction"
                          value={formData.responsable_fonction}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
                          placeholder="Directeur, Responsable, etc."
                        />
                      </div>
                    </div>
              </div>*/}
          </div> 
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Type de courrier *
              </label>
              <select
                name="type_courrier"
                value={formData.type_courrier}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
              >
                <option value="">-- Sélectionnez le type --</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description détaillée du courrier *
              </label>
              <textarea
                name="texte"
                value={formData.texte}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300 resize-none"
                placeholder="Décrivez votre demande de manière détaillée. Incluez le contexte, les objectifs, les enjeux et toute information pertinente..."
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Soyez le plus précis possible</span>
                <span>{formData.texte.length}/1000 caractères</span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Documents officiels *
              </label>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Glissez-déposez vos documents ou
                </p>
                <label className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-colors duration-300">
                  <Upload className="w-4 h-4" />
                  Parcourir les fichiers
                  <input
                    type="file"
                    name="fichiers"
                    onChange={handleChange}
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Documents acceptés: PDF, JPG, PNG, DOC, DOCX (Max. 2MB par fichier)
                </p>
                <div className="text-xs text-gray-400 mt-2">
                  Documents suggérés: Statuts, Registre de commerce, Carte d'identité du responsable, etc.
                </div>
              </div>
            </div>

            {formData.fichiers.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Documents joints ({formData.fichiers.length})
                </h4>
                <div className="space-y-2">
                  {formData.fichiers.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">{file.name}</span>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center px-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Courrier entreprise envoyé !</h2>
          <p className="text-gray-600 mb-8">
            Votre demande professionnelle a été soumise avec succès. Notre équipe traitera votre dossier dans les plus brefs délais.
          </p>
          <div className="space-y-3">
            <a
              href="/agence/direction2/AccueilB"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors duration-300 w-full justify-center"
            >
              Retour à l'accueil
            </a>
            <p className="text-xs text-gray-500">Référence: {formData.code}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-200/20 to-green-200/20 rounded-full blur-3xl animate-bounce" />
      </div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* Back button */}
            <a 
              href="/choix-type" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8 group transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Retour au choix</span>
            </a>
            
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Formulaire{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Professionnel
              </span>
            </h1>
            <p className="text-lg text-gray-600">Personne Morale • Entreprise • Organisation</p>
          </div>

          {/* Progress Steps */}
          <div className={`mb-12 transition-all duration-1000 transform delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    index < steps.length - 1 ? 'border-r border-gray-200 pr-4' : ''
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`font-medium text-sm ${
                        currentStep >= step.id ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-1000 transform delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            <div>
              {getStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Précédent
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceedToNext()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canProceedToNext()
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Suivant
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canProceedToNext() || isSubmitting}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canProceedToNext() && !isSubmitting
                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le courrier
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireMorale;