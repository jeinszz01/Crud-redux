import { Link } from 'wouter'

const Header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-success justify-content-between">
            <div className="container">
                <h1>
                    <Link href='/' className='text-light'>CRUD - React, Redux, REST API & Axios</Link>
                </h1>
            </div>
            <Link href="/productos/nuevo">
                <a className="btn btn-danger nuevo-post d-block d-md-inline-block"
                >Agregar Producto &#43;</a>
            </Link>
            
        </nav>
    );
}
 
export default Header;