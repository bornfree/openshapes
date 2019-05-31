import React from 'react';
import { Stage, Layer, Transformer, Circle } from 'react-konva';
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
      currentLine: [],
      position: {
        point:{
          x:-200,
          y:-200
        }
      }
    };
    
    this.getCanvasHeight = this.getCanvasHeight.bind(this);
    this.getCanvasWidth = this.getCanvasWidth.bind(this);
  }
  
  handleMouseDown = () => {
      if(this.props.disableLineDrawing)
        return
    
      this._drawing = true;
  }

  handleMouseMove = e => {

    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    
    this.setState({
      position: {
        point
      }
    });

    if(this.props.disableLineDrawing)
      return

    // no drawing - skipping
    if (!this._drawing) {
      return;
    }
    
   this.setState({
    currentLine: this.state.currentLine.concat([point.x, point.y]),
    position: {
      point
    }
   });

  };

  handleMouseUp = () => {
    if(this.props.disableLineDrawing)
      return

    this._drawing = false;
    this.props.drawLine(this.state.currentLine, this.props.brushColor, this.props.brushSize);
    this.setState({
      currentLine: []
    });
  };

  handleMouseLeave = () => {
    this.setState({
      position: {
        point: {
          x:-200,
          y:-200
        }
      }
    });
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

  rgbToString(rgb){
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.5)`
}
  
  render(){
      
        return(
            <div id="surface" className="top-margin-20" ref={node => this.surface = node}>
            <Stage width={this.getCanvasWidth()} height={this.getCanvasHeight()} 
              onClick={this.handleStageClick}
              onContentMousedown={this.handleMouseDown}
              onContentMousemove={this.handleMouseMove}
              onContentMouseup={this.handleMouseUp}
              onContentMouseout={this.handleMouseLeave}
              ref={node => {
                this.stageRef = node;
              }}
              >
              <Provider store={store}>
                <Layer>

                  {
                    !this.props.disableLineDrawing?
                    <Circle x={this.state.position.point.x} y={this.state.position.point.y} radius={this.props.brushSize/2} fill={this.rgbToString(this.props.brushColor)}/>
                    :null
                  }
                  
                  <CanvasLine points={this.state.currentLine} brushSize={this.props.brushSize} brushColor={this.props.brushColor}/>

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
  return {
    items: state.canvas.present.items,
    brushSize: state.ui.brushSize,
    disableLineDrawing: (state.ui.drawingMode === "object"),
    brushColor: state.ui.brushColor
  }
}

export default connect(
  mapStateToProps,
  {drawLine}
)(Surface)