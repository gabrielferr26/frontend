import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'

export default class Subtitle extends React.Component{
    render(){
        return(
            <div>
                <h5>{this.props.subtitle}</h5>
            </div>
        )
    }
}