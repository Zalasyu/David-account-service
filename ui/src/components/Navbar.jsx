import React from 'react'
import '../static/css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return (
        <><nav className="navbar">
          <ul>
            <a className="active" href="/"><FontAwesomeIcon className='icon' icon={faHome} /> Home</a>
            
           
            <li><input type="search" placeholder="search product" id="search" />
                            <input type="submit" value="search" id="search-btn" /></li>
                <li><a className="nav-link" href="/dashboard">Orders</a></li>
                <li><a className="nav-link" href="/addproduct">Venue</a></li>
                <li><a className="nav-link " href="/profile">Profile</a></li>
                <li><a className="active2" href="/shoppingcart"><FontAwesomeIcon className='icon' icon={faShoppingCart} /> </a></li>
                <li><a className="active2" href="/login"><FontAwesomeIcon className='icon' icon={faUser} /></a></li>
            </ul>
        </nav></>
    )
}
export default Navbar;