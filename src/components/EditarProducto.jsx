import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productosActions";

const EditarProducto = () => {
    const [location, navigate] = useLocation()
    const dispatch = useDispatch()

    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    })
    
    const productoeditar = useSelector(store => store.productos.productoEditar)

    // llenar el state automanticamente
    useEffect(() => {
        setProducto(productoeditar)
    }, [productoeditar])
    
    // Leer los datos del formulario
    const onChangeFormulario = e => {
        const value = (e.target.name === 'precio') ? parseInt(e.target.value) : e.target.value
        setProducto({
            ...producto,
            [e.target.name]: value,
        })
    }

    if(productoeditar === null) return null
    const { nombre, precio } = producto

    const editarProducto = e => {
        e.preventDefault()

        dispatch(editarProductoAction(producto))

        navigate('/')
    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        
                        <form onSubmit={editarProducto}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input type="text"
                                    className="form-control" placeholder="Nombre Producto" 
                                    value={nombre} 
                                    name="nombre"
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input type="number"
                                    className="form-control" placeholder="Precio Producto"
                                    value={precio}
                                    name="precio"
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;