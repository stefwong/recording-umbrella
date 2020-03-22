import React, { useState, useEffect } from 'react'
import itemService from '../services/items'
import {Redirect} from 'react-router-dom'

const ItemDetail = ({ match: { params: { id } }, handleDeleteItem, handleUpdateItem, user }) => {
  const [item, setItem] = useState(null)
  const [redirectHome, setRedirectHome] = useState(false)
  const [adminAccess, setAdminAccess] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'misc', imgUrl: '', forSale: false })

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
    if (name === 'forSale') {
      const boo = value === 'true' ? true : false
      return setNewItem({...newItem, [name]: boo})
    }
    setNewItem({...newItem, [name]: value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updatedItem = await itemService.update(item.id, newItem)
      handleUpdateItem(item.id, updatedItem)
      setUpdated(true)
      setItem(updatedItem)
      setNewItem({ name: '', description: '', price: '', category: 'misc', imgUrl: '', forSale: false })
      setUpdating(!updating)
    } catch (error) {
      throw error
    }
  }

  const displayItem = () => {
    return item ? (
      <div>
        <h3>Name: {item.name}</h3>
        {user && <div >Logged in Username: {user.username}</div>}
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
                <input name='name' value={newItem.name} placeholder='name' onChange={handleChange} />
                <input name='description' value={newItem.description} placeholder='description' onChange={handleChange} />
                <input name='price' value={newItem.price} placeholder='price' onChange={handleChange} />
                <input name='imgUrl' value={newItem.imgUrl} placeholder='image url' onChange={handleChange} />
                <select name='category' value={newItem.category} onChange={handleChange}>
                  <option name='category' value="food">Food</option>
                  <option name='category' value="apparel">Apparel</option>
                  <option name='category' value="sanitary">Sanitary</option>
                  <option name='category' value="first aid">First Aid</option>
                  <option name='category' value="misc">Misc</option>
                </select>
                <select name='forSale' value={newItem.forSale} onChange={handleChange}>
                  <option value='true' >True</option>
                  <option value='false' >False</option>
                </select>
                <button onClick={() => setUpdating(!updating)}>Cancel</button>
                <button type='submit'>Submit</button>
              </form>
              : <button onClick={() => {setUpdating(!updating); setUpdated(false)}}>Update</button>
            }
            {updated && <h3>Item Updated!!</h3>}
          </>
        )
      }
    </>
  )
}

export default ItemDetail
