import React from 'react';
import { Stage, Layer, Transformer, Line } from 'react-konva';
import CanvasImage from './canvasImage';
import CanvasLine from './canvasLine';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../redux/store';
import {drawLine} from '../redux/actions'

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

class Surface extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedShapeName: '',
      dimensionsSet: false,
      currentLine: []
    };
    
    this.getCanvasHeight = this.getCanvasHeight.bind(this);
    this.getCanvasWidth = this.getCanvasWidth.bind(this);
  }
  
  handleMouseDown = () => {
    this._drawing = true;
  };

  handleMouseMove = e => {
    // no drawing - skipping
    if (!this._drawing) {
      return;
    }
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    
   this.setState({
    currentLine: this.state.currentLine.concat([point.x, point.y])
   });

  };

  handleMouseUp = () => {
    this._drawing = false;
    this.props.drawLine(this.state.currentLine);
    this.setState({
      currentLine: []
    });
  };

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
            <Stage width={this.getCanvasWidth()} height={this.getCanvasHeight()} 
              onClick={this.handleStageClick}
              onContentMousedown={this.handleMouseDown}
              onContentMousemove={this.handleMouseMove}
              onContentMouseup={this.handleMouseUp}
              ref={node => {
                this.stageRef = node;
              }}
              >
              <Provider store={store}>
                <Layer>

                  <CanvasLine points={this.state.currentLine} brushSize={this.props.brushSize} />

                  {this.props.items.map((item, i) => 

                    item.itemType === "object"?
                    
                      <CanvasImage key={item.id} {...item} /> :
                      <CanvasLine key={item.id} {...item} />
                    
                  )}

                  <Handler selectedShapeName={this.state.selectedShapeName} />
                </Layer>
              </Provider>
            </Stage>
            </div>
        );
  }

}

function mapStateToProps(state){
  console.log("state", state);
  return {
    items: state.canvasItems,
    brushSize: state.brushSize,
  }
}

export default connect(
  mapStateToProps,
  {drawLine}
)(Surface)