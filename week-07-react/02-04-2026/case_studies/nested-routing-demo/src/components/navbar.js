import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>MyApp</h2>
            <div>
                <NavLink to="/" style={styles.link} end>Home</NavLink>
                <NavLink to="/about" style={styles.link}>About</NavLink>
                <NavLink to="/contact" style={styles.link}>Contact</NavLink>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#1e293b",
        color: "#fff"
    },
    logo: {
        margin: 0
    },
    link: ({ isActive }) => ({
        margin: "0 10px",
        textDecoration: "none",
        color: isActive ? "#38bdf8" : "#fff",
        fontWeight: isActive ? "bold" : "normal"
    })
};

export default Navbar;