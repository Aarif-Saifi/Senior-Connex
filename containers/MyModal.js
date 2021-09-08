import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function MyModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <div>
            <Modal
                open={props.open}>
                <div style={modalStyle} className={classes.paper}>
                    {props.children}
                </div>
            </Modal>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 800,
        // height: 600,
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,
        padding: "20px 10px"
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
}));