import { Component } from 'react'

export default class SignUp extends Component {

    state={fname:"",lname:"",email:"",password:""}

    trackFname=async(e)=>{
        await this.setState({fname:e.target.value})
    }

    trackLname=async(e)=>{
        await this.setState({lname:e.target.value})
    }

    trackEmail=async(e)=>{
        await this.setState({email:e.target.value})
    }

    trackPassword=async(e)=>{
        await this.setState({password:e.target.value})
    }

    handle=async(e)=>{
        e.preventDefault()
        const options={
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(this.state)
        }

        const response=await fetch("http://localhost:3008/register",options)
        const data=await response.json()
        if(data.status==="ok"){
          alert("Register Succussfully")
        }
        else{
          alert(data.status)
        }
    }

  render() {
    return (
      <form onSubmit={this.handle}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            autoComplete='f'
            onChange={this.trackFname}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" onChange={this.trackLname} className="form-control" placeholder="Last name" autoComplete='l' />
        </div>

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
          <input
            onChange={this.trackPassword}
            type="password"
            className="form-control"
            placeholder="Enter password"
            autoComplete='pass'
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}