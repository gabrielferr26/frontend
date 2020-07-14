import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Chart from 'react-apexcharts'



class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 30, 60, 80]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                        offsetX: 0,
                        offsetY: 0,

                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },
                        autoSelected: 'zoom'
                    },

                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    show: true,
                    borderColor: '#F2B05E',
                    strokeDashArray: 0,
                    position: 'back',
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                    row: {
                        colors: undefined,
                        opacity: 0.5
                    },
                },
                fill: {
                    opacity: 1,
                    colors: ['#F2B05E']
                },
                xaxis: {
                    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov' , 'Dez'],
                }
            },


        };
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="line" height="205" />
            </div>
        );
    }
}

export default class Card extends React.Component {
    render() {
        return (
            <div>
                <div style={{ border: 'none' }} className="card">
                    <div className="card-body">
                        <div className="row">
                            <h5 style={{ fontFamily: 'BoldG' }} className="card-title ml-5 mt-3 mb-3">Funcionários</h5>
                        </div>
                        <div className="row justify-content-start">
                            <div style={{ paddingLeft: 30, paddingRight: 30 }} className="col-12">
                                <App />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}