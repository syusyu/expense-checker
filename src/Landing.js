import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FileUpload from './FileUpload';
import animateScroll from 'animated-scroll-to';
import Typography from '@material-ui/core/Typography';
import Help from './Help';
import IconButton  from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import HelpIcon from '@material-ui/icons/Help';


const styles = theme => ({
    arrowForward: {
        fontSize: 50,
        marginLeft: '10px',
    },
    titleRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpButton: {
        marginLeft: '80px',
    },
    helpIcon: {
        fontSize: 40,
    },

});

class Landing extends Component {
    constructor(props) {
        super(props);
    }

    handleScrollTop() {
        animateScroll(document.querySelector('#help-root'), { minDuration: 1000 });
    }

    render() {
        const {classes, updateFiles} = this.props;
        return (
            <div>
                <div id="title-root" className={classes.titleRoot}>
                    <Typography variant="display4">
                        Put data <ArrowForward className={classes.arrowForward} />

                        <FileUpload isFileSelected={false} updateFiles={updateFiles} />

                        <IconButton className={classes.helpButton} color="primary"
                                onClick={ () => this.handleScrollTop() }>
                            <HelpIcon className={classes.helpIcon}/>
                        </IconButton >
                    </Typography>
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