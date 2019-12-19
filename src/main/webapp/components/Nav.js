import React from 'react'; 
import {Link} from 'react-router-dom';

class Nav extends React.Component {
    render () {
        return (
            <div>
                <div className='navBar'>
                    <h1>Property Finder</h1>
                    <ul className='navigation'>
                        <li><Link className='navLink' to='/'>Home</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Nav;