import { useSelector } from "react-redux";
import PokeCard from "./PokeCard";
import './Styles/PokeContainer.css'

const PokeContainer = ({pokemons}) => {
const trainerName = useSelector(states => states.trainerName)


  return (
    <div className="pokeContainer">
      <div className="cards_container">
      {
        pokemons?.map(pokemon => (
            <PokeCard 
                key={pokemon.url}
                url={pokemon.url}
            />
        ))
      }
      </div>
    </div>
  )
}

export default PokeContainer
