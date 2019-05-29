import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Controls from './components/controls';
import Surface from './components/surface';
import Results from './components/results';
import Toolset from './components/toolset';

function App() {
  return (
    <div className="App" id="app">
      <Navbar/>

      <div id="editor" className="container-fluid">
        <div className="row">

          <div className="col-md-1">
            <Controls/>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <Surface/>
              </div>

              <div className="col-md-12">
                <Results/>
              </div>
            </div>
            
            
          </div>

          <div className="col-md-3">
            <Toolset/>
          </div>

        </div>
      </div>

      
    </div>
  );
}

export default App;
