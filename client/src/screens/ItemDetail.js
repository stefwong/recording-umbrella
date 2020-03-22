import React, { useState, useEffect } from 'react'
import itemService from '../services/items'
import {Redirect} from 'react-router-dom'

const ItemDetail = ({ match: { params: { id } }, handleDeleteItem, user }) => {
  const [item, setItem] = useState(null)
  const [redirectHome, setRedirectHome] = useState(false)
  const [adminAccess, setAdminAccess] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', imgUrl: '', forSale: false })

  const itemHook = () => {
    itemService.getById(id)
      .then(res => {
        setItem(res)
        // if the item belongs to the logged in user,
        // assign them admin access so they can delete it (and the delete button will show up)
        if (user && res.ownerId.username === user.username){
          setAdminAccess(true)
        }
      })
  }

  useEffect(itemHook, [id])

  const handleDelete = (id) => {
    // removing the item
    // if it is successful, set the redirect variable to true 
    // so the screen will go back to the main itemsScreen page
    handleDeleteItem(id)
    setItem(null)
    setRedirectHome(true)
  }

  const handleChange = (e) => {
    const { target: { name, value } } = e
    console.log(name)
    setNewItem({...newItem, [name]: value})
  }

  const handleUpdate = (e) => {
    e.preventDefault()
  }

  const displayItem = () => {
    let userName = "";
    if (user) {
      userName = user.username;
    }

    return item ? (
      <div>
        <h3>Name: {item.name}</h3>
        {userName && <div >Username: {userName}</div> }
        <p className='itemOwner'>Owner: {item.ownerId.username}</p>
        <div className="description">Description: {item.description}</div>
        <div className="item-info">Price: {item.price}</div>
        <div className="img"><img src={item.imgUrl} alt="Item" /></div>
        <div className="category">Category: {item.category}</div>
        <div className="item-info">Sale status: {item.forSale === false ? 'Not For Sale' : 'For Sale'}</div>
      </div>
    ) : <h2>Loading..</h2>
  }

  if (redirectHome) {
    return (<Redirect to="/"/>)
  }

  return (
    <>
      {displayItem()}

      {
        adminAccess && (
          <>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            {
              updating ? <form onSubmit={handleUpdate}>
                <input name='name' placeholder='name' onChange={handleChange} />
                <input name='description' placeholder='description' onChange={handleChange} />
                <input name='price' placeholder='price' onChange={handleChange} />
                <input name='imgUrl' placeholder='image url' onChange={handleChange} />
                <input name='category' placeholder='category' onChange={handleChange} />
                <input name='forSale' placeholder='for sale?' onChange={handleChange} />
                <button onClick={() => setUpdating(!updating)}>Cancel</button>
                <button onClick={() => setUpdating(!updating)}>Submit</button>
              </form>
              : <button onClick={() => setUpdating(!updating)}>Update</button>
            }
          </>
        )
      }
    </>
  )
}

export default ItemDetail
