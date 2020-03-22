import React, { useState, useEffect } from 'react'
import itemService from '../services/items'
import userService from '../services/users'

const ItemDetail = ({ match: { params: { id } }, handleDeleteItem, user }) => {
  const [item, setItem] = useState(null)
  const [adminAccess, setAdminAccess] = useState(false)
  const [updating, setUpdating] = useState(false)

  const itemHook = () => {
    itemService.getById(id)
      .then(res => setItem(res))
  }

  useEffect(itemHook, [])

  const handleDelete = (id) => {
    handleDeleteItem(id)
      .then(() => setItem(null))
      .catch(error => console.error(error))
  }

  const displayItem = () => {
    console.log(user)
    if (user && item) {
      if (user.username === item.ownerId.username) {
        setAdminAccess(true)
      }
    } 

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
