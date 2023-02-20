import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import './PokemonList.css'
import { FetchPokemon, FetchPokemons} from './ListSlice'
import {useNavigate} from 'react-router-dom'



function PokemonList(){
    const {listaPokemons, objetoPokemon} = useAppSelector((state)=>state.ListSliceReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = (event:any, pokemonName:string) => {
        switch (event.detail) {
            case 1: {
                // I get pokemon sprite from this line
                dispatch(FetchPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`))
                break;
            }
            case 2: {
                // Here I use navigate instead of directly using the Link to={} 
                navigate(`/${pokemonName}`)
                break;
            }
            default: {
                break;
            }
        }
    }
    
    useEffect(()=>{
        dispatch(FetchPokemons('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'))
    },[])

    return(
        <div className='container-pokemon'>
            <img className='pokeapi' src='./assets/pokeapi.svg' alt='pokeapi'></img>
            <div className='container-pokemon-list'>
                {listaPokemons ? listaPokemons.map((pokemon:any, _id:number)=>{
                    // Here I'm using the value of the sliced url(https://pokeapi.co/api/v2/pokemon/10/) 
                    // to check if it's less than 151 since that's the last
                    // pokemon in the first generation 
                    let pokeID = parseInt(pokemon.url.slice(34, -1))
                    if(pokeID <= 151){
                        return(
                            <div key={_id} onClick={(e)=>{handleClick(e, pokemon.name)}}>
                                <div className='card-pokemon'>
                                    <p>{pokemon.name}</p>
                                    <img src='./assets/pokeball.png' alt='pokeball icon'></img>
                                </div>
                            </div>
                        )
                    }else{
                        return null
                    }
                }) : "...loading"}
            </div>
            <div className='button-container'>
                {/*  
                I check for a null value because the pokeapi returns null if there are no previous pokemon
                */}
                {objetoPokemon.previous !== null ? <button onClick={()=>{dispatch(FetchPokemons(objetoPokemon.previous))}}>
                    <img className='button-sprite' src='./assets/back.png'></img>
                </button>:<button></button>}
                {/* 
                I use the next url sliced value (https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20) for 
                get the offset value, since the increment is every 20 the value 140 is the last one before I pass 
                the limit of 151
                */}
                {parseInt(objetoPokemon.next.slice(42, -9)) <= 140 ? <button onClick={()=>{dispatch(FetchPokemons(objetoPokemon.next))}}>
                    <img className='button-sprite' src='./assets/next.png'></img>
                </button> : ''}

            </div>
        </div>
    )
}

export default PokemonList