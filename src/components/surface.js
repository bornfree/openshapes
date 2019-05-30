import React from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
/*
Surface
*/

// VERY IMPORTANT NOTES
// at first we will set image state to null
// and then we will set it to native image instanse
// only when image is loaded
class Image1 extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    image.src = "http://konvajs.github.io/assets/yoda.jpg";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return <Image name="yoda" draggable image={this.state.image} />;
  }
}

// here is another way to update the image
class Image2 extends React.Component {
  state = {
    image: new window.Image()
  };
  componentDidMount() {
    this.state.image.src = "http://konvajs.github.io/assets/darth-vader.jpg";
    this.state.image.onload = () => {
      // calling set state here will do nothing
      // because properties of Konva.Image are not changed
      // so we need to update layer manually
      this.imageNode.getLayer().batchDraw();
    };
  }

  render() {
    return (
      <Image
        image={this.state.image}
        y={250}
        name="vader"
        ref={node => {
          this.imageNode = node;
        }}
        draggable
      />
    );
  }
}

class Handler extends React.Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;
    const selectedNode = stage.findOne("." + selectedShapeName);
    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
      />
    );
  }
}


export default class Surface extends React.Component {



	
	state = {
	    selectedShapeName: ''
	  };
	  selectedShapeName
	  handleStageClick = e => {
	    this.setState({
	      selectedShapeName: e.target.name()
	    });
	  };
    render(){
    	
        return(
            <div id="surface" className="top-margin-20">
            <Stage width={1000} height={600} onClick={this.handleStageClick}>
        <Layer>
          <Image1 />
          <Image2 /> 
          <Handler selectedShapeName={this.state.selectedShapeName} />
        </Layer>
      </Stage>
            </div>
        );
    }
}