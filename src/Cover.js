import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FileUpload from './FileUpload';
import animateScroll from 'animated-scroll-to';
import Typography from '@material-ui/core/Typography';
import Help from './Help';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    title: {
        margin: '20vh 20vh',
    },
    help: {
        backgroundColor: '#d3d3d3',
        marginTop: '100rem',
        paddingBottom: '100rem',
    },
    content: {
        margin: 'auto',
        maxWidth: '60rem',
        padding: '5rem 2rem',
        position: 'relative',
        textAlign: 'center',
        width: '100%',
    },
    h1: {
        fontSize: '4em',
        margin: '0',
    },
    h2: {},
    questionIcon: {
        marginLeft: '20px',
    },

});

class Cover extends Component {
    constructor(props) {
        super(props);
    }

    handleScrollTop() {
        animateScroll(document.querySelector('#help'), { minDuration: 1000 });
    }

    render() {
        const {classes, updateFiles} = this.props;
        return (
            <div>
                <div className={classes.title}>
                    <Typography variant="display4">Put data
                        <FileUpload isFileSelected={false} updateFiles={updateFiles} />
                        <Button component="span" variant="fab" className={classes.questionIcon} color="primary"
                                onClick={ () => this.handleScrollTop() }>
                            <AddIcon/>
                        </Button>
                    </Typography>
                </div>
                <Help/>
            </div>
        );
    }
}

Cover.propTypes = {
    classes: PropTypes.object.isRequired,
    updateFiles: PropTypes.func.isRequired,
};

export default withStyles(styles)(Cover);