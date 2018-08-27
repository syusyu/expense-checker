import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {isEmpty} from "./Util";
import Moment from 'moment';
import FileUpload from './FileUpload';

const styles = theme => ({
    cardExpenditure: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
    }
});

const currencyFormat = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: (CONFIG.CURRENCY || 'JPY')
});

const dateFormat = CONFIG.DATE_FORMAT || 'YYYY/MM'


class Expense extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, expense, updateFiles } = this.props;
        const records = expense.records || [];
        const warnings = expense.warnings || [];
        const sum = expense.sum;
        const isFileSelected = !isEmpty(records);

        return (
            <div>
                {!isFileSelected ?
                    <div>
                        <Typography variant="display4">Select CSV files
                            <FileUpload isFileSelected={isFileSelected} updateFiles={updateFiles} />
                        </Typography>
                    </div>
                    : null
                }
                <Grid container spacing={40} alignItems="flex-end">
                    {records.map(record => (
                        <Grid item key={record.date} xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader
                                    title={Moment(record.date).format(dateFormat)}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    style={{backgroundColor: record.color}}
                                />
                                <CardContent>
                                    <div className={classes.cardExpenditure}>
                                        <Typography variant="display2" color="textPrimary">
                                            {currencyFormat.format(record.expenditure)}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {isFileSelected ?
                    <Grid container spacing={40} direction="column" align="center" style={{height: 200}}>
                        <Grid item key='total' xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader
                                    title='Total'
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    style={{backgroundColor: '#0D47A1'}}
                                />
                                <CardContent>
                                    <div className={classes.cardExpenditure}>
                                        <Typography variant="display2" color="textPrimary">
                                            {currencyFormat.format(sum)}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid> : null
                }

                {!isEmpty(warnings) ? <div>Warnings:</div> : null}

                {warnings.map(warning => (
                    <div key={warning.index}>
                        index={warning.index}, date={warning.date}, expenditure={warning.expenditure}
                    </div>
                ))}
            </div>
        );
    }
}

Expense.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expense);