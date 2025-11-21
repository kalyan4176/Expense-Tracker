import React from 'react';

const ContactUs = () => {
    return (
        <div className="container">
            <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
            <div className="card">
                <p>Have questions or feedback? Reach out to us!</p>
                <form style={{ marginTop: '20px' }}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '100px' }} placeholder="Your Message"></textarea>
                    </div>
                    <button type="button" className="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
