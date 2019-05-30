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
    image.src = this.props.url;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  handleTransformEnd(){
    this.props.transformObject(this.konvaImage.name(), this.konvaImage.rotation(), this.konvaImage.scaleX(), this.konvaImage.scaleY());
  }

  handleDragEnd(){
    this.props.moveObject(this.konvaImage.name(), this.konvaImage.x(), this.konvaImage.y());
  }

  render() {
    return <Image ref={node => this.konvaImage = node} onTransformEnd={() => this.handleTransformEnd()} onDragEnd={() =>this.handleDragEnd()} name={this.props.url} draggable image={this.state.image} />;
  }
}

function mapStateToProps(state){
  return {
    state
  }
}

export default connect(
  mapStateToProps,
  {transformObject, moveObject}
)(CanvasImage)