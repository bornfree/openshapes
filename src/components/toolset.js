import React from 'react';
import items from '../coco.json';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Objects from './objects';

/*
Toolset
*/

var nonThings = items.filter((item) =>
    {return item.isthing !== 1;}
);

export default class Toolset extends React.Component {

    getBrushStyle(i){
        return {
            height: i +"px",
            width: i +"px"
        }
    }

    render(){
        
        return(
            <div id="toolset" className="top-margin-20">
                <p><b>Choose</b></p>

                <Tabs>
                    <TabList>
                    <Tab><b>Backgrounds</b></Tab>
                    <Tab><b>Objects</b></Tab>
                    </TabList>

                    <TabPanel>
                        <div id="backgrounds">
                            <div id="brushSizes">
                                <p>Brush Size</p>
                                {[10, 20, 40, 60, 80].map((i) => 
                                <div key={i} className="brushSize" style={this.getBrushStyle(i)}/>
                                )}
                            </div>
                            
                        
                            {nonThings.map((item) =>
                            <button key={item.name} className="btn btn-hollow btn-sm item-button">
                                {item.name}
                            </button>    
                            )}
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <Objects/>
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}