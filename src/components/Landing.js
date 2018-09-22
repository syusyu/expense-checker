import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FileUpload from 'Components/FileUpload';
import animateScroll from 'animated-scroll-to';
import Typography from '@material-ui/core/Typography';
import Help from 'Components/Help';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';


const styles = theme => ({
    arrowForward: {
        fontSize: 50,
        marginLeft: '10px',
    },
    titleRoot: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    landingFooter: {
        height: 'unset',
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    helpIcon: {
        fontSize: 40,
    },
});

class Landing extends Component {
    constructor(props) {
        super(props);
    }

    handleScrollHelp() {
        animateScroll(document.querySelector('#help-root'), {minDuration: 1000});
    }

    render() {
        const {classes, updateFiles} = this.props;
        return (
            <div>
                <div id="title-root" className={classes.titleRoot}>
                    <Typography variant="display4">
                        Put data

                        <FileUpload isFileSelected={false} updateFiles={updateFiles}/>

                    </Typography>

                    <div className={classes.landingFooter}>
                        <IconButton onClick={() => this.handleScrollHelp()}>
                            <HelpIcon className={classes.helpIcon}/>
                        </IconButton>
                    </div>
                </div>

                <Help/>
            </div>
        );
    }
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
    updateFiles: PropTypes.func.isRequired,
};

export default withStyles(styles)(Landing);