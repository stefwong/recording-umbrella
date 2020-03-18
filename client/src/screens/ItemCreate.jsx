import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { create } from '../services/items'

class ItemCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        imgLink: '',
        emailAddress: '',
        inputPassword: '',
        category: ''
      },
      createdItem: null
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'itemPrice') {
      const updatedField = { [event.target.name]: parseInt(event.target.value) }
      const editedItem = Object.assign(this.state.item, updatedField)
      this.setState({ item: editedItem })
    }
    else {
      const updatedField = { [event.target.name]: event.target.value }
      const editedItem = Object.assign(this.state.item, updatedField)
      this.setState({ item: editedItem })
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault()

    const response = await create(this.state.item)
    if (response.status === 201) {
      this.props.addItem(response.data)
      this.setState({
        createdItem: response.data
      })
    }
  }
  render() {
    const { handleChange, handleSubmit } = this
    const { createdItem, item } = this.state
    const { history } = this.props

    if (createdItem) {
      return <Redirect to={`/ItemsScreen`} />
    }
    return (
      <ItemForm
        item={item}
        history={history}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    )
  }
}

export default ItemCreate