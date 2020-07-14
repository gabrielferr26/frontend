import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'

export default class Sub extends React.Component{
    render(){
        return(
            <div>
                <h5 className="mt-3 mb-4" style={{ marginLeft:-5, marginTop:55, fontFamily:'semiBold'}}>{this.props.info}</h5>
            </div>
        )
    }
}