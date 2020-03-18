import React, { useState } from 'react'

const SigninForm = ({ username, password, newPassword, handleUsernameChange, handlePasswordChange, handleSubmit, history }) => {
  const [forgot, setForgot] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    handleSubmit()
      .then(() => history.push('/'))
      .catch(error => console.error(error))
  }

  const forgotPassword = () => {

  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={handlePasswordChange} />
        </div>
        <button type='submit'>Log In</button>
        {!forgot && <button onClick={() => setForgot(true)}>Forgot My Password</button>}
      </form>
    </>
  )
}

export default SigninForm
