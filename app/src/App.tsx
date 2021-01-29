import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'library'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button backgroundColor="#4A90E2" primary size="small" label="Yay a Button from Storybook">test</Button>
      </header>
    </div>
  );
}

export default App;
