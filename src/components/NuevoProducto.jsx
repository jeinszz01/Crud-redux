// Actions de Redux
import { useState } from "react";
import { useLocation } from 'wouter'
import { crearNewProductoAction } from "../actions/productosActions";
import { mostrarAlertaAction, ocultarAlertaAction } from "../actions/alertaActions";

import { useDispatch, useSelector } from "react-redux";

const NuevoProducto = () => {
    const [location, navigate] = useLocation()
    // state del componente
    const [nombre, guardarNombre] = useState('')
    const [precio, guardarPrecio] = useState(0)
    
    const dispatch = useDispatch()
    // mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNewProductoAction(producto))

    // acceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)
    
    const submitNewProducto = e => {
        e.preventDefault()
        // validar formulario
        if(nombre.trim() === '' || precio <= 0) {
            const alerta = {
                mensaje: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlertaAction(alerta))
            setTimeout(() => {
                dispatch(ocultarAlertaAction())
            }, 3000);
            return
        }
        
        // si no hay errores
        //crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        // redirectionamos
        navigate('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        
                        {alerta && <p className={alerta.classes}>{alerta.mensaje}</p>}

                        <form onSubmit={submitNewProducto}>
                            <div className="form-group">
                                <label>Nombre del Producto</label>
                                <input type="text" className="form-control" placeholder="Nombre Producto" 
                                    name="nombre" value={nombre} onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input type="number" className="form-control" placeholder="Precio Producto" 
                                    name="precio" value={precio} onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                            
                        </form>

                        {cargando && <p>Cargando...............</p>}
                        {error && <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;