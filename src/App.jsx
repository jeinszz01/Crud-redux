import Header from './components/Header'
import Productos from './components/Productos'
import NuevoProducto from './components/NuevoProducto'
import EditarProducto from './components/EditarProducto'

import { Route } from 'wouter'

// Redux
import { Provider } from 'react-redux'
import store from './store'

function App() {

    return (
        <>
            <Provider store={store} >
                <Header />
                
                <div className='container mt-5'>
                    <Route path='/' component={Productos} />
                    <Route path='/productos/nuevo' component={NuevoProducto} />
                    <Route path='/productos/editar/:id' component={EditarProducto} />
                </div>
            </Provider>
        </>
    )
}

export default App
