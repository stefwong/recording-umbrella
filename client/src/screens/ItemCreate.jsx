import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import itemService from '../services/items'

class ItemCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {
        name: '',
        description: '',
        price: 0,
        imgUrl: '',
        category: ''
      },
      createdItem: null
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'price') {
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
    console.log('submitted')
    // if (response.status === 201) {
    //   this.props.addItem(response.data)
    //   this.setState({
    //     createdItem: response.data
    //   })
    // }
    try {
      const createdItem = await itemService.create(this.state.item)
      console.log(createdItem)
      this.setState({createdItem})
    } catch (error) {
      throw error
    }
  }
  render() {
    const { handleChange, handleSubmit } = this
    const { createdItem, item } = this.state
    const { history } = this.props

    if (createdItem) {
      return <Redirect to={`/`} />
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