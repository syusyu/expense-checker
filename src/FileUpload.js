import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {isEmpty} from "./Util";

const styles = theme => ({
    input: {
        display: 'none',
    },
    titleIcon: {
        marginLeft: '20px',
    },
    footerIcon: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

class FileUpload extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, isFileSelected, updateFiles} = this.props;
        const iconClassName = isFileSelected ? classes.footerIcon : classes.titleIcon;
        return (
            <label htmlFor="fab-button-file">
                <input className={classes.input}  id="fab-button-file" multiple type="file"
                       onChange={e => updateFiles(e)}/>
                <Button component="span" variant="fab" className={iconClassName} color="primary">
                    <AddIcon />
                </Button>
            </label>
        );
    }
}

export default withStyles(styles)(FileUpload);