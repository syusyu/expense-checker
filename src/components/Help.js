import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import animateScroll from 'animated-scroll-to';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImgHelp from 'Images/help.png'

const styles = (theme) => ({
    helpRoot: {
        borderTop: '1px solid #E3E3E3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperRoot: {
        width: '70%',
        height: 'unset',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        // marginBottom: theme.spacing.unit * 2,
    },
});

const steps = ['Prepare the expenditure data', 'Put the data and know your monthly expenditure', 'For more information'];

const stepContent = (step, classes) => {
    switch (step) {
        case 0:
            return (<p>The format of the data is CSV and that contains headers; 'date' and 'expenditure' at least.<br />
                <a href="#">Download CSV template</a></p>);
        case 1:
            return <img src={ImgHelp} width="50%"/>;
        case 2:
            return <div>See the documentation of <a href='https://github.com/syusyu/expense-checker' target="_blank">GitHub</a></div>;
        default:
            return '';
    }
};


class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleScrollTop() {
        animateScroll(0, {minDuration: 1000});
        this.handleReset();
    }

    handleNext() {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack() {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset() {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        return (
            <div id="help-root" className={classes.helpRoot}>
                <div className={classes.stepperRoot}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{stepContent(index, classes)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                {activeStep > 0 && (
                                                    <Button onClick={this.handleBack} className={classes.button}
                                                            color='primary' >
                                                        Back
                                                    </Button>
                                                )}
                                                {activeStep < steps.length -1 && (
                                                    <Button onClick={this.handleNext} className={classes.button}
                                                            color='primary'>
                                                        Next
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
                <button onClick={() => this.handleScrollTop()}>Back to top</button>
            </div>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);