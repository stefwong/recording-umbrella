import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ItemCreate from '../screens/ItemCreate'
import itemService from '../services/items'
import OwnerItems from '../components/OwnerItems'

const useStyles = makeStyles({
    list: {
        width: 450,
    },
    fullList: {
        width: 'auto',
    },
});

export default function UserStorefrontEdit(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const {items} = props
    //items property out of props. items = props.items
    const openDrawer = (anchor, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    const handleSubmit = async (item) => {
        try {
          const createdItem = await itemService.create(item)
          openDrawer('right',false)
        } catch (error) {
          throw error
        }
      }

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"

        >
            <Divider />
            <ItemCreate handleCreate={handleSubmit} handleCancel={() => { openDrawer(anchor, false) }} />
        </div>
    );

    return (
        <div>
            {['right'].map(anchor => (
                <React.Fragment key={anchor}>
                    <div className="spacing">
                    <Button 
                    
                    onClick={openDrawer(anchor, true)}
                    color="primary"
                    variant="contained"
                    >Post Your Item</Button>
                    </div>
                    <OwnerItems items={props.items}></OwnerItems>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={openDrawer(anchor, false)}
                        onOpen={openDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
