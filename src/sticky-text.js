import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Plx from 'react-plx';


const styles = theme => ({
    stickey: {
        bottom: '0',
        left: 0,
        maxWidth: '54rem',
        opacity: '0',
        padding: '0 2rem',
        position: 'fixed',
        width: '100%',
    },
    help: {
        backgroundColor: '#d3d3d3',
        marginTop: '30rem',
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
    h2: {}
});

const textData = [
    {
        start: '.StickyText-trigger',
        duration: '60vh',
        properties: [
            {
                startValue: 0,
                endValue: -50,
                unit: 'vh',
                property: 'translateY',
            },
            {
                startValue: 1,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
    // {
    //     start: '.StickyText-trigger',
    //     startOffset: '60vh',
    //     duration: '30vh',
    //     properties: [
    //         {
    //             startValue: -50,
    //             endValue: -100,
    //             unit: 'vh',
    //             property: 'translateY',
    //         },
    //         {
    //             startValue: 1,
    //             endValue: 0,
    //             property: 'opacity',
    //         },
    //     ],
    // },
];

class StickyText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Plx
                className={classes.stickey}
                parallaxData={textData}
            >
                <h2>Make elements fly in and stick for some time before they fly out</h2>
            </Plx>
        );
    }
}

StickyText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StickyText);