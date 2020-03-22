import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import shoppingCartService from '../util/ShoppingCartService';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function ItemsScreen(props) {

    const classes = useStyles();

    const { items } = props
    
    const addItem = (item) => {
        // adds item to shopping cart
        shoppingCartService.addItem(item, () => {
            props.handleShoppingCartUpdated();
        })
    }

    const displayItems = () => {
        return items ? (
             <div className={classes.root}>
                <GridList spacing={6} cols={3} cellHeight={200} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={16} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Welcome</ListSubheader>
                    </GridListTile>

                    {items.map(item => (
                        <GridListTile key={item.id} cols={1}>
                            <Link to={`/${item.id}`}>
                                <img src={item.imgUrl} alt={item.name} />
                            </Link>
                            <GridListTileBar
                                title={`${item.name}`}
                                subtitle={
                                    <span>{item.description}</span>
                                }
                                actionIcon={
                                    <IconButton onClick={() => { addItem(item) }} aria-label={`info about ${item.name}`} className={classes.icon}>
                                        {/* <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={item.owner.avatar} />
                                        </ListItemAvatar> */}
                                        <Button variant="contained"
                                            className={classes.button}
                                            startIcon={<AddShoppingCartIcon></AddShoppingCartIcon>}
                                        >${item.price} </Button>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>            
        ) : <h2>Loading...</h2>
    }

    return (
        <>
            {displayItems()}
        </>
    );
}

