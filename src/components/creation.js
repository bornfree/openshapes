import React from 'react';
import { connect } from 'react-redux';

class Creation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            height: null
        }
    }

    getStyle(){
        return {
            height: this.state.height + "px"
        }
    }

    componentDidMount(){
        this.setState({
            height: this.creationRef.clientWidth
        });
    }

    render(){
        return(
            <div id="creation" className="top-margin-20" style={this.getStyle()} ref={node => this.creationRef = node}>
                {this.props.selectedDrawing?
                <img src={this.props.selectedDrawing}>
                </img>
                : <span style={{margin:'auto'}}>
                    Draw on the canvas on the right side and click Create
                </span>
                }
                
            </div>
        );
    }

}

function mapStateToProps(state){
    console.log(state);
    return {
      selectedDrawing: state.canvas.present.selectedDrawing
    }
  }
  
  export default connect(
    mapStateToProps,
    null,
  )(Creation)