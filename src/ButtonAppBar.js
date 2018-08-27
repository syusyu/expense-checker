import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    input: {
        display: 'none',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});




class ButtonAppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, fileNames, updateFiles} = this.props;
        return (
            <div className={classes.root}>

                {fileNames.map(fileName => (
                    <span key={fileName} color={'#0000'}>{fileName}&nbsp;&nbsp;</span>
                ))}
                <label htmlFor="fab-button-file">
                    <input className={classes.input}  id="fab-button-file" multiple type="file"
                           onChange={e => updateFiles(e)}/>
                    <Button component="span" variant="fab" className={classes.fab} color="primary">
                        <AddIcon />
                    </Button>
                </label>
            </div>
        );
    }
}


ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);