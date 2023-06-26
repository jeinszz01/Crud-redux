import { useLocation } from "wouter";
// Redux
import { useDispatch } from "react-redux";
import { borrarProductoAction, comenzarEditarProductoAction } from '../actions/productosActions'

import Swal from "sweetalert2";

const Producto = ({producto}) => {
    const { nombre, id, precio } = producto

    const dispatch = useDispatch()
    const [location, navigate] = useLocation()

    const eliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                dispatch(borrarProductoAction(id))
            }
        })
    }

    const redireccionarEdicion = producto => {
        dispatch(comenzarEditarProductoAction(producto))
        navigate(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">S/.{precio}</span></td>
            <td className="acciones">
                <button type="button" onClick={() => redireccionarEdicion(producto)} className="btn btn-warning mr-2">Editar</button>
                <button onClick={() => eliminarProducto(id)} className="btn btn-danger">Eliminar</button>
            </td>
        </tr>
    );
}
 
export default Producto;