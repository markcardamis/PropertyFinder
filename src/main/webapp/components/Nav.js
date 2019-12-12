import React from 'react'; 
import {Link} from 'react-router-dom';

class Nav extends React.Component {
    render () {
        return (
            <div className='row'>
                <div className='navBar col-lg-12 col-xl-12 justify-content-between'>
                    <h1 className='col-lg-3'>Property Finder</h1>
                    <ul className='navigation col-lg-4'>
                        <li><Link className='navLink' to='/'>Home</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Nav;