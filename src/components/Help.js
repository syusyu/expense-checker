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
import ImgHelp01 from 'Images/help01.png'
import ImgHelp02 from 'Images/help02.png'

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
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

const steps = ['Prepare the expense files', 'Put them', 'Show the result', 'For more information'];

const stepContent = (step) => {
    switch (step) {
        case 0:
            return `The files are required to have the headers; 'date' and 'expenditure.`;
        case 1:
            return '';
        case 2:
            return ``;
        default:
            return '';
    }
};

const stepImage = (step) => {
    switch (step) {
        case 0:
            return null;
        case 1:
            return ImgHelp01;
        case 2:
            return ImgHelp02;
        default:
            return null;
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

    image(step) {
        const src = stepImage(step);
        return (src ? <img src={src}/> : null);
    }

    render() {
        const {classes} = this.props;
        const { activeStep } = this.state;
        const templateDownload = activeStep == 0 ? <a href="#">Download CSV template</a> : null;
        return (
            <div id="help-root" className={classes.helpRoot}>
                <div className={classes.stepperRoot}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{stepContent(index)}</Typography>
                                        {templateDownload}
                                        {this.image(index)}
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                    color='primary'
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                    color='primary'
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&quot;re finished</Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}
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