import React from 'react';
import '../HomePage/HomePage.css';
import { Toplogo, NavBar, Banner, SocialIcons, ContactForm, FullContact} from '../../components/components'

function StorySubmissionPage() {
    
    return (
        <div className="everything row">
            <div className="col-lg-12 col-12 main">
                <div id="home" className="home">
                    <Toplogo />
                    <div className="row main-content">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-8 blurb">
                                    <Banner pageTitle = "Contact" paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip"/>
                                </div>
                                <div className="col-4 number d-flex justify-content-center align-items-center">
                                    <SocialIcons />
                                </div>
                                <div className="col-12 newsletter filters">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{ padding: 0, margin: 0 }}>
                            <NavBar />
                            <FullContact />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StorySubmissionPage;
