import { useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {useParams} from 'react-router-dom'
import { FetchPokemon } from "../PokemonList/ListSlice"
import './ErrorPage.css'
import {Link} from 'react-router-dom'

function ErrorPage(){
    const {pokemonData} = useAppSelector((state)=>state.ListSliceReducer)
    const {pokemon} = useParams()
    const dispatch = useAppDispatch()
    
    function percentageStats(stat:number){
        let percentage = (100*stat) / 255
        return percentage
    }
    
    useEffect(()=>{
        dispatch(FetchPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`))
    },[])

    return(
        <div>
            <Link to={'/'}>back</Link>
            <div className="pokemon-header">
                <img src={pokemonData.sprites.front_default} alt={`${pokemonData.name} front sprite`}></img>
                <h1>{pokemonData.name}</h1>
                {pokemonData ? pokemonData.types.map((type:any, _id:number)=>{
                    return(
                        <p key={_id}>{type.type.name}</p>
                    )
                }):'...loading'}
            </div>
            <div>
                <p>Number: {pokemonData.id}</p>
                <p>Height: {pokemonData.height}</p>
                <p>Weight: {pokemonData.weight}</p>
            </div>
            <div>
                <div> 
                    {pokemonData ? pokemonData.stats.map((stat:any, _id:number)=>{
                        return(
                            <div key={_id}>
                                <p>{stat.stat.name}: {stat.base_stat}</p>
                                <div className="status-bar">
                                    <div style={{width:`${percentageStats(stat.base_stat)}%`}}></div>
                                </div>
                            </div>
                        )
                    }):'...loading'}
                </div>
            </div>
            <div>
                <h3>Abilities</h3>
                {pokemonData ? pokemonData.abilities.map((ability:any, _id)=>{
                    return(
                        <p key={_id}>{ability.ability.name}</p>
                    )
                }):'...loading'}
            </div>
        </div>
    )
}

export default ErrorPage