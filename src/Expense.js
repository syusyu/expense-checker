import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    cardHeader: {
        backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
    },
});

const tiers = [
    {
        title: '2018/08',
        price: '10,000',
    },
    {
        title: '2018/07',
        price: '20,000',
    },
    {
        title: '2018/06',
        price: '30,000',
    },
    {
        title: '2018/05',
        price: '40,000',
    },
    {
        title: '2018/04',
        price: '50,000',
    },
    {
        title: '2018/03',
        price: '60,000',
    },
    {
        title: '2018/02',
        price: '70,000',
    },
];


function Expense(props) {
    const { classes, payloads } = props;

    return (
        <div>
            <div>
                {payloads.map(payload => (
                    <span key={payload.date}>{payload.date}-{payload.amount} &nbsp;&nbsp;</span>
                ))}
            </div>
            <Grid container spacing={40} alignItems="flex-end">
                {tiers.map(tier => (
                    <Grid item key={tier.title} xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                                title={tier.title}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <div className={classes.cardPricing}>
                                    <Typography variant="display2" color="textPrimary">
                                        ${tier.price}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>

    );
}

Expense.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expense);