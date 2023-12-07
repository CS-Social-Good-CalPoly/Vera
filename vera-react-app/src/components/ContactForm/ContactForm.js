import React from 'react';
import './ContactForm.css';

function ContactForm() {
    return (
        <div>
            <h2 style={{ fontFamily: 'fat', color: '#08376B' }}>Questions?</h2>
            <p style={{ fontFamily: 'skinny' }}>Let us know!</p><br />
            <form>
                <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <input type="text" className="form-control" id="comments" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#08376B' }}>Submit</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;