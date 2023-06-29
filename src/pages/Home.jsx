import { useRef } from "react"
import { setTrainerNameG } from '../store/slices/trainerName.slice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './styles/Home.css'

const Home = () => {

    const trainerNameRef = useRef()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
        navigate('/pokedex')
    }


  return (
    <div className="background_image">
        <div className="home_container">
            <h1 className="logo_container">
                <img className="pokedex_logo" src="logopokedex.svg" alt="pokedex-logo" />
            </h1>
            <section className="main_container">
                <h2>Hi Trainer!</h2>
                <p>To start in this application, please, give me you trainer name.</p>
                <form className="form_container" onSubmit={handleSubmit}>
                    <input 
                        ref={trainerNameRef}
                        placeholder="Insert your trainer name" 
                        type="text" />
                    <button>Catch them all!</button>
                </form>
            </section>
            <img className="footer_image" src="../footerpokedex.svg" alt="footer-image" />
        </div>
    </div>
    
  )
}

export default Home
