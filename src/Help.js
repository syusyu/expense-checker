import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import animateScroll from 'animated-scroll-to';
import Plx from 'react-plx';

const styles = {
    helpRoot: {
        width: '100%',
        backgroundColor: '#F3F3F5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            <div id="help-root" style={styles.helpRoot}>
                <h2>Make elements fly in and stick for some time before they fly out</h2>
                <button onClick={ () => this.handleScrollTop() }>Back to top</button>
            </div>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);