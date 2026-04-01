// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div style={styles.container}>
//       <h1>Counter App</h1>
//       <h2>Count: {count}</h2>
//       <button style={styles.btn} onClick={() => setCount(count + 1)}>Increment</button>
//       <button style={styles.btn} onClick={() => setCount(count - 1)}>Decrement</button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
// };

// export default App;

//-----------------------------------------------------------------------------

// import React, { useState } from 'react';
// function App() {
//   const [count, setCount] = useState(0);
//   //Functional Updates
//   const increment = () => {
//     setCount(prev => prev + 1);
//   };
//   const incrementByTwo = () => {
//     setCount(prev => prev + 2);
//   };
//   const resetCount = () => {
//     setCount(0);
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Functional Update Demo</h1>
//       <h2>Count: {count}</h2>
//       <div>
//         <button style={styles.btn} onClick={increment}>Increment</button>
//         <button style={styles.btn} onClick={incrementByTwo}>Increment by 2</button>
//         <button style={styles.resetBtn} onClick={resetCount}>Reset</button>
//       </div>
//       <p style={styles.info}>
//         Using <b>prev state</b> ensures correct updates even when multiple updates happen.
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   resetBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
// };

// export default App;


//-----------------------------------------------------------------------------

// import React, { useState } from 'react';
// function App() {
//   //Lazy Initialization (runs only once)
//   const [data, setData] = useState(() => {
//     console.log('Expensive computation running...');
//     let result = 0;
//     for (let i = 0; i < 1000000; i++) {
//       result += i;
//     }
//     return result % 1000; // Just to keep the number manageable
//   });

//   //Update without re-running expensive logic
//   const recalculateData = () => {
//     setData(prev => {
//       console.log('Recalculating data without expensive logic...');
//       return prev + 100; // Simulate a simple update
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Lazy Initialization Demo</h1>
//       <h2>Data: {data}</h2>
//       <button style={styles.btn} onClick={recalculateData}>Recalculate Data (+100)</button>
//       <p style={styles.info}>
//         The expensive computation runs only once during initial render.
//       </p>
//       <p style={styles.note}>
//         Open the console to see when the expensive computation runs.
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   resetBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
// };

// export default App;


//-----------------------------------------------------------------------------


// import React, { useState } from 'react';
// function App() {
//   //Object State
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     age: "",
//   });
//   //Update Functions
//   const updateUserName = (name) => {
//     setUser(prev => ({ ...prev, name: name }));
//   };
//   const updateUserAge = (age) => {
//     setUser(prev => ({ ...prev, age: age }));
//   };
//   const updateUserEmail = (email) => {
//     setUser(prev => ({ ...prev, email: email }));
//   };
//   const resetUser = () => {
//     setUser({ name: "", email: "", age: "" });
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Object State Demo</h1>
//       {/*Input fields */}
//       <input
//         type="text"
//         placeholder="Enter Age"
//         onChange={(e) => updateUserAge(e.target.value)}
//         style={styles.input}
//       />
//       <input
//         type="email"
//         placeholder="Enter Email"
//         onChange={(e) => updateUserEmail(e.target.value)}
//         style={styles.input}
//       />
//       <input
//         type="text"
//         placeholder="Enter Name"
//         onChange={(e) => updateUserName(e.target.value)}
//         style={styles.input}
//       />

//       {/*Buttons */}
//       <div>
//         <button style={styles.btn} onClick={() => updateUserName("")}>Set Name</button>
//         <button style={styles.btn} onClick={() => updateUserAge("")}>Set Age</button>
//         <button style={styles.btn} onClick={() => updateUserEmail("")}>Set Email</button>
//         <button style={styles.btn} onClick={resetUser}>Reset</button>
//       </div>

//       {/*Display Data */}
//       <div style={styles.card}>
//         <h2>User Info</h2>
//         <p><b>Name:</b> {user.name}</p>
//         <p><b>Email:</b> {user.email}</p>
//         <p><b>Age:</b> {user.age}</p>
//       </div>

