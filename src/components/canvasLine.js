import React from 'react';
import { Line } from 'react-konva';

export default class CanvasLine extends React.Component {

    rgbToString(rgb){
        return `rgba(${rgb[0]},${rgb[1]},${rgb[2]})`
    }
    render(){
        return <Line ref={node => this.konvaLine = node} points={this.props.points} stroke={this.rgbToString(this.props.brushColor)} tension={.7} strokeWidth={this.props.brushSize}  />
    }
}

function mapStateToProps(state){
    return {
      state
    }
  }
  
  