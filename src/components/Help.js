import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import animateScroll from 'animated-scroll-to';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImgHelp from 'Images/help.png'
import ArrowTopIcon from '@material-ui/icons/ExpandLess';
import IconButton  from '@material-ui/core/IconButton';
import CsvTemplate from 'Data/template.zip';

const styles = (theme) => ({
    helpRoot: {
        position: 'relative',
        borderTop: '1px solid #E3E3E3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperRoot: {
        width: '50%',
        minWidth: '800px',
        height: 'unset',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
    },
    helpFooter: {
        height: 'unset',
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    arrowTopIcon: {
        fontSize: 40,
    },
});

const steps = ['Prepare data', 'Get result', 'More information'];

const stepContent = (step, classes) => {
    switch (step) {
        case 0:
            return (<span>First, get the expenditure data of which format is CSV.<br/>
                If your bank prepares the CSV data,
                you can download them and put the header columns of <strong>date</strong> and <strong>expenditure</strong> on the file.
                You can see the example data here.<br/>
                <a href={CsvTemplate}>Download example files</a></span>);
        case 1:
            return (<span><img src={ImgHelp} width="90%" /><br/>
                Put the expenditure data on the App and you will know you monthly expenditure.<br/>
                The color expresses the level how much was your expenditure.</span>);
        case 2:
            return <span>See the documentation of <a href='https://github.com/syusyu/expense-checker'>GitHub</a></span>;
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
                    <Typography variant="display2">How to use?</Typography>
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
                                                            color='primary'>
                                                        Back
                                                    </Button>
                                                )}
                                                {activeStep < steps.length - 1 && (
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

                <div className={classes.helpFooter}>
                    <IconButton color="primary" onClick={() => this.handleScrollTop()}>
                        <ArrowTopIcon className={classes.arrowTopIcon}/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);