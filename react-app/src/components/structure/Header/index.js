 import React, {Component} from 'react';
 import {MapTo} from '@adobe/cq-react-editable-components';

 const HeaderEditConfig = {
 
     emptyLabel: 'Header',
 
     isEmpty: function(props) {
        return !props || !props.logoImgPath || props.logoImgPath.trim().length < 1;
     }
 };
 
 class Header extends Component {
 
     render() {
         return (
            <header class="o-header">
                AFN Header {this.props.logoImgPath}
            </header>
         )
     }
 }
 
 export default MapTo('afn/components/structure/header')(Header, HeaderEditConfig);
 