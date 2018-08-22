import React, { Component } from 'react';
import ButtonAppBar from './ButtonAppBar';
import Expense from './Expense';
import Papa from 'papaparse';
import {inverseObject} from './Util';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileNames: [],
            payloads: [],
        }

        this.headerTerms = inverseObject(CONFIG.HEADER_TERMS);
        this.filterTerms = inverseObject(CONFIG.FILTER_TERMS);
    }

    updateFiles(e) {
        const fileNames = Array.from(e.target.files).map(file => file.name);
        Promise.all(Array.from(e.target.files).map(file => this.parseCsv(file))).then(result => {
            this.setState({
                fileNames: fileNames,
                payloads: this.calcExpense(result),
            })
        });
    }
    parseCsv(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file, 'shift-jis');
            reader.onload = (e) => {
                let content = e.target.result;
                for (const key of Object.keys(this.headerTerms)) {
                    content = content.replace(new RegExp(key,"g"), this.headerTerms[key])
                }
                for (const key of Object.keys(this.filterTerms)) {
                    content = content.replace(new RegExp(key,"g"), this.filterTerms[key])
                }
                const parsedData = Papa.parse(content, {encoding: 'shift-jis', header: true});
                console.log('data4=' + JSON.stringify(parsedData.data[4]));
                resolve([{date: '2018/08', amount: '1000'}, {date: '2018/07', amount: '3000'}])
            };
            reader.onerror = () => {
                reject('###csv load error: ' + file.name);
            };
        });
    }

    calcExpense(arrays) {
        return [{date: '2018/08', expenditure: '¥3,000'}];

    }


    // calcExpense(files) {
    //     let result = [];
    //     for (const file of files) {
    //         for (const row of file) {
    //             const found = result.length > 0 && result.find(elm => elm.date === row.date);
    //             if (found) {
    //                 found.amount += row.amount;
    //             } else {
    //                 result.push(row);
    //             }
    //         }
    //     }
    //
    //     console.log('result=' + result);
    //     return result;
    // }


    render() {
        return (
            <div>
                <ButtonAppBar fileNames={this.state.fileNames} updateFiles={(e) => this.updateFiles(e)}/>
                <Expense payloads={this.state.payloads}/>
            </div>
        );
    }
}

export default App