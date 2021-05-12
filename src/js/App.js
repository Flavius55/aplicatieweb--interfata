import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import PaginaDePornire from './PaginaDePornire';
import PanouDeBord from './PanouDeBord';
import Autentificare from './Autentificare';
import Inregistrare from './Inregistrare';




class App extends React.Component {
  constructor(proprietati) {
    super(proprietati);
    this.state = {
      isLogged: false,
      //linkServer:"http://localhost:5000/"
      linkServer:"https://aplicatiewebserver.herokuapp.com/"
      //linkServer:"nu"
    }
    this.setLoggedToTrue = this.setLoggedToTrue.bind(this);
    this.sendLoginData = this.sendLoginData.bind(this);
    this.sendRegisterData = this.sendRegisterData.bind(this);
    this.afiseaza = this.afiseaza.bind(this);
    this.adauga = this.adauga.bind(this);
    this.sterge = this.sterge.bind(this);
  }

  setLoggedToTrue=() =>{               //seteaza utilizatorul conectat
    this.setState({isLogged:true});  
  }
  setLoggedToFalse=() =>{              //seteaza utilizatorul deconectat
    this.setState({isLogged:false});
  }

  async sendLoginData(nume,parola){    //functia returneaza o eroare daca exista sau false in caz contrar
    //validare formular autentificare
    let r;
    if(nume==="" || parola==="") r="Toate campurile trebuie completate!";
    if(r) return r;
    else{
      //comunicare cu serverul
      try {
        const raspuns = await fetch(this.state.linkServer+"autentificare" , {
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              nume:nume,
              parola:parola
          })
      })
      const json = await raspuns.json();
      if(!json.eroare) {
        localStorage.setItem("token",json.token);
        this.setLoggedToTrue();
      }
      return json.eroare; 
      } catch (error) {
        return "Eroare interna a serverului";
      }
      
  }
}

  async sendRegisterData(nume,parola,email) {
    //validarea formularului
    let r;
    if(nume==="" || parola==="" || email==="") r="Toate campurile trebuie completate!";
    else if(!nume[0].match(/[a-z]/i)) r="Numele de utilizator nu poate incepe cu o cifra!";
    else if(nume.match(/ /)) r="Numele de utilizator nu poate contine caractere speciale!";
    else if(!email.match(/@/)) r="Introduceti un email valid!";
    else if(email.match(/ /)) r="Introduceti un email valid!";
    if(r) return r;
      else{
        //comunicare cu serverul
        try {
          const raspuns = await fetch(this.state.linkServer+"inregistrare" , {
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              nume:nume,
              parola:parola,
              email:email
            })
          });
          const json = await raspuns.json();
          return json.eroare;
        } catch (error) {
           return "Eroare interna a serverului";
        }
        
    }
  }

    async afiseaza(){
    const raspuns = await fetch(this.state.linkServer + "afiseaza" , {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:JSON.stringify({
            token:localStorage.getItem("token")
        })
    })
    const json = await raspuns.json();
    return json;
  }
    async adauga(text, tip){
    const raspuns = await fetch(this.state.linkServer + "adauga" , {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:JSON.stringify({
            token:localStorage.getItem("token"),
            text:text,
            tip:tip,
            data:(new Date()).getTime()
        })
    })
    const json = await raspuns.json();
    return json;
  }
  async sterge(tip, id){
    const raspuns = await fetch(this.state.linkServer + "sterge" , {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:JSON.stringify({
            token:localStorage.getItem("token"),
            tip:tip,
            id:id
        })
    })
    const json = await raspuns.json();
    return json;
  }


  //definirea rutelor aplicatiei
  //spre exemplu www.aplicatieweb.ro/inregistrare
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path = "/"><PaginaDePornire /></Route>
          <Route exact path = "/inregistrare" render={(props)=> (<Inregistrare 
            {...props}
            isLogged={this.state.isLogged}
            request={this.sendRegisterData}
            linkServer={this.state.linkServer}
            />)}/>
          <Route exact path="/autentificare" render={(props)=> (<Autentificare 
            {...props}
            isLogged={this.state.isLogged}
            redirectLink="/inregistrare"
            request={this.sendLoginData}
            logMeIn={this.setLoggedToTrue}
            linkServer={this.state.linkServer}
            />)}/>
          <Route exact path = "/panou-de-bord" render={(props)=> (<PanouDeBord 
            {...props}
            isLogged={this.state.isLogged}
            linkServer={this.state.linkServer}
            afiseaza={this.afiseaza}
            adauga={this.adauga}
            sterge={this.sterge}
            />)}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
