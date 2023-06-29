import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/PokedexName.css'
const PokedexName = () => {

  const { name } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const [ pokemon, getPokemonByName, hasError ] = useFetch(url)

  useEffect(() => {
    getPokemonByName()
  }, [name])
  
  return (
      <article className="pokedexName_main">
        <header className="pokedex_header">
          <img
            className="header_pokedex_img"
            src="../headerpokedex.svg"
            alt="header-pokedex"
          />
          <img
            className="logo_pokedex"
            src="../logopokedex.svg"
            alt="logo-pokedex"
          />
          <img
            className="pokebola_img"
            src="../pokebola.svg"
            alt="pokebola-img"
          />
        </header>
        {
          hasError ? (
          <div className="error_container">
            <h2 className="pokemon_error">
              🚫 The pokémon "<span>{name}</span>" doesn't exist 🚫
            </h2>
            <h3 className="pokemon_error_h3">Please go back to the previous page and insert a new name</h3>
            <img className="pikachu_crying" src="pikachu_crying.png" alt="" />
          </div>
          ) : (
          <>
            <section className="first_section">
              <div className="pokemon_img_container">
                <img
                  className="pokemon_img"
                  src={pokemon?.sprites.other["official-artwork"].front_default}
                  alt="pokémon-img"
                />
              </div>
              <h2 className="pokemon_id">#{pokemon?.id}</h2>
              <h2 className="pokemon_name">{pokemon?.name}</h2>
              <ul className="pokemon_size">
                <li className="pokemon_weight">
                  <span>Weight</span>
                  {pokemon?.weight}
                </li>
                <li className="pokemon_height">
                  <span>Height</span>
                  {pokemon?.height}
                </li>
              </ul>
              <ul className="pokemon_info">
                <li className="types_container">
                  <h3>Type</h3>
                  <div className="pokemon_types">
                    {pokemon?.types.map((typeInfo) => (
                      <li className="type {typeInfo.type.name}" key={typeInfo.type.url}>{typeInfo.type.name}</li>
                    ))}
                  </div>
                </li>
                <li className="abilities_container">
                  <h3>Abilities</h3>
                  <div className="pokemon_abilities">
                    {pokemon?.abilities.map((ability) => (
                      <li className="ability" key={ability.ability.url}>{ability.ability.name}</li>
                    ))}
                  </div>
                </li>
              </ul>
            </section>
            <section className="second_section">
              <h2>Stats</h2>
                  <ul className="stat_list">
                  {
                    pokemon?.stats.map(statInfo => (
                        <li className="stat_block" key={statInfo.stat.url}>
                            <div className="stat_properties">
                              <h3 className="stat_name">{`${statInfo.stat.name} `}:</h3> 
                              <span className="stat_value">{statInfo.base_stat}/255</span>
                            </div>
                            <div className="statBar_father">
                              <div className="statBar_son" style={{width: `calc((${statInfo.base_stat} / 255) * 100%)`}}></div>
                            </div>
                        </li>
                    ))
                  }
                  </ul>
            </section>
            <section className="third_section">
              <h2>Movements</h2>
              <ul className="movements_grill">
                {pokemon?.moves.map((movement) => (
                      <li className="movement" key={movement.move.url}>{movement.move.name}</li>
                    ))}
              </ul>
            </section>
          </>
        )}
        <footer className="pokedex_footer">
          <img className="pokedexName_footer_img" src="../footerpokedex.svg" alt="footer-image" />
        </footer>
      </article>
  );
}

export default PokedexName
