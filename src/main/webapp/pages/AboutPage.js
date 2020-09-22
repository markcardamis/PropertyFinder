import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/organisms/nav/Nav';
import './pages.scss';
import Layout from '../components/organisms/layout/Layout';
//import est from './aboutUsPhoto.jpg'

const AboutPage = props => {
    return (
        <Layout>
            <div className='aboutPageContainer'>
                <img className='aboutImg' src="https://majoapps.com/files/about-us-photo.jpg"/>
                <div>
                    <div className='pageText'>Have you ever wanted to build your own development site?</div>
                    <div className='pageText'>Find a suitable plot, work with designers and council, then start building your own project?</div>
                    <div className='pageText'>Property Fetch was created to address the time-consuming filtering process.</div>
                    <div className='pageText'>Only display listings that match your development criteria.</div>
                    <div className='pageText'>I welcome any feedback.</div>
                </div>
            </div>
        </Layout>
    );
};

AboutPage.propTypes = {

};

export default AboutPage;