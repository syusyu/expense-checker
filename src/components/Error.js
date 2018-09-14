import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
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
        const { classes, error, showsError, closeError } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                    open={showsError}
                    onClose={closeError}
                    ContentProps={{'aria-describedby': 'message-id',}}
                    message={<span className={classes.root} id="message-id">{error.message}</span>}
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
    showsError: PropTypes.bool,
    closeError: PropTypes.func.isRequired,
};

export default withStyles(styles)(Error);