import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Chart from 'react-apexcharts'

//Importação de Componentes
import CardProjetosUltimo from '../Cards/CardsProjetosMes'
import { Card } from 'react-bootstrap'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'series1',
                data: [44, 55, 30, 50, 60, 30, 70]

            }],

            options: {
                chart: {
                    type: 'bar',
                    height: 230,
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

                grid: {
                    show: true,
                    borderColor: '#90A4AE',
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

                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '70%',

                    },
                },
                dataLabels: {
                    enabled: false
                },

                xaxis: {
                    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1,
                    colors: ['#26a69a']
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return " Total Funcionários " + val
                        }
                    }
                }
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar" height={200} />
            </div>
        );
    }
}

export default class CardGrafico extends React.Component {
    render() {
        return (
            <div className="col-xl-5">
                <Card style={{ border: 'none' }} className="mt-3 mb-4">
                    <Card.Body>
                        <div className="row">
                            <h5 style={{ fontFamily: 'BoldG' }} className="card-title ml-5 mt-4 mb-4">Nº de Projetos Anual</h5>
                        </div>
                        <div className="row justify-content-left">
                            <div style={{ paddingLeft: 30, paddingRight: 30 }} className="col-12">
                                <App />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <CardProjetosUltimo />
            </div>
        );
    }
}
