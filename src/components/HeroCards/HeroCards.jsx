import { useNavigate } from "react-router-dom";
import ApiFetch from "../../api/ApiFetch";
import { useAuth } from "../../auth/AuthProvider";
import { useState } from "react";
import "./HeroCards.scss";

const URL = "https://www.superheroapi.com/api.php/ea9609577517e7e60f2e979722f11492/";

export default function HeroCards() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const heroIds = Array.from({ length: 100 }, (_, i) => i + 1);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/hero/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHeroIds = heroIds.filter((id) => {
    return id.toString().includes(searchQuery);
  });

  return (
    <div>
      <h1>Tous les Super-Héros</h1>
      
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
