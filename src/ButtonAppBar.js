import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        color: '#fff',
    },
    input: {
        display: 'none',
    },
};




class ButtonAppBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, fileNames, changeFiles} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>

                        <label htmlFor="flat-button-file">
                            <input className={classes.input}  id="flat-button-file" multiple type="file"
                                   onChange={e => changeFiles(e)}/>
                            {fileNames.map(fileName => (
                                <span key={fileName} color={'#0000'}>{fileName}&nbsp;&nbsp;</span>
                            ))}
                            <Button component="span" className={classes.button}>
                                Upload
                            </Button>
                        </label>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);