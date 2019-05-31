import React from 'react';
import { connect } from 'react-redux';

/*
Results
*/

class Results extends React.Component {

    getDrawings(){

    }

    render(){
        return(
            <div id="results" className="top-margin-20">
                <p><b>Drawings</b></p>
                <div className="row">
                {[1,2,3,4,5].map((i) => 
                    <div key={i} className="col-md-2">
                        <div className="result">
                            <img ></img>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
      state
    }
  }
  
  export default connect(
    mapStateToProps,
    //{transformObject, moveObject}
  )(Results)