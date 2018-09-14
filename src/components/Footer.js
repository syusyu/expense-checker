import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from 'Components/FileUpload';

const styles = theme => ({
    footer: {
        width: '30%',
        height: '45px',
        backgroundColor: '#E1F5FE',
        padding: '10px 0px 10px 20px',
        borderRadius: '10px',
        opacity: '0.5',
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 10,
    }
});

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, fileNames, updateFiles} = this.props;
        return (
            <div>
                <FileUpload isFileSelected={true} updateFiles={updateFiles} />
                <div className={classes.footer}>
                    {fileNames.map((fileName, idx) => (
                        <span key={fileName} color={'#0000'}>&lt;{fileName}&gt;&nbsp;&nbsp;</span>
                    ))}
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    fileNames: PropTypes.array.isRequired,
    updateFiles: PropTypes.func.isRequired,
};

export default withStyles(styles)(Footer);