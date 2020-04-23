import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ColumnHelper from '../screens/ColumnHelper';

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

export default function OwnerItems(props) {
    const classes = useStyles();
   
    const { items } = props
    

//dynamic columns
//default is 1, else, others depending on query
    let columns = ColumnHelper()

    const displayItems = () => {
        return items ? (
             <div className={classes.root}>
                <GridList spacing={6} cols={columns} cellHeight={200} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={16} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Your Listed Items</ListSubheader>
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
                                    <IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
                                        {/* <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={item.owner.avatar} />
                                        </ListItemAvatar> */}
                                        <Button variant="contained"
                                            className={classes.button}
                                            startIcon={<EditIcon/>}
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

