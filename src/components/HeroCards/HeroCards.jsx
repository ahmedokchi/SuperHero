import { useNavigate } from "react-router-dom";
import ApiFetch from "../../api/ApiFetch";
import { useAuth } from "../../auth/AuthProvider"; // Assurez-vous d'importer le hook d'authentification
import { useState } from "react";
import './HeroCards.scss';

const URL = "https://www.superheroapi.com/api.php/ea9609577517e7e60f2e979722f11492/";

export default function HeroCards() {
  const { user } = useAuth(); // Récupérer l'utilisateur pour vérifier s'il est connecté
  const [searchQuery, setSearchQuery] = useState(""); // État pour la barre de recherche
  const heroIds = Array.from({ length: 100 }, (_, i) => i + 1);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/hero/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Met à jour l'état de la recherche
  };

  // Filtrer les héros en fonction de la recherche
  const filteredHeroIds = heroIds.filter((id) => {
    // Filtrer par le nom du héros (dépend de la manière dont les données sont obtenues)
    return id.toString().includes(searchQuery); // Cela suppose que vous voulez rechercher par ID, mais vous pouvez adapter la logique pour le nom
  });

  return (
    <div>
      <h1>Tous les Super-Héros</h1>
      
      {/* Affichage de la barre de recherche uniquement si l'utilisateur est connecté */}
      {user && (
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Rechercher un héros..."
          />
        </div>
      )}

      <div className="hero-list">
        {filteredHeroIds.map((id) => (
          <ApiFetch key={id} url={`${URL}${id}`}>
            {(hero) => (
              <div 
                className="hero-card" 
                onClick={() => handleCardClick(hero.id)}
              >
                <h3>{hero.name}</h3>
                <img src={hero.image.url} alt={hero.name} />
              </div>
            )}
          </ApiFetch>
        ))}
      </div>
    </div>
  );
}
