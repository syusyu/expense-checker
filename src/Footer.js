import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {isEmpty} from "./Util";
import FileUpload from './FileUpload';

const styles = theme => ({
    input: {
        display: 'none',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
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
        const isFileSelected = !isEmpty(fileNames);
        return (
            <div>
                {isFileSelected ?
                    <FileUpload isFileSelected={isFileSelected} updateFiles={updateFiles} />
                    : null
                }

                {isFileSelected ?
                    <div className={classes.footer}>
                        {fileNames.map((fileName, idx) => (
                            <span key={fileName} color={'#0000'}>&lt;{fileName}&gt;&nbsp;&nbsp;</span>
                        ))}
                    </div>
                : null}
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