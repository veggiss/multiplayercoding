import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';

class Progress extends Component {
	render() {
	  return (
	    <div>
	    	<ProgressBar active now={0} />
	    	<ProgressBar active now={0} />
        <MyContext.Consumer>
          {(context) => (
            <React.Fragment>
              <p>Age: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
            </React.Fragment>
          )}
        </MyContext.Consumer>
	    </div>
	  );
	}
}

export default Progress;