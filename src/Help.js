import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {isEmpty} from "./Util";
import FileUpload from './FileUpload';
import animateScroll from 'animated-scroll-to';


const styles = theme => ({
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
    h2: {

    }
});

class Help extends Component {
    handleScrollTop() {
        animateScroll(0, { minDuration: 3000 });
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.help}>
                <div className={classes.content}>
                    <h1 className={classes.h1}>Plx</h1>
                    <h2>React Parallax component</h2>
                    <div>Awesome isn&#39;t it?</div>
                    <div className='Footer-links'>
                        <a href='https://stanko.github.io'>My blog</a>
                        <a href='https://www.npmjs.com/package/react-plx'>npm</a>
                        <a href='https://github.com/Stanko/react-plx'>GitHub</a>
                    </div>
                    <button onClick={ () => this.handleScrollTop() }>Back to top</button>
                </div>
            </div>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);