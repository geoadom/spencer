const path = require('path');
const fs = require('fs');
const tools = require('./tools')

const React = require('react');
const {renderToString} = require('react-dom/server');

//const {default: configureStore} = require('../src/store')
const {default: App} = require('../src/App');

const csvFilePath = path.resolve(__dirname, '..', 'src', '../data/pop2021rangeAges.csv');
const csvparse = require('csv-parse');

module.exports = function universalLoader(req, res) {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData)=>{
        if (err) {
            console.error('read err', err);
            return res.status(404).end();
        }
        //reading Asynchronously (read the entire contents of a file. See how to change to stream)
        fs.readFile(csvFilePath, (err, raw) => {
            csvparse(raw, {columns: true, trim: true}, (err, data) => {
            	 //Note: readFile() return an Buffer object
            	 //make calculations over the file content. How??
            	 //call tools.all(data) or tools.ethnicity(data,eth) or tools.msoa(data,msoa)
                const markup = renderToString(
                    <App data={data} />
                );

                const RenderedApp = htmlData.replace('{{SSR}}', markup);
                res.send(RenderedApp)
            });
        });
    });
}
