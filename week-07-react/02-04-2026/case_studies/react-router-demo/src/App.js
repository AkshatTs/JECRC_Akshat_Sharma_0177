// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


//-----------------------------------------------------------------------------------------------//


import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

function App() {
    return (
        <BrowserRouter>
            <nav style={styles.nav}>
                <NavLink to="/" style={styles.link} end>Home</NavLink>
                <NavLink to="/about" style={styles.link}>About</NavLink>
                <NavLink to="/contact" style={styles.link}>Contact</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}

const styles = {
    nav: {
        display: 'flex',
        gap: '20px',
        padding: '15px',
        background: '#2e2c2c',
        justifyContent: 'center'
    },
    link: ({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? '#cfffdc' : 'white',
        fontWeight: isActive ? 'bold' : 'normal'
    })
};

export default App;