// pages/public/Confirmation.jsx
import React from 'react';
//import '../../styles/formulaire.css';
//import '../../styles/gmailForm.css';


const Confirmation = () => {
  return (
    <div className="gmail-form-container" style={{textAlign:'center'}}>
      <div className="gmail-form-title" style={{color:'#34a853',marginBottom:12}}>Merci pour votre soumission !</div>
      <p style={{color:'#444', fontSize:'1.1rem'}}>Nous avons bien reçu votre courrier et nous vous contacterons si nécessaire.</p>
    </div>
  );
};

export default Confirmation;