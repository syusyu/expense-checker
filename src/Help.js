import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import animateScroll from 'animated-scroll-to';
import Plx from 'react-plx';


const styles = {
    plxTrigger: {
        marginTop: '250vh',
        border: 'solid 1px red',
    },
    help: {
        // backgroundColor: '#d3d3d3',
        // marginTop: '250vh',
        // paddingBottom: '100rem',

        bottom: 0,
        left: 0,
        // maxWidth: '54rem',
        // opacity: '0',
        // padding: '0 2rem',
        position: 'fixed',
        // width: '100%',
    },




    helpTemporal: {
        border: 'solid 1px black',
    }
};



const textData = [
    {
        start: '#plx-trigger',
        duration: '60vh',
        properties: [
            {
                startValue: 0,
                endValue: -50,
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
            <div style={styles.helpTemporal}>
                <div id="plx-trigger" style={styles.plxTrigger}>
                    trigger
                </div>
                <Plx
                    className={classes.help}
                    parallaxData={textData}>
                    <h2>Make elements fly in and stick for some time before they fly out</h2>
                    <button onClick={ () => this.handleScrollTop() }>Back to top</button>
                </Plx>
            </div>
        );
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help);