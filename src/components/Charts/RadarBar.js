import React from 'react'


//Importação de Componentes

//Importação de Icones

export default class RadarBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Series 1',
                // Niveis das Competencias
                data: [80, 50, 30, 40, 100, 20],
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'radar',
                    dropShadow: {
                        enabled: true,
                        blur: 1,
                        left: 1,
                        top: 1
                    }
                },
                stroke: {
                    width: 2
                },
                fill: {
                    opacity: 0.1
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    categories: ['2011', '2012', '2013', '2014', '2015', '2016']
                }
            },
        };
    }
    render() {
        return (
            
        );
    }
}
