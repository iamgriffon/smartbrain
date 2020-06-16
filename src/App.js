import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecon from './Components/FaceRecon/facerecon';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';




const particlesOptions ={
    particles: {
    number: {
      value: 125,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'notlogged',
  logged: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    } })
  }

  displayBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onRouteChange = (route) => {
    if (route === 'notlogged') {
      this.setState(initialState)
    } else if (route ==='home') {
      this.setState({ logged: true })
    }
    this.setState({route : route});
  }

  calculateFace = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)
     }
  }

  onSubmit = () => { //função para submeter a imagem
    this.setState({imageUrl: this.state.input}); //armazenando o link da imagem
      fetch('http://calm-wildwood-09367.herokuapp.com/imageurl', { //function para chamar a API e fazer o serviço
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input //E no corpo da request vc vai mandar o id o user (pq a request pede)
      })
    })
    .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('http://calm-wildwood-09367.herokuapp.com/image', { //puxar no frontend uma request de put
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id //E no corpo da request vc vai mandar o id o user (pq a request pede)
            })
          })
          .then(response => response.json()) //E o servidor vai mandar a resposta
          .then(count =>  //E daí ele vai pegar a resposta e vai
            this.setState(Object.assign(this.state.user, { entries: count }))) //armazenar no estado
        }
        this.displayBox(this.calculateFace(response))})
          .catch(err => { console.log(err)})}

  render(){
    let { imageUrl, box, logged, route } = this.state;
    let {name, entries} = this.state.user;
    return (
      <div className="App">
        <Particles className='particles'
         params={particlesOptions} />
        <Navigation loggedin={logged} onRouteChange={this.onRouteChange} />
            { route === 'home' //Se o estado atual for de "Home" (ou seja, logado)
             ? <div> 
             <Logo />
             <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
             <Rank name={name} entries={entries} />
             <FaceRecon 
             box={box}
             imageUrl={imageUrl} /> 
           </div>
             :(
               this.state.route === 'notlogged'  //Else if => :(condição ? :)
               ? <SignIn  //Se o estado for de não logado, vai renderizar o seguinte: 
               onRouteChange={this.onRouteChange}
               loadUser={this.loadUser}/>
               : <Register 
               loadUser={this.loadUser}
               onRouteChange={this.onRouteChange}/>
             )}
        </div>
         )
        }
       }

export default App;
