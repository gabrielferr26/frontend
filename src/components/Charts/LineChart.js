import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Chart from 'react-apexcharts'



class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [100, 85, 90, 70],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '22px',
                            },
                            value: {
                                fontSize: '16px',
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: function (w) {
                                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                    return 249
                                }
                            }
                        }
                    }
                },
                labels: ['ReactJS', 'NodeJS', 'Python', 'Javascript'],
            },


        };
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="radialBar" height="210" />
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
                            <h5 style={{ fontFamily: 'BoldG' }} className="card-title ml-5 mt-3 mb-3">Competências</h5>
                        </div>
                        <div className="row justify-content-start">
                            <div style={{ paddingLeft: 10, paddingRight: 30 }} className="col-12 mb-2">
                                <App />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}