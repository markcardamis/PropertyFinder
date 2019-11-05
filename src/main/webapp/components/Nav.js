import React from 'react'; 
import {Link} from 'react-router-dom';

class Nav extends React.Component {
    render () {
        return (
            <div className='nav col-lg-12 col-xl-12 justify-content-between'>
                <h1>Property Finder</h1>
                <Link className='homeLink' to='/'>Home</Link>
                {/* <Link className='homeLink' to='/map'>Map</Link> */}
            </div>
        )
    }
}

export default Nav;