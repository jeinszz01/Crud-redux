import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_SUCCESS,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_SUCCESS,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDITAR_PRODUCTO,
    PRODUCTO_EDITAR_SUCCESS,
    PRODUCTO_EDITAR_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// crear nuevos productos
export function crearNewProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto)
            // si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))
            // alerta podemos usar en este Action pero más limpio en component Producto.
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true))
            // error alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error, intentelo de nuevo!',
            })
        }
    }
}
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
// entre parentesis y llaves lo llamamos con action (action.type o action.payload)
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto,
})
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// Funcion que descarga el producto de la base de datos
export function descargarProductosAction () {
    return async (dispatch) => {
        dispatch(descargaProductos())

        try {
            const response = await clienteAxios.get('/productos')
            dispatch(productosObtenidos(response.data))
        } catch (error) {
            dispatch(consultarProductosError())
        }
    }
}
const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})
const productosObtenidos = productos => ({
    type: DESCARGA_PRODUCTOS_SUCCESS,
    payload: productos
})
const consultarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})


export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoSuccess())

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto a sido eliminado correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}
const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoSuccess = () => ({
    type: PRODUCTO_ELIMINAR_SUCCESS,
})
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})


// Comenzar a editar producto seleccionando
export function comenzarEditarProductoAction(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditar(producto))
    }
}
const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Editar producto seleccionado form - en la API y state.
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoSuccess(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDITAR_PRODUCTO
})
const editarProductoSuccess = producto => ({
    type: PRODUCTO_EDITAR_SUCCESS,
    payload: producto
})
const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
})