import { Navigate, Route, Routes } from "react-router-dom"
import { Navigation } from "./components/Navigation"
import { HomePage, PokemonPage, SearchPage } from "./pages"


export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<HomePage/>}/>
            <Route path='pokemon/:id' element={<PokemonPage />} />{/* //Localhost:5173/pokemon/2 */}
            <Route path='search' element={<SearchPage/>}/>
        </Route>

        <Route path='*' element={<Navigate to='/' />}/>
    </Routes>
  )
}
