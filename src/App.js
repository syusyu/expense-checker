import React, { Component } from 'react';
import Footer from './Footer';
import Expense from './Expense';
import Papa from 'papaparse';
import {inverseObject, isEmpty} from './Util';
import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
import FileUpload from './FileUpload';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileNames: [],
            expense: {},
        }

        this.headerTerms = inverseObject(CONFIG.HEADER_TERMS);
        this.filterTerms = inverseObject(CONFIG.FILTER_TERMS);
        this.colors = CONFIG.EXPENDITURE_LEVEL_COLORS;
    }

    updateFiles(e) {
        const fileNames = Array.from(e.target.files).map(file => file.name);
        Promise.all(Array.from(e.target.files).map(file => this.parseCsv(file))).then(result => {
            this.setState({
                fileNames: fileNames,
                expense: this.calcExpense(result),
            });
            const root = document.getElementById('root');
            root.classList.remove('root');
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
                content = content.replace(/^$/g,'').replace(/^\r\n/g,'').replace(/^\n/g,'');
                const parsedData = Papa.parse(content, {encoding: 'shift-jis', header: true});
                if (!this.validateHeader(parsedData.data[0])) {
                    reject('Incorrect header: ' + JSON.stringify(parsedData.data[0]));
                }
                resolve(parsedData.data);
            };
            reader.onerror = () => {
                reject('csv load error: ' + file.name);
            };
        });
    }

    validateHeader(record) {
        return record && record.date && record.expenditure;
    }

    calcExpense(arrays) {
        let warnings = [];
        let sum = 0;
        const records = arrays.reduce((prev, current) => prev.concat(current)).reduce((prev, current, idx) => {
            if (!this.filter(current.content)) {
                return prev;
            }
            const date = Moment(current.date, 'YYYY/MM/DD');
            if (!date.isValid()) {
                if (current.date && current.expenditure) {
                    warnings.push({index: (idx + 1), date: current.date, expenditure: current.expenditure});
                }
                return prev;
            }
            const key = date.year() + "-" + ('0' + (date.month() + 1)).slice(-2);
            let elem = prev.find(e => e.date === key);
            if (!elem) {
                elem = {date: key, expenditure: 0};
                prev.push(elem);
            }
            const expenditure = (current.expenditure ? parseInt(current.expenditure.replace(/,/g, '')) : 0) || 0;
            elem.expenditure += expenditure;
            elem.color = this.color(elem.expenditure);
            sum += expenditure;
            return prev;
        }, []);
        return {records: this.sort(records), warnings: warnings, sum: sum};
    }

    color (val) {
        const result = '#EEEEEE';
        if (!this.colors) return result;
        for (const e of this.colors) {
            if (!e.max && e.min <= val) {
                return e.color;
            } else if (e.min <= val && val < e.max) {
                return e.color;
            }
        }
        return result;
    }

    filter(content) {
        if (isEmpty(CONFIG.FILTER_TERMS) || !content) {
            return true;
        }
        return !CONFIG.FILTER_TERMS.includes(content);
    }

    sort(records) {
        return records.sort((a, b) => Moment(a.date, 'YYYY/MM') < Moment(b.date, 'YYYY/MM') ? 1 : -1);
    }

    render() {
        return (
            <div>
                {isEmpty(this.state.expense.records) ?
                    <div>
                        <Typography variant="display4">Select CSV files
                            <FileUpload isFileSelected={false} updateFiles={(e) => this.updateFiles(e)} />
                        </Typography>
                    </div>
                    :
                    <Expense expense={this.state.expense} updateFiles={(e) => this.updateFiles(e)} />
                }
                <Footer fileNames={this.state.fileNames} updateFiles={(e) => this.updateFiles(e)} />
            </div>
        );
    }
}

export default App;