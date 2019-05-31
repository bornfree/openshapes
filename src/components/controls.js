import React from 'react';
import { connect } from 'react-redux';
import { requestDrawing } from '../redux/actions';

/*
Controls
*/

function mapStateToProps(state){
    return state;
}

class Controls extends React.Component {

    render(){
        return(
            <div id="controls">
                <div className="row">
                    <div className="col text-center top-margin-20 bottom-margin-20">
                        <button className="btn btn-warning top-margin-20" onClick={() => this.props.requestDrawing()} disabled={this.props.requestingDrawing}>
                            <b>Create</b>
                        </button>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button">
                        <i className="fas fa-undo fa-2x"></i>
                        <p><small>Undo</small></p>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button">
                        <i className="fas fa-redo fa-2x"></i>
                        <p><small>Redo</small></p>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button">
                        <i className="fas fa-download fa-2x"></i>
                        <p><small>Download</small></p>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button">
                        <i className="fas fa-times fa-2x"></i>
                        <p><small>Clear</small></p>
                    </div>
                </div>
            </div>

        );
    }

}

export default connect(
    mapStateToProps,
    {requestDrawing}
  )(Controls)