import React from 'react';
import items from '../coco.json';
import { connect } from 'react-redux';
import { addObject } from '../redux/actions';

/*
Objects
*/

var things = items.filter((item) =>
    {return item.isthing === 1;}
);

class Objects extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            currentObjectName: null
        }
    }

    handleAddObject(index){
        this.props.addObject(this.state.currentObjectName, index);
    }

    setCurrentObject(itemName){
        this.setState({
            currentObjectName: itemName
        });
    }
    
    getObjectImagePath(index){
        return "/images/" + this.state.currentObjectName.replace(" ", "_") + "/" +  index + ".png"
    }

    getSelectedObjectStyle(name){
        return this.state.currentObjectName === name? "object-button selected-object-button": "object-button";
    }

    render(){
        return(
            <div id="objects">
                <div className="row">
                    <div className="col-md-5" id="object-names">
                        <ul className="list-unstyled">
                            {things.map((item) =>
                            
                                <li key={item.name} className={this.getSelectedObjectStyle(item.name)} onClick={() => this.setCurrentObject(item.name)}>
                                    {item.name}    
                                </li>
                            
                            )}

                        </ul>
                    </div>
                    <div className="col-md-7" id="object-images">
                        {this.state.currentObjectName? 
                            [0,1,2,3,4,5,6,7,8,9].map((index) => 
                                <img key={index} className="img img-fluid img-thumbnail" src={this.getObjectImagePath(index)} onClick={() => this.handleAddObject(index)} />
                            )
                            : null}
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default connect(
    null,
    {addObject}
  )(Objects)