import React from "react";
import {Redirect,Link} from "react-router-dom";
import "../css/Autentificare.css"


class Autentificare extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nume:"",
            parola:""
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
                <div className="titlu">Autentificare</div>
                <input type="text" name="nume" className="inputs" placeholder="nume utilizator" 
                onChange={(e)=> this.onChangeHandler(e)} value={this.state.nume}></input>
                <input type="password" name="parola" className="inputs" placeholder="parola" 
                onChange={(e)=> this.onChangeHandler(e)} value={this.state.parola}></input>
            
                <div className="spatiu"></div>

                <div className="butoane" id="send" onClick={async ()=>{
                    let raspuns = await this.props.request(this.state.nume, this.state.parola);
                    if(raspuns)
                    {
                        let eroare = document.getElementById("eroare");
                        eroare.textContent=raspuns;
                        eroare.style.display="flex";
                        setTimeout(() => {
                            eroare.style.display="none";
                        }, 3000);
                    
                    }
                }}>Trimite</div>
                <div className="butoane" id="eroare"></div>
                <Link className="butoane" to="inregistrare">Nu am un cont de utilizator</Link>

            </div>
        )
    }
}

export default Autentificare;