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
                {this.props.resultImages.length > 0?
                    <p><b>Drawings</b></p>
                    :null
                }
                <div className="row">
                {this.props.resultImages.map((i) => 
                    <div key={i} className="col-md-2">
                        <div className="result">
                            <img src={i} className="img img-fluid"></img>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("Resss", state);
    return {
        resultImages: state.ui.resultImages
    }
  }
  
  export default connect(
    mapStateToProps,
    //{transformObject, moveObject}
  )(Results)