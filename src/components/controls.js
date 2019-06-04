import React from 'react';
import { connect } from 'react-redux';
import { requestDrawing, downloadDrawing, clearDrawing, undo, redo } from '../redux/actions';

/*
Controls
*/

class Controls extends React.Component {

    render(){
        return(
            <div id="controls">
                <div className="row">
                    <div className="col text-center top-margin-20 bottom-margin-20">
                        <button className="btn btn-warning top-margin-20" onClick={() => this.props.requestDrawing()} disabled={this.props.requestingDrawing}>
                            
                            {this.props.requestingDrawing?
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            :<b>Create</b>}

                        </button>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button" onClick={()=> this.props.undo()}>
                        <i className="fas fa-undo fa-2x"></i>
                        <p><small>Undo</small></p>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button" onClick={()=> this.props.redo()}>
                        <i className="fas fa-redo fa-2x"></i>
                        <p><small>Redo</small></p>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button" onClick={() => this.props.downloadDrawing()} >
                        <i className="fas fa-download fa-2x"></i>
                        <p><small>Download</small></p>
                    </div>

                    <div className="col-md-12 text-center top-margin-20 control-button" onClick={() => this.props.clearDrawing()}>
                        <i className="fas fa-times fa-2x"></i>
                        <p><small>Clear</small></p>
                    </div>
                </div>
            </div>

        );
    }

}

function mapStateToProps(state){
    return {
        requestingDrawing: state.ui.requestingDrawing
    }
}

// function mapDispatchToProps(dispatch){
//     return {
//         createDrawing,
//         downloadDrawing,
//         clearDrawing,
//         undo: () => dispatch(ActionCreators.undo()),
//         redo: () => dispatch(ActionCreators.redo())
//     }
// }

export default connect(
    mapStateToProps,
    {requestDrawing, downloadDrawing, clearDrawing, undo, redo}
  )(Controls)