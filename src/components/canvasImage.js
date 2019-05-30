import React from 'react';
import { Image } from 'react-konva';

export default class CanvasImage extends React.Component {
  state = {
    image: null
  };

  componentDidMount() {
    console.log(this.props.url);
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

  render() {
    return <Image name={this.props.url} draggable image={this.state.image} scaleX="2" scaleY="2" rotation="30" />;
  }
}