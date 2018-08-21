import React, { Component } from 'react';
import ButtonAppBar from './ButtonAppBar';
import Expense from './Expense';
import Papa from 'papaparse';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileNames: this.loadFiles(),
            payloads: this.loadPayloads(),
        }
    }

    loadFiles() {
        return [];
    }
    updateFiles(e) {
        this.setState({
            fileNames: Array.from(e.target.files).map(file => file.name),
        });
    }

    loadPayloads() {
        return [{date: '2018-09', amount: '2,000'}];
    }
    updatePayloads(e) {
        Promise.all(Array.from(e.target.files).map(file => this.calcExpense(file))).then(result => {
            this.setState({
                payloads: this.mergeResult(result),
            })
        });
    }
    calcExpense(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file, 'shift-jis');
            reader.onload = (e) => {
                let content = e.target.result;
                for (const key of Object.keys(CONFIG.CONVERT_STRINGS)) {
                    content = content.replace(new RegExp(key,"g"), CONFIG.CONVERT_STRINGS[key])
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
    // mergeResult(arrays) {
    //     let unitArray = arrays.reduce()
    //
    // }

    mergeResult(files) {
        let result = [];
        for (const file of files) {
            for (const row of file) {
                const found = result.length > 0 && result.find(elm => elm.date === row.date);
                if (found) {
                    found.amount += row.amount;
                } else {
                    result.push(row);
                }
            }
        }

        console.log('result=' + result);
        return result;
    }

    changeFiles(e) {
        this.updateFiles(e);
        this.updatePayloads(e);
    }

    render() {
        return (
            <div>
                <ButtonAppBar fileNames={this.state.fileNames} changeFiles={(e) => this.changeFiles(e)}/>
                <Expense payloads={this.state.payloads}/>
            </div>
        );
    }
}

export default App