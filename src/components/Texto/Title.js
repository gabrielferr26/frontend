import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export default class Title extends React.Component{
    render(){
        return(
            <div>
                <h3 style={{marginLeft:-8, fontFamily:'semiBold'}}>{this.props.Title}</h3>
            </div>
        )
    }
}