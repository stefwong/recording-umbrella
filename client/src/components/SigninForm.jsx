import React, { useState } from 'react'


const SigninForm = ({ username, password, newPassword, handleUsernameChange, handleNewPasswordChange, handlePasswordChange, handleSubmit, handleUpdateAccount, history }) => {

  const [forgot, setForgot] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    if (!forgot) {
      handleSubmit()
        .then(() => history.push('/'))
        .catch(error => console.error(error))
    } else {
      handleUpdateAccount()
      .then(() => {
        setForgot(false)
      })
      .catch(error => console.error(error))
    }
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
        {
          forgot && 
          <div>
            new password
            <input type='password' value={newPassword} onChange={handleNewPasswordChange} />
          </div>
        }
        <button type='submit'>{!forgot ? 'Log In' : 'Update'}</button>
        <span onClick={() => setForgot(!forgot)}>Change My Password</span>
      </form>
    </>
  )
}

export default SigninForm
