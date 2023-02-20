import { useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {useParams} from 'react-router-dom'
import { FetchPokemon } from "../PokemonList/ListSlice"
import './PokemonPage.css'
import {Link} from 'react-router-dom'
import GeneralDataContainer from "../Elements/GeneralDataContainer/GeneralDataContainer"

function PokemonPage(){
    const {pokemonData} = useAppSelector((state)=>state.ListSliceReducer)
    const {pokemon} = useParams()
    const dispatch = useAppDispatch()
    
    
    useEffect(()=>{
        // The pokemon value comes directly from the url params from the router
        // if they input a value that's not allowed they'll get an error handled in ListSlice
        dispatch(FetchPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`))
    },[])

    return(
        <div className="pokemon-data-container">
            <div className="pokemon-header">
                <img src={pokemonData.sprites.front_default} alt={`${pokemonData.name} front sprite`}></img>
            </div>
            
            <div className="card-pokemon-data">
                <div className="title-container">
                    <h1>{pokemonData.name}</h1>
                    <div className="physical-stats-container">
                        <p>#{pokemonData.id}</p>
                        {/* Math.round is used to get only one decimal */}
                        <p>Height: {`${Math.round( pokemonData.height *0.1* 10) / 10}m`}</p>
                        <p>Weight: {`${Math.round(pokemonData.weight*0.1 *10)/10}kg`}</p>
                    </div>
                </div>

                <GeneralDataContainer/> 
                
                <div className="types-container">
                    {pokemonData ? pokemonData.types.map((type:any, _id:number)=>{
                        return(
                            // The class color is set in the App.css since it's used by the parent App.tsx
                            <div key={_id} className={`${type.type.name}-type`}>
                                <p>
                                    {type.type.name}
                                </p>
                            </div>
                        )
                    }):'...loading'}
                </div>
            </div>
            
            <Link to={'/'} className='back-link'>Back</Link>
        </div>
    )
}

export default PokemonPage