import React from 'react';
import axios from 'axios';
import Konva from 'konva';
import { Stage, Layer,Image, Transformer, Circle } from 'react-konva';
import CanvasImage from './canvasImage';
import CanvasLine from './canvasLine';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../redux/store';
import {drawLine, fetchDrawing, selectDrawing, clearDrawing, requestComplete} from '../redux/actions'

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
      height: null,
      selectedShapeName: '',
      dimensionsSet: false,
      requestingDrawing: false,
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
    this.drawingInProgress = false;
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
    return this.state.dimensionsSet? this.state.height : 10;
  }

  getCanvasHeight(){
    return this.state.dimensionsSet? this.state.height : 10;
  }

  handleCreateClick(){
    var inputMapBase64 = this.stageRef.toDataURL();
    var instanceMapBase64 = this.stageRefClone.toDataURL();
    
    axios.post(`http://devbox1.vision.cs.cmu.edu:3000/generate`,{
      input_map : inputMapBase64,
      instance_map : instanceMapBase64
    })
      .then(res => {
        const results = res.data.results;
        // this.setState({requestingDrawing : false});
        this.props.fetchDrawing(results);
        this.props.selectDrawing(results[0]);
      }).finally(() => {
        this.props.requestComplete();
        this.drawingInProgress = false;
      });
      
  }

  componentDidMount(){

    this.setState({
      dimensionsSet: true,
      height: this.surface.clientWidth
    });
    
  }

  rgbToString(rgb){
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.5)`
  }

  getStyle(){
    return {
        height: this.state.height + "px"
    }
  }

  componentDidUpdate(){  
    if(this.props.requestingDrawing && this.drawingInProgress === false){
      this.drawingInProgress = true;
      this.handleCreateClick();
    }
  }

  render(){
      
        return(
            <div id="surface" className="top-margin-20" style={this.getStyle()} ref={node => this.surface = node}>
            
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
                  
                  {this.props.items.map((item, i) => 

                    item.itemType === "object"?
                    
                      <CanvasImage key={item.id} {...item} /> :
                      <CanvasLine  key={item.id} {...item} />
                    
                  )}

                  {
                    !this.props.disableLineDrawing?
                    <Circle 
                      x={this.state.position.point.x} 
                      y={this.state.position.point.y} 
                      radius={this.props.brushSize/2} 
                      fill={this.rgbToString(this.props.brushColor)}
                      stroke='black'
                      strokeWidth="1" />
                    :null
                  }
                  
                  <CanvasLine points={this.state.currentLine} brushSize={this.props.brushSize} brushColor={this.props.brushColor}/>

                  <Handler selectedShapeName={this.state.selectedShapeName} />
                </Layer>
                </Provider>
                
              </Stage>

            <Stage className="d-none"
              width={this.getCanvasWidth()} 
              height={this.getCanvasHeight()} 
              ref={node => {
                this.stageRefClone = node;
              }}>
                <Provider store={store}>
                <Layer>
                  {this.props.items.map((item, i) => 

                    item.itemType === "object"?
                    
                      <CanvasImage key={item.id} filters={[Konva.Filters.RGB]} {...item} /> :
                      <CanvasLine  key={item.id} {...item} />
                    
                  )}

                </Layer>
                </Provider>
            </Stage>

            </div>
        );
  }

}

function mapStateToProps(state){
  console.log(state);
  return {
    items: state.canvas.present.items,
    brushSize: state.ui.brushSize,
    disableLineDrawing: (state.ui.drawingMode === "object"),
    brushColor: state.ui.brushColor,
    requestingDrawing: state.ui.requestingDrawing,
    selectedDrawing: state.canvas.present.selectedDrawing
  }
}

export default connect(
  mapStateToProps,
  {drawLine, fetchDrawing, selectDrawing, clearDrawing, requestComplete}
)(Surface)