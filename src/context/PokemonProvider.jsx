import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"

export const PokemonProvider = ({ children }) => {

    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] =useState(0)

    //utilizar customHook -useForm
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: ''
    })

    //estados para la aplicacion simples
    const [loading,setLoading] = useState(true)
    const [active,setActive] = useState(false)




    //llamar 50 pokemones a la API
    const getAllPokemons = async(limit=50) => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        
        const promises = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data

        })

        const results = await Promise.all(promises)
        setAllPokemons([
            //combinando los dos arreglos
            ...allPokemons,
            ...results
        ])
        //para decir si ya cargo
        setLoading(false)
    }

    //llamar todos los pokemones
    const getGlobalpokemons = async() =>{
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json()
        
        const promises = data.results.map(async(pokemon) =>{
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data

        })

        const results = await Promise.all(promises)
        setGlobalPokemons(results)
        //para decir si ya cargo
        setLoading(false)
    }

    //llamar a un pokemon por ID
    const getPokemonByID = async(id) => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(()=>{
        getAllPokemons()
    },[offset])

    useEffect(()=>{
        getGlobalpokemons()
    },[])

    //boton cargar mas
    const onClickLoadMore = () =>{
        setOffset(offset+50)
    }


    return (
    // con esto puedo usar todo esto en toda la aplicacion
        <PokemonContext.Provider 
        value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonByID,
            onClickLoadMore,
            //loader
            loading,
            setLoading,
            //btn filter
            active,
            setActive,
            //filtrar container checkbox
            

        }}>
            {children}
        </PokemonContext.Provider>
  )
}
