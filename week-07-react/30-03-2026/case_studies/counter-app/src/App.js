import './App.css';
import Counter from './components/Counter';
import StateVsPropsDemo from './components/StateVsPropsDemo';
import TemperatureConverter from './components/TemperatureConverter';

function App() {
  return (
    //   <div className="App">
    //       <Counter />
    //   </div>

    // <div className="App">
    //     <h1>State vs Props Demo</h1>
    //     <StateVsPropsDemo />
    //   </div>

      <div className="App">
        <h1>Temperature Converter</h1>
        <TemperatureConverter/>
      </div>
        
      
  );
}

export default App;
