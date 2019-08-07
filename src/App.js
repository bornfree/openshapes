import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Controls from './components/controls';
import Surface from './components/surface';
import Results from './components/results';
import Toolset from './components/toolset';
import Creation from './components/creation';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){

    return (
      <div className="App" id="app">
        <Navbar/>

        <div id="editor" className="container-fluid">
          <div className="row">

            <div className="col-md-1">
              <Controls/>
            </div>

            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <Surface/>
                </div>
                <div className="col-md-6">
                  <Creation/>
                </div>

                <div className="col-md-12">
                  <Results/>
                </div>
              </div>
              
              
            </div>

            <div className="col-md-2">
              <Toolset/>
            </div>

          </div>
        </div>

        
      </div>
    );
  }
}
