import React from "react";
import PropTypes from "prop-types";
import "./pages.scss";
import Layout from "../components/organisms/layout/Layout";

const ContactPage = props => {
    return (
        <Layout>
            <div className='pageContainer'>
                <div className='pageText'>Contact me using the widget on the bottom right of the website.</div>
                <div className='pageText'>Look forward to any feedback or additional information you would like added to the website.</div>
            </div>
        </Layout>
    );
};

ContactPage.propTypes = {};

export default ContactPage;
