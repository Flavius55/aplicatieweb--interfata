import React from "react";
import {Redirect,Link} from "react-router-dom";
import "../css/Autentificare.css"


class Inregistrare extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nume:"",
            parola:"",
            email:""
        }
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        //verificam daca utilizatorul este deja autentificat
      if(this.props.isLogged) return(<Redirect to="/panou-de-bord"></Redirect>)
        else return(
            <div className="formular">
                <div className="titlu2">Inregistrare</div>
                <input type="text" name="nume" className="inputs" placeholder="nume utilizator" onChange={(e)=> this.onChangeHandler(e)} value={this.state.nume}></input>
                <input type="text" name="email" className="inputs" placeholder="email utilizator" onChange={(e)=> this.onChangeHandler(e)} value={this.state.email}></input>
                <input type="password" name="parola" className="inputs" placeholder="parola" onChange={(e)=> this.onChangeHandler(e)} value={this.state.parola}></input>
            
                <div className="spatiuMic"></div>

                <div className="butoane" id="send" onClick={async ()=>{
                    let raspuns = await this.props.request(this.state.nume, this.state.parola,this.state.email);
                    if(raspuns)
                    {
                        let eroare = document.getElementById("eroare");
                        eroare.textContent=raspuns;
                        eroare.style.display="flex";
                        setTimeout(() => {
                            eroare.style.display="none";
                        }, 3000);
                    }
                    else{
                        let redirect = document.getElementById('redirect');
                        redirect.textContent = "Mergi la pagina de autentificare";
                        redirect.classList.remove('butoane','butoane2');
                        redirect.classList.add("butoane2");
                    }
                }}>Trimite</div>
                <div className="butoane" id="eroare"></div>
                <Link className="butoane" to="autentificare" id="redirect">Am deja un cont de utilizator</Link>

            </div>
        )
    }
}

export default Inregistrare;