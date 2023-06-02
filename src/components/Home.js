import React, { useReducer, useEffect, useState } from 'react';
import "./Styles.css";

import { reducer, initialState } from '../Reducers/Reducer';
import CartaPokemon from './CartaPokemon';
import spinner from "../ajax-loader.gif";

const POKEMONES_API_URL = "https://pokeapi.co/api/v2/type/16/";

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
   

    const [visible, setVisible] = useState(false)
    const [texto, setTexto] = useState("liberar")

    // El Hook de efecto useEffect equivale a componentDidMount, 
    // componentDidUpdate y componentWillUnmount combinados.
    useEffect(() => {
        fetch(POKEMONES_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                let array = [];
                //console.log(jsonResponse)
                for (let i = 0; i < 10; i++) {
                    array.push(jsonResponse.pokemon[i])
                }

                dispatch({
                    type: "BUSCAR_POKEMONES_SUCCESS",
                    payload: array
                });
            })
            .catch((error) => {
                dispatch({
                    type: "BUSCAR_POKEMONES_FAILURE",
                    error: error
                });
            });
    }, []);

    const { pokemons, errorMessage, loading } = state;

    function activar() {
        if(visible==true){
            setVisible(false)
            setTexto("liberar")
        }else{
            setVisible(true)
            setTexto("guardar")
        }
        
    }

    // Se muestra loading y lista
    return (
        <div className="App">
            <span>Presiona la pokebola para {texto} a los pokemones</span>
            <div onClick={activar} class="pokebola">
                <div class="pokebola-botao"></div>
            </div>
            {visible ?
                <div className="cartas-contenedor">
                    {loading && !errorMessage ? (
                        <img className="spinner" src={spinner} alt="Loading spinner" />
                    ) : errorMessage ? (
                        <div className="errorMessage">{errorMessage}</div>
                    ) : (
                        pokemons.map((pokemon, index) => (
                            <CartaPokemon pokemon={pokemon} />
                        ))
                    )}
                </div>
            :
                <div></div>
            }
            
        </div>
    );
};

export default Home;