import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosGetPokemons from "./AxiosGetPokemons";

export const initialStatePokemon = {
    listaPokemons: [],
    objetoPokemon: {
        previous:'',
        next:''
    },
    pokemonData: {
        name:'',
        sprites:{
            front_default:'assets/bulbasaur.png'
        },
        id:-1,
        height:0,
        weight:0,
        stats:[
            {base_stat:0,stat:{name:"hp"}},
            {base_stat:0,stat:{name:"attack"}},
            {base_stat:0,stat:{name:"defense"}},
            {base_stat:0,stat:{name:"special-attack"}},
            {base_stat:0,stat:{name:"special-defense"}},
            {base_stat:0,stat:{name:"speed"}},
        ],
        abilities:[{ability:{name:''}}],
        types:[{type:{name:''}}]
    }
}

export const FetchPokemons = createAsyncThunk(
    'PokemonList/FetchPokemons',
    async (url:string)=>{
        const pokemons:any = await axiosGetPokemons(url)
        return pokemons.data.data
    }
)
export const FetchPokemon = createAsyncThunk(
    'PokemonList/FetchPokemon',
    async (url:string, {rejectWithValue})=>{
        const pokemon:any = await axiosGetPokemons(url)
        // I check for a status code of 200 and if the id is lower than 152 (highest value in the first generation of pokemon)
        // I make sure to do this because then someone could place a higher value directly in the url
        // and have access to newer pokemon
        if(pokemon.data.status === 200 && pokemon.data.data.id < 152){
            return pokemon.data.data
        }

        return rejectWithValue(pokemon.data.data)
    }
)

export const ListSlice = createSlice({
    name: 'ListSliceReducer',
    initialState: initialStatePokemon,
    reducers:{
        favPokemon : (state)=>{
            console.log('favPokemon')
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(FetchPokemons.fulfilled,(state, action:any)=>{
                state.objetoPokemon = action.payload
                state.listaPokemons = action.payload.results
            })
            .addCase(FetchPokemons.rejected,(state, action:any)=>{
                console.error('rejected')
            })
            .addCase(FetchPokemon.fulfilled, (state, action:any)=>{
                state.pokemonData = action.payload
            })
            .addCase(FetchPokemon.rejected, (state, action:any)=>{
                console.log(action)
                // I pass the missingNo data to have an error message if someone places a wrong name in the url
                state.pokemonData = {
                    name: 'MissingNo',
                    sprites:{
                        front_default: `${process.env.PUBLIC_URL}/assets/missingno.png`
                    },
                    id: 0,
                    height: 10,
                    weight: 3507,
                    stats:[
                        {base_stat:33,stat:{name:"hp"}},
                        {base_stat:136,stat:{name:"attack"}},
                        {base_stat:0,stat:{name:"defense"}},
                        {base_stat:6,stat:{name:"special-attack"}},
                        {base_stat:6,stat:{name:"special-defense"}},
                        {base_stat:29,stat:{name:"speed"}},
                    ],
                    abilities:[{ability:{name:`${action.payload}`}}],
                    types: [{type:{name:'bird'}}, {type:{name:'normal'}}]
                }
            })
    }
})

export const {favPokemon} = ListSlice.actions
export default ListSlice.reducer 