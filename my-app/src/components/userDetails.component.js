import { Component } from "react";

class UserDetails extends Component {

    state={fname:"",lname:"",email:"",password:""}

  async componentDidMount() {
    const token = window.localStorage.getItem("token");

    if (!token) {
      alert("No token found, please log in.");
      window.location.href = "./login"; // Redirect to login page if no token
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    };

    try {
      const response = await fetch("http://localhost:3008/user-details", options);

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json(); // Ensure response is handled correctly
      await this.setState({fname:data.data.fname,lname:data.data.lname,email:data.data.email,password:data.data.password})
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch user details.");

      // Handle error (e.g., redirect to login)
    }
  }

  render() {
    const {fname,lname,email}=this.state
    return <div>
        First Name<h1>{fname}</h1>
        Last Name<h1>{lname}</h1>
        Email<h1>{email}</h1>
    </div>;
  }
}

export default UserDetails;
