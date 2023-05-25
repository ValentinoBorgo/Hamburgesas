import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalModificar, realizarModificaciones, contarModificaciones } from "../../redux/reducer/reducer";
import './formModificar.css'
import { GetBurgersM } from "../../redux/actions";
import { v4 as uuidv4 } from 'uuid';

export function ModificarHamburguesa() {
    
    
    const dispatch = useDispatch();
    
    const stateModal = useSelector(state => state.burgers.modificarAbierto)
    
    const cancel = (e) => {
        e.preventDefault();
        dispatch(modalModificar(!stateModal));
    }
    
    const [datos, setDatos] = useState({
        idM : '',
        burgerM : '',
        carnesM : '',
        chedarM : '',
        ingredientesM : '',
        llave : ''
    });
    
    let ids = useSelector(state => state.burgers.ids);
    
    const [contCarnes, setContCarnes] = useState(datos.carnesM);
    const [contChedar, setContChedar] = useState(datos.chedarM);
    const ingredientes= datos.ingredientesM;
    const [ides, setIds] = useState(datos.idM);
    const datBurger = datos.burgerM;
    const [key, setKey] = useState(datos.llave);

    const generadorLlave = () =>{
        const llave = uuidv4();
        setKey(datos.llave = llave);
    }

    useMemo(() =>{
        GetBurgersM(ids).then((value) =>{
            let {burger} = value[0];
            datos.burgerM = burger
        })
    },[ids])
    
    const handleSumCarnes = (e) =>{
        e.preventDefault();
        setContCarnes(datos.carnesM++);
    }

    const handleRestCarnes = (e) =>{
        e.preventDefault();
        if(contCarnes > 0){
            setContCarnes(datos.carnesM--);
        }
    }

    const handleSumChedar = (e) =>{
        e.preventDefault();
        setContChedar(datos.chedarM++);
    }

    const handleRestChedar = (e) =>{
        e.preventDefault();
        if(contChedar > 0){
            setContChedar(datos.chedarM--);
        }
    }
    
    const handleText = (e) =>{
        e.preventDefault();
        datos.ingredientesM = e.target.value;
    }
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(contarModificaciones(+ 1));
        setIds(datos.idM = ids);
        generadorLlave();
        setDatos({
            idM : ides,
            burgerM : datBurger,
            carnesM : contCarnes,
            chedarM : contChedar,
            ingredientesM: ingredientes,
            llave : key
        })
        dispatch(realizarModificaciones(datos))
        dispatch(modalModificar(!stateModal));
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <button onClick={cancel}>X</button>
            <div className="divs">
                <label>extra Carne</label>
                <button className="btns" onClick={(e) => handleSumCarnes(e)}>+</button>
                <input required type="number" onChange={(e) =>handleChange(e)} name="carnes" value={datos.carnesM}></input>
                <button className="btns" onClick={(e) => handleRestCarnes(e)}>-</button>
            </div>
            <br />
            <div className="divs">
                <label>extra Chedar</label>
                <button className="btns" onClick={(e) => handleSumChedar(e)}>+</button>
                <input  required type="number" value={datos.chedarM} name="chedar" onChange={(e) =>handleChange(e)}></input>
                <button className="btns" onClick={(e) => handleRestChedar(e)}>-</button>
            </div>
            <br />
            <div className="divs">
                <label>Comentarios</label>
                <textarea required cols="30" rows="10" placeholder="Indique sus ingredientes" name="ingredientes" onChange={(e) =>handleText(e)}></textarea>
            </div>
            <input type="submit" value="Aceptar"/>
        </form>
    )
    }