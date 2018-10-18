import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class Spinner extends Component {
   render() {
    return(
     <Loader 
        type="ThreeDots"
        color="#00BFFF"
        height="30"	
        width="150"
     />   
    );
   }
}

export default Spinner;