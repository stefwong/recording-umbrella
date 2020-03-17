// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import FormGroup from '@material-ui/core/FormGroup'
// import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'
// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { changePassword } from '../../services/auth'
// import messages from './AutoDismissAlert/messages'

// class ResetPassword extends Component {
//   constructor() {
//     super()

//     this.state = {
//       oldPassword: '',
//       newPassword: ''
//     }
//   }

//   handleChange = event =>
//     this.setState({
//       [event.target.name]: event.target.value
//     })

//   onChangePassword = event => {
//     event.preventDefault()

//     const { alert, history, user } = this.props

//     changePassword(this.state, user)
//       .then(() =>
//         alert({
//           heading: 'Change Password Success',
//           message: messages.changePasswordSuccess,
//           variant: 'success'
//         })
//       )
//       .then(() => history.push('/'))
//       .catch(error => {
//         console.error(error)
//         this.setState({ oldPassword: '', newPassword: '' })
//         alert({
//           heading: 'Change Password Failed',
//           message: messages.changePasswordFailure,
//           variant: 'danger'
//         })
//       })
//   }

//   render() {
//     const { oldPassword, newPassword } = this.state

//     return (
//       <>
//         <h3>Change Password</h3>
//         <form onSubmit={this.onChangePassword}>
//           <FormGroup controlId="oldPassword">
//             <FormLabel>Old password</FormLabel>
//             <FormControl
//               required
//               name="oldPassword"
//               value={oldPassword}
//               type="password"
//               placeholder="Old Password"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup controlId="newPassword">
//             <FormLabel>New Password</FormLabel>
//             <FormControl
//               required
//               name="newPassword"
//               value={newPassword}
//               type="password"
//               placeholder="New Password"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <Button variant="primary" type="submit">
//             Submit
//         </Button>
//         </form>
//       </>
//     )
//   }
// }

// export default withRouter(ResetPassword)