import React, { Component } from 'react';
import ButtonAppBar from './ButtonAppBar';
import Expense from './Expense';
import Papa from 'papaparse';
import {inverseObject} from './Util';
import Moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileNames: [],
            expense: [],
        }

        this.headerTerms = inverseObject(CONFIG.HEADER_TERMS);
        this.filterTerms = inverseObject(CONFIG.FILTER_TERMS);
    }

    updateFiles(e) {
        const fileNames = Array.from(e.target.files).map(file => file.name);
        Promise.all(Array.from(e.target.files).map(file => this.parseCsv(file))).then(result => {
            this.setState({
                fileNames: fileNames,
                expense: this.calcExpense(result),
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
                    content = content.replace(new RegExp(key, "g"), this.headerTerms[key])
                }
                for (const key of Object.keys(this.filterTerms)) {
                    content = content.replace(new RegExp(key, "g"), this.filterTerms[key])
                }
                const parsedData = Papa.parse(content, {encoding: 'shift-jis', header: true});
                resolve(parsedData.data);
            }
            reader.onerror = () => {
                reject('csv load error: ' + file.name);
            };
        });
    }

    /**
     * Basic validation (header check, empty check) should be done before calling this method.
     * @param arrays
     */
    calcExpense(arrays) {
        return arrays.reduce((prev, current) => prev.concat(current)).reduce((prev, current) => {
            const date = Moment(current.date, 'YYYY/MM/DD');
            const key = date.year() + "/" + (date.month() + 1);
            let elem = prev.find(e => e.date === key);
            if (!elem) {
                elem = {date: key, expenditure: 0};
                prev.push(elem);
            }
            elem.expenditure += ((current.expenditure ? parseInt(current.expenditure.replace(/,/g, '')) : 0) || 0);
            return prev;
        }, []);
    }


    render() {
        return (
            <div>
                <ButtonAppBar fileNames={this.state.fileNames} updateFiles={(e) => this.updateFiles(e)}/>
                <Expense tiers={this.state.expense}/>
            </div>
        );
    }
}

export default App