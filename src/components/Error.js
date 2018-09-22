import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {isEmpty} from "../Util";

const styles = theme => ({
    message: {
        color: '#F8BBD0',
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, error, closeError } = this.props;
        return (
            <div id="error" className={classes.root}>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                    open={!isEmpty(error)}
                    onClose={closeError}
                    ContentProps={{'aria-describedby': 'message-id',}}
                    message={<span className={classes.message} id="message-id">{error.message}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={closeError}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

Error.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.shape({
        message: PropTypes.string,
    }).isRequired,
    closeError: PropTypes.func.isRequired,
};

export default withStyles(styles)(Error);