//       <p style={styles.info}>
//         Object state requires <b>spread operator (...prev)</b> to preserve existing data.
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   input: {
//     margin: '10px',
//     padding: '10px',
//     fontSize: '16px',
//     width: '200px',
//   },
//   card: {
//     marginTop: '20px',
//     padding: '20px',
//     border: '1px solid #ccc',
//     display: 'inline-block',
//     textAlign: 'left',
//   },
//   info: {
//     marginTop: '20px',
//     fontStyle: 'italic',
//     color: '#555',
//   },
// };

// export default App;



//-----------------------------------------------------------------------------


// import React, { useState } from 'react';
// function App() {
//   //Array State
//   const [items, setItems] = useState([]);
//   //Add Single Item
//   const addItem = () => {
//     const newItem = {
//       id: Date.now(),
//       name: "Item " + (items.length + 1),
//       created: new Date().toLocaleTimeString()
//     };
//     setItems(prev => [...prev, newItem]);
//   };
//   //Add Multiple Items
//   const addMultipleItems = () => {
//     const newItems = [
//       { id: Date.now(), name: "Batch Item 1", created: new Date().toLocaleTimeString() },
//       { id: Date.now() + 1, name: "Batch Item 2", created: new Date().toLocaleTimeString() },
//       { id: Date.now() + 2, name: "Batch Item 3", created: new Date().toLocaleTimeString() },
//     ];
//     setItems(prev => [...prev, ...newItems]);
//   };
//   //Update Item
//   const updateItem = (id) => {
//     setItems(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, name: "Updated Item", updated: new Date().toLocaleTimeString() } : item
//       )
//     );
//   };
//   //Delete Item
//   const deleteItem = (id) => {
//     setItems(prev => prev.filter(item => item.id !== id));
//   };
//   //Delete All
//   const deleteAllItems = () => {
//     setItems([]);
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Array State Demo</h1>
//       {/*Buttons */}
//       <div>
//         <button style={styles.btn} onClick={addItem}>Add Item</button>
//         <button style={styles.btn} onClick={addMultipleItems}>Add Multiple Items</button>
//         <button style={styles.deleteAllBtn} onClick={deleteAllItems}>Delete All Items</button>
//       </div>
//       <h3>Total Items: {items.length}</h3>
//       {/*List Rendering */}
//       <ul style={styles.list}>
//         {items.map(item => (
//           <li key={item.id} style={styles.card}>
//             <p><b>Name:</b> {item.name}</p>
//             <p><b>Created:</b> {item.created}</p>
//             {item.updated && <p><b>Updated:</b> {item.updated}</p>}
//             <button style={styles.updateBtn} onClick={() => updateItem(item.id)}>Update</button>
//             <button style={styles.deleteBtn} onClick={() => deleteItem(item.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <p style={styles.info}>
//         Always use <b>map, filter, and reduce</b> for array manipulations.
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   deleteAllBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#e74c3c',
//     color: '#fff',
//     border: 'none',
//   },
//   updateBtn: {
//     marginRight: '10px',
//     padding: '5px 10px',
//     fontSize: '14px',
//     backgroundColor: '#3498db',
//     color: '#fff',
//     border: 'none',
//   },
//   deleteBtn: {
//     padding: '5px 10px',
//     fontSize: '14px',
//     backgroundColor: '#e74c3c',
//     color: '#fff',
//     border: 'none',
//   },
//   list: {
//     listStyleType: 'none',
//     padding: 0,
//   },
//   card: {
//     margin: '10px auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     width: '300px',
//     textAlign: 'left',
//   },
//   info: {
//     marginTop: '20px',
//     fontStyle: 'italic',
//     color: '#555',
//   },
// };

// export default App;



//-----------------------------------------------------------------------------


import React, { useReducer, useState } from "react";

function App() {

  //Initial State
  const initialCounterState = {
    count: 0,
    history: []
  };

  //Reducer Function
  function counterReducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            { type: "increment", value: state.count + 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "decrement":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            { type: "decrement", value: state.count - 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "reset":
        return {
          count: 0,
          history: [
            ...state.history,
            { type: "reset", value: 0, time: new Date().toLocaleTimeString() }
          ]
        };

      case "set":
        return {
          count: action.payload,
          history: [
            ...state.history,
            { type: "set", value: action.payload, time: new Date().toLocaleTimeString() }
          ]
        };

      default:
        return state;
    }
  }

  //useReducer Hook
  const [counterState, dispatch] = useReducer(counterReducer, initialCounterState);

  //Input State for SET
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.container}>
      <h1>useReducer Counter (Advanced)</h1>

      <h2>Count: {counterState.count}</h2>

      {/*Actions */}
      <div>
        <button style={styles.btn} onClick={() => dispatch({ type: "increment" })}>
          +1
        </button>

        <button style={styles.btn} onClick={() => dispatch({ type: "decrement" })}>
          -1
        </button>

        <button style={styles.resetBtn} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>

      {/* Set Value */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onClick={() =>
            dispatch({ type: "set", payload: Number(inputValue) })
          }
        >
          Set Value
        </button>
      </div>

      {/*History */}
      <h3 style={{ marginTop: "30px" }}>History</h3>

      <ul style={styles.list}>
        {counterState.history.map((item, index) => (
          <li key={index} style={styles.card}>
            <b>{item.type.toUpperCase()}</b> → {item.value}
            <br />
            <small>{item.time}</small>
          </li>
        ))}
      </ul>

      <p style={styles.info}>
        useReducer is best for <b>complex state logic & history tracking</b>
      </p>
    </div>
  );
}

//Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  resetBtn: {
    margin: "10px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    marginRight: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  }
};

export default App;