import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Title extends React.Component{
    render(){
        return(
            <div>
                <h6>{this.props.Text}</h6>
            </div>
        )
    }
}