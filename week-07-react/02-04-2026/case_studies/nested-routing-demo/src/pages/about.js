import React from "react";
function About(){
    return (
        <div style={styles.container}>
            <h1>About Us</h1>
            <p>This application demonstrates React Router Concepts.</p>
            <p>It includes navigation, routing, and component rendering.</p>
        </div>
    );
}
const styles = {
    container: {
        padding: "40px",
        textAlign: "center",
        background: "#bac095"
    }
};
export default About;