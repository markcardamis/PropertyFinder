import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/organisms/nav/Nav';
import './pages.scss';

const AboutPage = props => {
    return (
        <>
            <Nav/>
            <div className='notification'>This page is under development</div>
        </>
    );
};

AboutPage.propTypes = {

};

export default AboutPage;