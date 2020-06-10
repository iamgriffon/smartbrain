import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecon from './Components/FaceRecon/facerecon';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
  apiKey: 'c4df1e7e7e83499594114f873b920f5e'
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'notlogged',
      logged: false
    }
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
      this.setState({ logged: false })
    } else if (route ==='home') {
      this.setState({ logged: true })
    }
    this.setState({route : route});
    console.log(route, 'logged:', this.state.logged)
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

 
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => {this.displayBox(this.calculateFace(response))})
      .catch(err => { console.log(err)})}


  render(){
    let { imageUrl, box, logged, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
         params={particlesOptions} />
        <Navigation loggedin={logged} onRouteChange={this.onRouteChange} />
            { route === 'home' //If para carregar a home
             ? <div> 
             <Logo />
             <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
             <Rank />
             <FaceRecon 
             box={box}
             imageUrl={imageUrl} /> 
           </div>
             :(
               this.state.route === 'notlogged'  //Else if => :(condição ? :)
               ? <SignIn onRouteChange={this.onRouteChange}/>
               : <Register onRouteChange={this.onRouteChange}/>
             )}
        </div>
         )
        }
       }

export default App;
