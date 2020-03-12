import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { getItems } from '../services/items'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: "auto",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function ItemsScreen() {
    const [items, setItems] = useState([])
    const [shoppingCart, setShoppingCart] = useState({ items: [] })

    const classes = useStyles();
    useEffect(() => {
        const getData = async () => {
            const itemsTemp = await getItems()
            setItems(itemsTemp)
            console.log(itemsTemp)
        }
        // call to getItems()
        getData()
        let tempShoppingCart = null

        try {
            tempShoppingCart = JSON.parse(localStorage.getItem("shopping cart"))
        }
        catch (error) {
            //exception is normal whenever no shopping cart is in localstorage
        }

        if (!tempShoppingCart) {
            tempShoppingCart = { items: [] }
        }
        //     setItems([
        //         {
        //             id: "1",
        //             name: "Lighter",
        //             description: "Lights things",
        //             price: 2.00,
        //             img: "https://images.unsplash.com/photo-1560358757-be9a39a22fc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        //         },
        //         {
        //             id: "2",
        //             name: "First aid kit",
        //             description: "For emergencies",
        //             price: 15.00,
        //             img: "https://images.unsplash.com/photo-1563884820537-73eaf897af86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        //         },
        //         {
        //             id: "3",
        //             name: "Rope",
        //             description: "A rope",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1451994860973-8f9242f631b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80"
        //         },
        //         {
        //             id: "4",
        //             name: "Basic Knife",
        //             description: "For stuff",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1533574745199-4df19ce5c70b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
        //         },
        //         {
        //             id: "5",
        //             name: "Screwdriver",
        //             description: "Lights stuff",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        //         },
        //         {
        //             id: "6",
        //             name: "Screwdriver",
        //             description: "Lights stuff",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        //         },
        //         {
        //             id: "6",
        //             name: "Screwdriver",
        //             description: "Lights stuff",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        //         },
        //         {
        //             id: "6",
        //             name: "Screwdriver",
        //             description: "Lights stuff",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        //         },
        //         {
        //             id: "6",
        //             name: "Screwdriver",
        //             description: "Lights stuff",
        //             price: 1.00,
        //             img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        //         }  
        //     ])
    }, [])
    if (!items) {
        return null
    }
    const addItem = (item) => {
        console.log("item added " + item.id + " " + item.name)
        //to do: add to shopping cart
        let temp = { ...shoppingCart }
        temp.items.push(item)
        localStorage.setItem("shopping cart", JSON.stringify(temp))
        setShoppingCart(temp)

    }
    return (
        <div className={classes.root}>
            <GridList spacing={10} cols={3} cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Items{shoppingCart.items && shoppingCart.items.length}</ListSubheader>
                </GridListTile>
                {items.map(item => (
                    <GridListTile key={item.img} cols={1}>
                        <img src={item.img} alt={item.name} />
                        <GridListTileBar
                            title={item.name}
                            // subtitle={<span> {item.description} </span>}
                            subtitle={<span> ${item.price}</span>}
                            actionIcon={
                                <IconButton onClick={() => { addItem(item) }} aria-label={`info about ${item.name}`} className={classes.icon}>
                                    <AddShoppingCartIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

