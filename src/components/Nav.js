import React from 'react'; 
import {Link} from 'react-router-dom';

class Nav extends React.Component {
    render () {
        return (
            <div className='nav'>
                <Link className='homeLink' to='/'>Home</Link>
                <h1>Property Finder</h1>
            </div>
        )
    }
}

export default Nav;