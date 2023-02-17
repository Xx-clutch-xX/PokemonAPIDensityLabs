import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppSelector } from './app/hooks'
import PokemonList from './features/PokemonList/PokemonList';

function App() {
  const {pokemonData} = useAppSelector((state)=>state.ListSliceReducer)
  const [enterImage, setEnterImage] = useState(false)
  
  
  useEffect(()=>{
    setEnterImage(true)
  },[])
  
  return (
    <div className="App">

      <div className='main-cards'>
        <PokemonList/>
        <div className={`pokemon-image-hero`}>
          <img className={`pokemon-image-main ${enterImage ? 'center-image' :''}`} src={pokemonData.sprites.front_default} alt={`${pokemonData.name} front sprite`}></img>
          <img className={`tall-grass ${enterImage ? 'center-image' :''}`} src='assets/tall-grass.png' alt='tallgrass'></img>
        </div>
      </div>


     </div>
  );
}

export default App;
