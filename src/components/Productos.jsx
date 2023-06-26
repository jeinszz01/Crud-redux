import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { descargarProductosAction } from "../actions/productosActions";
import Producto from "./Producto";

const Productos = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    // consulta API
    const obtenerProductos = () => dispatch(descargarProductosAction())

    obtenerProductos()
    // eslint-disable-next-line
  }, [])
  
  // capturar el state de productos
  const productos = useSelector(state => state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const loading = useSelector(state => state.productos.loading)

  return (  
    <>
      <h2>Listado de Productos</h2>
      {error && <p className="font-weight-bold alert alert-danger text-center mt-5">Hubo un error al cargar los productos.</p>}
      {loading && <p className="text-center">Cargando...</p>}
      
      <table className="table table-striped">
        <thead className="bg-success table-dark">
          <tr>
            <td scope="col">Nombre</td>
            <td scope="col">Precio</td>
            <td scope="col">Acciones</td>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? 
            productos.map(producto => (
                <Producto
                  key={producto.id}
                  producto={producto}
                />
              ))
            : (
              <tr><td colSpan='3'>No hay productos</td></tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}
 
export default Productos;