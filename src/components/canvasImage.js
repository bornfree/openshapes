import React from 'react';
import { Image } from 'react-konva';
import { connect } from 'react-redux';
import { transformObject, moveObject } from '../redux/actions';

class CanvasImage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      image: null
    };  
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  handleTransformEnd(){
    this.props.transformObject(this.props.id, this.konvaImage.x(), this.konvaImage.y(), this.konvaImage.rotation(), this.konvaImage.scaleX(), this.konvaImage.scaleY());
  }

  handleDragEnd(){
    this.props.moveObject(this.props.id, this.konvaImage.x(), this.konvaImage.y());
  }

  render() {
    return (
      <Image 
        ref={node => this.konvaImage = node} 
        image={this.state.image}
        onTransformEnd={() => this.handleTransformEnd()} 
        onDragEnd={() =>this.handleDragEnd()} 
        name={this.props.id}
        x={this.props.x}
        y={this.props.y}
        scaleX={this.props.scaleX}
        scaleY={this.props.scaleY}
        rotation={this.props.rotation}
        draggable />
      );
  }
}

export default connect(
  null,
  {transformObject, moveObject}
)(CanvasImage)