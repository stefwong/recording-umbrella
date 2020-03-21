import React from 'react'

const SignupForm = ({ username, name, password, handleUsernameChange, handlePasswordChange, handleNameChange, handleSubmit, history }) => {
  const submitHandler = (e) => {
    e.preventDefault()
    handleSubmit()
      .then(() => history.push('/'))
      .catch(error => console.error(error))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          name
          <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={handlePasswordChange} />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}

export default SignupForm
