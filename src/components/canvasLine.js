import React from 'react';
import { Line } from 'react-konva';
import { connect } from 'react-redux';
import { transformObject, moveObject } from '../redux/actions';
class CanvasLine extends React.Component {
    constructor(props){
        super(props);
        
    }

    handleDrawEnd(){
        this.props.moveObject(this.konvaImage.name(), this.konvaImage.x(), this.konvaImage.y());
      }

    render(){
        return <Line ref={node => this.konvaLine = node} points={this.props.line} stroke="black" tension="0.7" strokeWidth={this.props.brushSize}  />
    }
}

function mapStateToProps(state){
    return {
      state
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(CanvasLine)