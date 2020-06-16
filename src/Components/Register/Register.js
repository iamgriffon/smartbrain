import React from 'react';

class Register extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => { //Armazenando o email num estado para mandar pro server
    this.setState({name: event.target.value})
  }
    onEmailChange = (event) => { //Armazenando o email num estado para mandar pro server
      this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => { //Armazenando a senha num estado para se jogar no servidor 
      this.setState({password: event.target.value });
    }

    onRegister = () => { //Essa function vai pegar os dados (baseados nos estados), dar fetch no servidor e mandar na request, os dados armazenados
      fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
      .then(response => response.json())
      .then(user =>{
        if(user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home') //Mudando o estado para entrar no app
        }
      }) 
    }

    

    render() {
      const { onRouteChange } = this.props;
    return(
        <article className="br3 ba courier b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              {/* Title */}
            <legend className="f2 fw6 ph0 mh0">Register</legend>

            {/* Name */}
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                onChange={this.onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                name="name"  
                id="name" />
            </div>

             {/* Email-field */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              onChange={this.onEmailChange} 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" 
              name="email-address"  
              id="email-address" />
            </div>

            {/* Password Field */}
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={this.onPasswordChange} 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="password"  
              id="password" />
            </div>
          </fieldset> 

            {/* Register Button */}
            <div>
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                onClick={this.onRegister}  
                value="Register" />
            </div>

            {/* Go back link */}
            <div className="lh-copy mt3">
                <p className="f6 link dim black underline pointer db" onClick={() => { onRouteChange('notlogged')}} >Cancel</p>
            </div>

        </div>
      </main>
      </article>
    )
}
}

export default Register;