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
    if (item) { 
      const { name, description, price, date, imgUrl, category, forSale } = item
      console.log(Object.keys(item))
    }
    return item ? (
      <div>
        <h3>Name: {name}</h3>
        <div className="description">Description: {description}</div>
        <div className="item-info">Price: {price}</div>
        <div className="item-info">Date: {date}</div>
        <div className="img"><img src={imgUrl} alt="Item" /></div>
        <div className="category">Category: {category}</div>
        <div className="item-info">Sale status: {forSale}</div>
      </div>
    ) : <h2>Loading..</h2>                                     
  }

  return (
    <div>
      
    </div>
  )
}

export default ItemDetail
