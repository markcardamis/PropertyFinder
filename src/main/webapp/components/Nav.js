import React from 'react'; 
import {Link} from 'react-router-dom';

class Nav extends React.Component {
    render () {
        return (
            <div className='navBar col-lg-12 col-xl-12 justify-content-between'>
                <h1 className='col-lg-3'>Property Finder</h1>
                <ul className='navigation col-lg-4'>
                    <li><Link className='navLink' to='/'>Home</Link></li>
                    <li><Link className='navLink' to='/protected'>Protected</Link></li>
                    <li><Link className='navLink' to='/propertyinformation'>Property Information</Link></li>
                </ul>
            </div>
        )
    }
}

export default Nav;