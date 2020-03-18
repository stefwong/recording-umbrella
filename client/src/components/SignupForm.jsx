import React from 'react'

const SignupForm = ({ user, username, name, password, handleUsernameChange, handlePasswordChange, handleNameChange, handleSubmit }) => {
  const displayForm = () => {
    return user ? (
      <h2>User Successfully Created!</h2>
    ) : (
      <form onSubmit={handleSubmit}>
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
    )
  }

  return (
    <>
      {displayForm()}
    </>
  )
}

export default SignupForm
