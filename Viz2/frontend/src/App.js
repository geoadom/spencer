import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

import Pyramid from './components/pyramid';
import Pyramid from './components/projection';
import Pyramid from './components/flow';
import Pyramid from './components/map';
import Pyramid from './components/year'
import Pyramid from './components/filter'

//import data from './data.csv';

import { LineChart } from './LineChart';

const If = ({ c, children }) => c() ? children : null;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: (props.data || []).map(this.rowParse)
        }
    }

    dateParse = d3.timeParse("%d %b %Y");

    rowParse = ({ date, time, runner }) => ({
        date: this.dateParse(date),
        time: time.split(':')
                  .map(Number)
                  .reverse()
                  .reduce((t, n, i) => i > 0 ? t+n*60**i : n),
        runner
    });

    componentWillMount() {
        if (!this.state.data.length) {
            d3.csv("./data/pop2021rangeAges.csv")
              .row(this.rowParse)
              .get(data => this.setState({ data }))
        }
    }

    render() {
        const { data } = this.state;

        return (
            <div className="App">
                <Filters className="App-Filters">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Server-side rendering a D3 chart</h1>
                </Filters>
                <Map className="App-Map">
	                <If c={() => data.length}>
	                    <svg width="800" height="600">
	                        <LineChart data={data}
	                                   x={100}
	                                   y={50}/>
	                    </svg>
	                </If>
                </Map>
                <Pyramid className="App-Pyramid">
	                <If c={() => data.length}>
	                    <svg width="800" height="600">
	                        <LineChart data={data}
	                                   x={100}
	                                   y={50}/>
	                    </svg>
	                </If>
                </Pyramid>
                <Proyections className="App-Proyections">
	                <If c={() => data.length}>
	                    <svg width="800" height="600">
	                        <LineChart data={data}
	                                   x={100}
	                                   y={50}/>
	                    </svg>
	                </If>
                </Proyections>
                <Flow className="App-Flow">
	                <If c={() => data.length}>
	                    <svg width="800" height="600">
	                        <LineChart data={data}
	                                   x={100}
	                                   y={50}/>
	                    </svg>
	                </If>
                </Flow>
                
                <Year className="App-Year">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Server-side rendering a D3 chart</h1>
                </Year>
            </div>
            
        );
    }
    
export default App;
