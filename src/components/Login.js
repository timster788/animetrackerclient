// import React, { Component } from 'react';
// import axios from 'axios';
// //=====================================================================================================================================
// export default class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       password: '',
//       loggedIn: false
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   //=====================================================================================================================================
//   handleChange(event) {
//     let name = event.target.name;
//     let value = event.target.value;
//     this.setState({
//       [name]: value
//     });
//   }
//   //=====================================================================================================================================
//   handleSubmit(event) {
//     event.preventDefault();
//     axios
//       .post('/auth/login', {
//         username: this.state.username,
//         password: this.state.password
//       })
//       .then(data => {
//         this.setState({
//           loggedIn: true
//         });
//       })
//       .catch(err => console.log(err));
//     event.target.reset();
//   }
//   //=====================================================================================================================================
//   renderForm() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input
//           type="text"
//           onChange={this.handleChange}
//           name="username"
//           placeholder="username"
//         />
//         <input
//           type="text"
//           onChange={this.handleChange}
//           name="password"
//           placeholder="password"
//         />
//         <input type="submit" value="Sign In" />
//       </form>
//     );
//   }
//   //=====================================================================================================================================
//   render() {
//     return (
//       <div className="Login">
//         {this.state.loggedIn ? (
//           <div id="log-in">Logged in successfully</div>
//         ) : (
//           <div id="log-in">Please Log In</div>
//         )}
//         {!this.state.loggedIn ? this.renderForm() : ''}
//       </div>
//     );
//   }
// }
//=====================================================================================================================================
