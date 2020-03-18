import React, { Component } from 'react'
import { getById } from '../services/items'

class ItemDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {
        name: '',
        description: '',
        price: 0,
        category: '',
        ownerId: '',
        forSale: '',
        imgUrl: '',
        date: ''
      }
    }
  }
  async componentDidMount() {
    try {
      const item = await getById(this.props.match.params.id)
      this.setState({ item })
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const { name, description, price, category, ownerId, forSale, imgUrl, date } = this.state.item;
    (item.name === '') ? itemDisplay = (
      <div>
        <h3>Name: {name}</h3>
        <div className="description">Description: {description}</div>
        <div className="item-info">Price: {price}</div>
        <div className="item-info">Date: {date}</div>
        <div className="img"><img src={imgUrl} alt="Item image" /></div>
        <div className="category">Category: {category}</div>
        <div className="item-info">Owner ID: {ownerId}</div>
        <div className="item-info">Sale status: {forSale}</div>
      </div >) : itemDisplay = <div>Loading...</div>
    return (
      { itemDisplay }
    )
  }
}

export default ItemDetail