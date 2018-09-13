import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import animateScroll from 'animated-scroll-to';
import Plx from 'react-plx';

const styles = {
    help: {
        width: '100%',
        marginTop: '150vh',
        paddingBottom: '250vh',
        backgroundColor: '#F3F3F5',
    },
    stickyText: {
        bottom: 0,
        left: 0,
        // maxWidth: '54rem',
        opacity: '0',
        // padding: '0 2rem',
        position: 'fixed',
        width: '100%',
    },
    plxTrigger: {
        position: 'relative',
        top: '50vh',
        // border: 'solid 1px black',
    },
};

const textData = [
    {
        start: '#plx-trigger',
        duration: '80vh',
        properties: [
            {
                startValue: 0,
                endValue: -80,
                unit: 'vh',
                property: 'translateY',
            },
            {
                startValue: 0,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];

class Help extends Component {
    handleScrollTop() {
        animateScroll(0, { minDuration: 1000 });
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div id="help" style={styles.help}>
                <Plx
                    className={classes.stickyText}
                    parallaxData={textData}>
                    <h2>Make elements fly in and stick for some time before they fly out</h2>
                    <button onClick={ () => this.handleScrollTop() }>Back to top</button>
                </Plx>
                <div id="plx-trigger" style={styles.plxTrigger}></div>
            </div>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);