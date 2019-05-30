import React from 'react';

/*
Results
*/

export default class Results extends React.Component {

    render(){
        return(
            <div id="results" className="top-margin-20">
                <p><b>Drawings</b></p>
                <div className="row">
                {[1,2,3,4,5].map((i) => 
                    <div key={i} className="col-md-2">
                        <div className="result">
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }
}