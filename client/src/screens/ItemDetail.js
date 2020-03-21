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
    itemService.getById(id)
      .then(res => setItem(res))
  }
  // const guestPriviledgeHook = () => {
  //   const userJSON = localStorage.getItem('loggedInUser')
  //   setLoggedUserJSON(userJSON)

  //   const user = JSON.parse(loggedUserJSON)
  //   // userService.getById(item.ownerId)
  //   //   .then(res => setItemOwner(res))

  //   if (loggedUserJSON !== null && Object.keys(item).length) {
  //     console.log(itemOwner)
  //     if (user.username === itemOwner.username) {
  //       setAdminAccess(true)
  //     } else {
  //       console.log(user.username, '!==', itemOwner.username)
  //       setAdminAccess(false)
  //     }
  //     setGuestAccess(true)
  //   } else {
  //     setGuestAccess(false)
  //   }
  // }

  useEffect(itemHook, [])
  // useEffect(guestPriviledgeHook, [item])

  const handleDelete = (id) => {
    handleDeleteItem(id)
      .then(() => setItem(null))
      .catch(error => console.error(error))
  }

  const displayItem = () => {
    return item ? (
      <div>
        <h3>Name: {item.name}</h3>
        <div className="description">Description: {item.description}</div>
        <div className="item-info">Price: {item.price}</div>
        <div className="img"><img src={item.imgUrl} alt="Item" /></div>
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
