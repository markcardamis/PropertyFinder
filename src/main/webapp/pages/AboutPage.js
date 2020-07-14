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
                <img className='aboutImg' src="https://i.ibb.co/G2VfmP8/about-us-photo.jpg"/>
                <div>
                    <div className='pageText'>Have you ever wanted to build your own development site? Find a suitable plot, work with designers and council, then start building your own project?</div>
                    <div className='pageText'>This is what I wanted to do but found it too time-consuming filtering through all the properties listed for sale and couldn't manually scan every property for its development potential.</div>
                    <div className='pageText'>I created software to help filter sites that matched what I was looking for.</div>
                    <div className='pageText'>As I can only develop one site at a time I wanted to share the software with others and so published this website.</div>
                    <div className='pageText'>I welcome any feedback.</div>
                </div>
            </div>
        </Layout>
    );
};

AboutPage.propTypes = {

};

export default AboutPage;