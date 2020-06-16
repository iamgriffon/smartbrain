import React from 'react';

class SignIn extends React.Component {
  constructor(){
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
    onEmailChange = (event) => { //Armazenando o email num estado para mandar pro server
      this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => { //Armazenando a senha num estado para se jogar no servidor 
      this.setState({signInPassword: event.target.value })
    }

    onSubmitSignIn = () => { //Essa function vai pegar os dados (baseados nos estados), dar fetch no servidor e mandar na request, os dados armazenados
      fetch('http://calm-wildwood-09367.herokuapp.com/signin', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
      .then(response => response.json())
      .then(data =>{
        if(data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange('home') //Mudando o estado para entrar no app
        }
      }) 
    }

  render() {
    const {onRouteChange} = this.props
    return(
        <article className="br3 ba courier b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              {/* Title */}
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>

             {/* Email-field */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>

            {/* Password Field */}
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password"
               name="password"  
               id="password" />
            </div>
          </fieldset>
            {/* SignIn Button */}
          <div>
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            onClick={this.onSubmitSignIn}
             value="Sign in" />
        </div>
            {/* Register Link */}
          <div className="lh-copy mt3">
            <p className="f6 link dim black underline pointer db" onClick={() => { onRouteChange('register')}} >Register</p>
          </div>
        </div>
      </main>
      </article>
    )
  }
}
export default SignIn;