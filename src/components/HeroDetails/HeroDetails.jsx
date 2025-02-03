import { useParams } from "react-router-dom";
import ApiFetch from "../../api/ApiFetch";
import "./HeroDetails.scss"
export default function HeroDetails() {
  const { id } = useParams();

  return (
    <ApiFetch url={`https://www.superheroapi.com/api.php/ea9609577517e7e60f2e979722f11492/${id}`}>
      {(hero) => {
        return (
          <div className="hero-details">
            <h1>{hero.name}</h1>
            <img
              className="hero-image"
              src={hero.image.url}
              alt={hero.name}
            />
            <div className="hero-stats">
              <h2>Informations</h2>
              <p><strong>Nom complet:</strong> {hero.biography["full-name"]}</p>
              <p><strong>Éditeur:</strong> {hero.biography.publisher}</p>
              <p><strong>Affiliation:</strong> {hero.connections["group-affiliation"]}</p>
              <p><strong>Occupation:</strong> {hero.work["occupation"]}</p>
              <p><strong>Lieu de naissance:</strong> {hero.biography["place-of-birth"]}</p>
            </div>
            <div className="hero-stats">
              <h2>Stats</h2>
              <p><strong>Force:</strong> {hero.powerstats["strength"]}</p>
              <p><strong>Vitesse:</strong> {hero.powerstats["speed"]}</p>
              <p><strong>Intelligence:</strong> {hero.powerstats["intelligence"]}</p>
              <p><strong>Durabilité:</strong> {hero.powerstats["durability"]}</p>
              <p><strong>Puissance:</strong> {hero.powerstats["power"]}</p>
              <p><strong>Combat:</strong> {hero.powerstats["combat"]}</p>
            </div>
</div>
        );
      }}
    </ApiFetch>
  );
}
