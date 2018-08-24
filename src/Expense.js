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


const styles = theme => ({
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    cardHeader: {
        backgroundColor: '#EEEEEE',
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
    },
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
        const { classes, expense } = this.props;
        const records = expense.records || [];
        const noRecordLabel = isEmpty(records) ? <Typography>Please select your expenditure csv files</Typography> : null;
        const warnings = expense.warnings || [];
        const warningLabel = !isEmpty(warnings) ? <div>Warnings:</div> : null;
        return (
            <div>
                {noRecordLabel}
                <Grid container spacing={40} alignItems="flex-end">
                    {records.map(record => (
                        <Grid item key={record.date} xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader
                                    title={Moment(record.date).format(dateFormat)}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    style={{backgroundColor: record.color}}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography variant="display2" color="textPrimary">
                                            {currencyFormat.format(record.expenditure)}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {warningLabel}
                {warnings.map(warning => (
                    <div key={warning.line}>line={warning.line}, date={warning.date}, expenditure={warning.expenditure}</div>
                ))}
            </div>
        );
    }
}

Expense.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expense);