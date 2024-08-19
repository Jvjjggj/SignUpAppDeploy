import { Component } from 'react'

export default class Login extends Component {
  state={email:"",password:""}

  trackEmail=async(e)=>{
    await this.setState({email:e.target.value})
}

trackPassword=async(e)=>{
    await this.setState({password:e.target.value})
}

handleSubmit=async(e)=>{
  e.preventDefault()
  const options={
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  body:JSON.stringify(this.state)
  }
  const response=await fetch("http://localhost:3008/login",options)
  const data=await response.json()
  console.log(data)
  if(data.status==="ok"){
    alert("Login Successfully")
    window.localStorage.setItem("token",data.token)
    window.location.href='./user-details'
  }
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            onChange={this.trackEmail}
            className="form-control"
            placeholder="Enter email"
            autoComplete='email'
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input onChange={this.trackPassword}
            type="password"
            className="form-control"
            placeholder="Enter password"
            autoComplete='pass'
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"

            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="google.com">password?</a>
        </p>
      </form>
    )
  }
}