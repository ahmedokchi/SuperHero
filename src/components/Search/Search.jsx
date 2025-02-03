import React, { useState, useEffect } from 'react';
import { ApiFetch } from "../../api"; 

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiFetch(`https://superheroapi.com/api/ea9609577517e7e60f2e979722f11492/search/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      setHeroes(data.results || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Rechercher un super-héros"
        className="search-input"
      />
      {isLoading && <p>Chargement...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {heroes.length > 0 && (
        <div className="results">
          {heroes.map((hero) => (
            <div key={hero.id} className="hero-card">
              <h3>{hero.name}</h3>
              <img src={hero.image.url} alt={hero.name} />
            </div>
          ))}
        </div>
      )}

      {heroes.length === 0 && searchTerm.trim() !== '' && !isLoading && (
        <p>Aucun héros trouvé.</p>
      )}
    </div>
  );
}
