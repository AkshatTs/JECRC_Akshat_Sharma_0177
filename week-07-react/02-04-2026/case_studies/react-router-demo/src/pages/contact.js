import React from "react";
function Contact(){
    return (
        <div style={styles.container}>
            <h1>Contact Us</h1>
            <p>You can reach us at:</p>
            <p>Email: info@company.com</p>
            <p>Phone: +91 9876543210</p>
        </div>
    );
}
const styles = {
    container: {
        padding: "40px",
        textAlign: "center",
        background: "#d4de95"
    }
};
export default Contact;