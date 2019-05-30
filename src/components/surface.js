import React from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import { connect } from 'react-redux';
import CanvasImage from './canvasImage';
import { Provider } from 'react-redux';
import store from '../redux/store';

/*
Surface
*/

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
        }
      }
      />
    );
  }
}

function mapStateToProps(state){
  return {
    images: state.canvasImages
  }
}

class Surface extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedShapeName: '',
      dimensionsSet: false
    };
    
    this.getCanvasHeight = this.getCanvasHeight.bind(this);
    this.getCanvasWidth = this.getCanvasWidth.bind(this);
  }

  handleStageClick = e => {
    this.setState({
      selectedShapeName: e.target.name()
    });
  };

  getCanvasWidth(){
    return this.state.dimensionsSet? this.surface.clientWidth : 10;
  }

  getCanvasHeight(){
    return this.state.dimensionsSet? this.surface.clientHeight : 10;
  }

  componentDidMount(){
    this.setState({
      dimensionsSet: true
    });
  }
  
  render(){
    	
        return(
            <div id="surface" className="top-margin-20" ref={node => this.surface = node}>
            <Stage width={this.getCanvasWidth()} height={this.getCanvasHeight()} onClick={this.handleStageClick}>
              <Layer>

                {this.props.images.map((imageUrl) => 
                  <Provider store={store}>
                    <CanvasImage key={imageUrl} url={imageUrl}/>  
                  </Provider>
                )}
                
                <Handler selectedShapeName={this.state.selectedShapeName} />
              </Layer>
            </Stage>
            </div>
        );
  }

}

export default connect(
  mapStateToProps,
  null
)(Surface)