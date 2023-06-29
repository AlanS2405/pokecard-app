import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import PokeContainer from "../components/Pokedex/PokeContainer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './styles/Pokedex.css'
import Pagination from "../components/Pokedex/Pagination"

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('all-pokemons');
  const [cardsPerPage, setCardsPerPage] = useState(18);
  const [currentPage, setCurrentPage] = useState(0);

  const trainerName = useSelector(states => states.trainerName)

  let url = `https://pokeapi.co/api/v2/pokemon/?offset=${currentPage}&limit=${cardsPerPage}`
  const [ pokemons, getAllPokemons, hasError, setPokemons ] = useFetch(url)

  const urlTypes = `https://pokeapi.co/api/v2/type`
  const [types, getAllTypes] = useFetch(urlTypes)
  
    // Change page
    const paginate = pageNumber => setCurrentPage((pageNumber * cardsPerPage) - cardsPerPage)

    const totalCards = (pokemons?.count)

  useEffect(() => {
    if (selectValue === 'all-pokemons') {
      getAllPokemons()
    } else {
      axios.get(selectValue)
        .then ( res => {
          const data = {
            results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
          }
          setPokemons(data)
        })
        .catch (err => console.log(err))
    }

  }, [selectValue, url])
  
  useEffect(() => {
    getAllTypes()
  }, [])

  const searchPokemon = useRef()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
  }

  const handleChangeType = e => {
    setSelectValue(e.target.value)
  }

  const handleCardsPerPage = (e) => {
    setCardsPerPage(e.target.value)
  }

  return (
    <div className="pokedex">
      <header className="pokedex_header">
          <img className="header_pokedex_img" src="../headerpokedex.svg" alt="header-pokedex" />
          <img className="logo_pokedex" src="../logopokedex.svg" alt="logo-pokedex" />
          <img className="pokebola_img" src="../pokebola.svg" alt="pokebola-img" />
      </header>
      <form className="search_bar" onSubmit={handleSubmit}>
        <p className="greetings">Welcome <span>{trainerName}</span></p>
        <input className="input_pokedex" placeholder="Find your favorite Pokémon" ref={searchPokemon} type="text" />
        <button className="btn_pokedex">Search</button>
        <select className="type_list_pokedex" onChange={handleChangeType}>
          <option value='all-pokemons'>Types</option>
          {
            types?.results.map( typeInfo => 
              <option 
              value={typeInfo.url}
              key={typeInfo.url}
              >{typeInfo.name}</option>)
          }
        </select>
        <select className="cardsPerPage_list_pokedex" onChange={handleCardsPerPage}>
          <option value="18">Cards Per Page</option>
          <option value={totalCards}>All-Pokemons</option>
          <option value="30">30</option>
          <option value="27">27</option>
          <option value="24">24</option>
          <option value="21">21</option>
          <option value="18">Default [18]</option>
          <option value="15">15</option>
          <option value="12">12</option>
          <option value="9">9</option>
          <option value="6">6</option>
          <option value="3">3</option>
        </select>
      </form>
      <PokeContainer pokemons={pokemons?.results}/>
      <Pagination 
        cardsPerPage={cardsPerPage}
        paginate={paginate}
        totalCards={totalCards}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <footer>
          <img className="pokedexName_footer_img" src="../footerpokedex.svg" alt="footer-image" />
      </footer>
    </div>
  )
}

export default Pokedex
