import {Routes, Route} from 'react-router-dom'
import App from './App'
import ErrorPage from './features/ErrorPage/ErrorPage'
import PokemonPage from './features/PokemonPage/PokemonPage'
function RutasFile(){
    return(
        <Routes>
            <Route path='/' element={<App></App>}></Route>
            <Route path='/:pokemon' element={<PokemonPage></PokemonPage>}></Route>
            <Route path='*' element={<PokemonPage/>}></Route>
        </Routes>
    )
}

export default RutasFile