import React, { Component } from 'react';
import './scss/main.scss';
import logo from './images/descarga.svg';
import Footer from './components/Footer';
// import PropTypes from "prop-types";
import logoUndefined from './images/undefined-logo.svg';
import logoAdalab from './images/logo-adalab.svg';
import Form from './components/Form';
import Header from './components/Header';
import Card from './components/Card';

const fr = new FileReader();

class App extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.state = {
      allSkills: [],
      dataObject: {
        'palette': '',
        'typography': '',
        'name': '',
        'job': '',
        'phone': '',
        'email': '',
        'linkedin': '',
        'github': '',
        'photo': '',
        'skills': []
    },
    fileUrl: '/static/media/default_picture.2a640627.jpg'
  }
    this.getSkills();
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);

    //Here start binds for image logic
    this.imageClick = this.imageClick.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.writeImage = this.writeImage.bind(this);
  }

  imageClick(event){
    event.preventDefault();
    this.fileInput.current.click();
  }

  writeImage() {
    const url = fr.result;
    this.setState({
      fileUrl: url
    });
  }

  handleImageChange(event){
    const myImage = event.currentTarget.files[0];

    fr.addEventListener('load', this.writeImage);
    fr.readAsDataURL(myImage);

  }

  getSkills() {
    fetch('https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json')
      .then(response => response.json())
      .then(dataSkills => this.setState(
        {
          allSkills: dataSkills.skills
        }
      ))
  }
  
//metodo para seleccionar y des-seleccionar las skills
  handleChange(event) {
    const skillValue = event.target.value;
    if (this.state.dataObject.skills.length === 3) {
      event.target.checked = false;
    }
    this.setState((prevState) => {
      let auxList = prevState.dataObject.skills;
      let index = auxList.indexOf(skillValue);
      console.log(index);

      if (index > -1) {
        auxList.splice(index, 1);
      } else {
        if (auxList.length < 3) {
          auxList.push(skillValue);
        }
      }
      console.log(auxList);
      return {
        dataObject : {
          ...prevState.dataObject,
          skills: auxList
      }
    }
    })
  } 

  update(event) {
    console.log(event.target.value);
    const { value, name } = event.target;
   
    this.setState((prevState) => {
      return {
        dataObject: {
          ...prevState.dataObject, 
        [name]: value,
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Header logo={logo} />
        <main className="main__container">
          <Card 
          data={this.state.dataObject}
          imageBg={{backgroundImage: `url(${this.state.fileUrl})` }}
          />
          <Form
            data={this.state.dataObject}
            skills={this.state.allSkills}
            handleChange={this.handleChange}
            formUpdate={this.update}

            //Here start props for image logic
            imageLoad={this.imageClick}
            handleImageChange={this.handleImageChange}
            refForInput={this.fileInput} 
            imageBg={{backgroundImage: `url(${this.state.fileUrl})` }}
          />
        </main>
        <Footer
          logoTeam={logoUndefined}
          logoAdalab={logoAdalab}
        />
      </div >
    );
  }
}

export default App;