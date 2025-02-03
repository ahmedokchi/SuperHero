import React from "react";
import { useNavigate } from "react-router-dom";
import { Login, Logout } from "../../auth/LoginOut";
import { useAuth } from "../../auth/AuthProvider"; 
const Intro = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleGetStarted = () => {
    navigate("/heros");
  };
 

  return (
    <div>
      

      <div className="intro">
        <div >
          <h1>Bienvenue sur le site des Super-Héros</h1>
          <div className="auth-buttons">
        {user ? (
          <>
            <p>Bienvenue, {user.username}!</p>
            <Logout /> 
          </>
        ) : (
          <Login /> 
        )}
        
      </div>
          <p>
          Vous pouvez vous connecter en étant spiderman avec le mot de passe "azerty" !
          <br /><br />
            Explorez l'univers fascinant des super-héros ! Découvrez leurs pouvoirs, leurs histoires et leurs statistiques.
            Choisissez un héros parmi une liste et apprenez tout ce qu'il y a à savoir sur lui.
            
            
          </p>
          <button onClick={handleGetStarted}>Commencer</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
