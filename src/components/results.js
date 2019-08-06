import React from 'react';
import { connect } from 'react-redux';
import { selectDrawing } from '../redux/actions';

/*
Results
*/

class Results extends React.Component {
    
    render(){
        return(
            <div id="results" className="top-margin-20">
                {this.props.resultImages.length > 0?
                         
                    <p><b>Drawings</b></p>
                    :null
                }
                <div className="row">
                {this.props.resultImages.map((i, index) => 
                    <div key={index} className="col-md-2">
                        <div className="result">
                            <img src={i} className="img img-fluid" onClick={() => this.props.selectDrawing(i)}></img>
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
        resultImages: state.ui.resultImages
    }
  }
  
  export default connect(
    mapStateToProps,
    {selectDrawing}
  )(Results)