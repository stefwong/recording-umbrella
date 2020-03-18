import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import StoreIcon from '@material-ui/icons/Store';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  
    marginRight: theme.spacing(0),
    marginLeft: 1,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const [searchText, setSearchText] = useState("");

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchOnChange = event => {
    setSearchText(event.target.value);
  }

 
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/GuestCheckout">
        <MenuItem>

          <IconButton aria-label="new items added to cart" color="inherit">
            <Badge badgeContent={props.shoppingCartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>

          </IconButton>
          <p>Shopping Cart</p>
        </MenuItem>
      </Link>
      <Link to="/UserStoreFrontEdit">
        <MenuItem >

          <IconButton>
            <AccountCircle>
            </AccountCircle>
          </IconButton>
          <p>Profile</p>

        </MenuItem>
      </Link>
    </Menu>
  );

  const displaySignupOrCheckout = () => {
    return (props.user && Object.keys(props.user).length) ? (
      <>
        <Link to="/GuestCheckout">
          <IconButton aria-label="new items added to cart" color="inherit">
            <Badge badgeContent={props.shoppingCartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
        <Link to="UserStoreFrontEdit"
          >
            <IconButton>
            < AccountCircle />
            </IconButton>
        </Link>
      </>
    ) : (
      <>
        <Link to='/signup'>
          <p>Sign Up</p>
        </Link>
        <Link to='/signin'>
          <p>Log In</p>
        </Link>
      </>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton >
            <Link to="/">
              <StoreIcon />
            </Link>
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
             The Survival Market
          </Typography>

          <div className={classes.search}>
    

            <InputBase
              onChange={handleSearchOnChange}
              value={searchText}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Link to={`/ItemsScreen/${searchText}`}>
            <IconButton >
              <SearchIcon />
            </IconButton>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {displaySignupOrCheckout()}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
