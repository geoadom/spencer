import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as d3 from 'd3';

d3.csv("../data/data.csv")
  .row(this.rowParse)
  .get(data =>
      ReactDOM.hydrate(<App data={data} />, document.getElementById('root'))
  );
//registerServiceWorker();


