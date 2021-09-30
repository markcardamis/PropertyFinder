import React from "react";
import "./pages.scss";
import Layout from "../components/organisms/layout/Layout";

const ContactPage = () => {
    return (
        <Layout>
            <div className='pageContainer'>
                <div className='pageText'>Contact me using the widget on the bottom right of the website.</div>
                <div className='pageText'>Look forward to any feedback or additional information you would like added to the website.</div>
            </div>
        </Layout>
    );
};

export default ContactPage;
