import React, { useEffect, useState } from 'react';

const CartaPokemon = ({ pokemon }) => {
    const [pokemonfull, setPokemonFull] = useState([])
    const [imagen, setImagen] = useState("")

    const url = pokemon.pokemon.url

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse)
                setPokemonFull(jsonResponse)
                setImagen("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"+jsonResponse.id+".png")
            })
    }, []);

    return (
        <div className="carta-pokemon">
            <div className="texto-carta-pokemon">
                <p className="nombre-carta-pokemon">
                    {pokemonfull.name}
                </p>
                <p className="ide-carta-pokemon">
                    #{pokemonfull.id}
                </p>
            </div>
            <div className="imagen-carta-pokemon">
                <img className="imagen-pokemon" alt="algo" src={imagen} />
            </div>
        </div>
    );
};

export default CartaPokemon;