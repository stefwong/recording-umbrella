import React, { useState, useEffect } from 'react'
import itemService from '../services/items'

const ItemDetail = ({ match: { params: { id } } }) => {
  const [item, setItem] = useState(null)

  const itemHook = () => {
    itemService.getById(id)
      .then(res => setItem(res))
  }

  useEffect(itemHook, [])

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
    </>
  )
}

export default ItemDetail
