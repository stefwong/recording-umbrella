import React, { useState, useEffect } from 'react'
import itemService from '../services/items'
import userService from '../services/users'

const ItemDetail = ({ match: { params: { id } }, handleDeleteItem }) => {
  const [item, setItem] = useState(null)
  const [itemOwner, setItemOwner] = useState(null)
  const [adminAccess, setAdminAccess] = useState(false)
  const [guestAccess, setGuestAccess] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [loggedUserJSON, setLoggedUserJSON] = useState(null)

  const itemHook = () => {
    
    // const userJSON = localStorage.getItem('loggedInUser')
    // setLoggedUserJSON(userJSON)

    itemService.getById(id)
      .then(res => setItem(res))
  }

  useEffect(itemHook, [id])

  const handleDelete = (id) => {
    handleDeleteItem(id)
      .then(() => setItem(null))
      .catch(error => console.error(error))
  }

  const displayItem = () => {
    const user = JSON.parse(loggedUserJSON)
    if (user && item) {
      console.log(user.username)
      console.log(item.ownerId.username)
    } 

    return item ? (
      <div>
        <h3>Name: {item.name}</h3>
        <div className="description">Description: {item.description}</div>
        <div className="item-info">Price: {item.price}</div>
        {/*<div className="img"><img src={item.imgUrl} alt="Item" /></div>*/}
        <div className="category">Category: {item.category}</div>
        <div className="item-info">Sale status: {item.forSale === false ? 'Not For Sale' : 'For Sale'}</div>
      </div>
    ) : <h2>Loading..</h2>                                     
  }

  return (
    <>
      {displayItem()} 

      {
        adminAccess &&
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      }
    </>
  )
}

export default ItemDetail
