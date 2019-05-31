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

    handleAddObject(itemName){
        this.props.addObject(itemName);
    }
    
    render(){
        return(
            <div id="objects">
                {things.map((item) =>
                <button key={item.name} className="btn btn-outline-primary btn-sm item-button" onClick={() => this.handleAddObject(item.name)}>
                    {item.name}
                </button>    
                )}
            </div>
        );
    }
}

export default connect(
    null,
    {addObject}
  )(Objects)