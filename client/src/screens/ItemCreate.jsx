import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ItemForm from '../components/ItemForm'

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
      createdItem: false
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

  handleSubmit = () => {
    const { item } = this.state
    this.props.handleCreate(item)
      .then(() => this.setState({createdItem: true}))
    
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