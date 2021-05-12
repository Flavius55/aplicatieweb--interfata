import React from "react";
//import ReactDOM, { render } from 'react-dom';
import { Redirect } from "react-router-dom";
import "../css/PanouDeBord.css";


class PanouDeBord extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nume:"",
            numar:"",
            tip:"zilnic",
            activitati:[],
            text:""
        }
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    schimbaTip = (tip) => {
        this.setState({tip:tip});
        let a=["zilnic","simplu","important"];
        for(let i=0;i<=2;i++){
            let bm = document.getElementById("bm-"+a[i]).style;
            bm.backgroundColor="white";
            bm.color="rgb(255, 123, 0)";
        }
        let buton_meniu = document.getElementById("bm-"+tip).style;
        buton_meniu.backgroundColor="rgb(255, 123, 0)";
        buton_meniu.color="white";
    }
    
    async componentDidMount(){
        if(localStorage.getItem("token")){
            let json = await this.props.afiseaza();
            this.setState({
                nume: json.nume,
                activitati:json.activitati
            })
            if(json.numarTotal===1) this.setState({numar: json.numarTotal + " activitate"})
                else this.setState({numar: json.numarTotal + " activitati"})
            
            this.afiseazaActivitati(this.state.tip);
        }
    }

    async afiseazaActivitati(tip){
        let container = document.getElementById("activitati-zilnice");
        let act = document.getElementsByClassName("act");
        while(act[0]) act[0].remove();
        let activitati = this.state.activitati;

        for(let i=activitati.length-1; i>=0; i--)  if(activitati[i].tip === tip){
                let text = document.createElement("div");
                let check = document.createElement("check");
                let acts = document.createElement("div");
                text.classList.add("text");
                check.classList.add("check");
                acts.classList.add("act");
                check.id= activitati[i].id_activitate;

                check.onclick = async ()=>{
                    await this.props.sterge(this.state.tip, check.id);
                    await this.componentDidMount();
                }

                text.textContent=activitati[i].text;
                acts.appendChild(check);
                acts.appendChild(text);
                container.appendChild(acts);
                if(activitati[i].rezolvat === 1){
                    check.style.backgroundColor="rgb(255, 123, 0)";
                }
            }
            let spatiu = document.createElement("div");
            spatiu.classList.add("spatiu2");
    }
    

    render(){
        if(localStorage.getItem("token")){
            this.afiseazaActivitati(this.state.tip);
            return(
            <div className="panou">
                <div className="topper"></div>
                <div className="date">
                    <div className="nume"><p>{this.state.nume}</p></div>
                    <div className="numar"><p>{this.state.numar}</p></div>
                </div>
                <div className="spatiuu"></div>
                <div id="activitati-zilnice"></div>
                <div className="spatiu2"></div>

                <div className="buton-meniu" id="bm-zilnic"
                onClick={()=>{this.schimbaTip("zilnic")}}>zilnic</div>
                <div className="buton-meniu" id="bm-simplu"
                onClick={()=>{this.schimbaTip("simplu")}}>simplu</div>
                <div className="buton-meniu" id="bm-important"
                onClick={()=>{this.schimbaTip("important")}}>important</div>

                <div className="adauga">
                    <input id="text-adauga" type="text" name="text" 
                    placeholder="Introdu o activitate noua"
                    onChange={(e)=> this.onChangeHandler(e)} value={this.state.text}></input>
                    <div id="buton-adauga" onClick={async () =>{
                            let raspuns = await this.props.adauga(this.state.text, this.state.tip);
                            await this.componentDidMount();
                            let text = document.getElementById("camp-obligatoriu").style;
                            if(raspuns.eroare) text.display="flex";
                            setTimeout(() => {
                                text.display="none";
                            }, 3000);
                    }}>Adauga</div>
                    <div id="camp-obligatoriu">Acest camp este obligatoriu</div>
                </div>
                

            </div>
            );
        }
        else return(<Redirect to="/autentificare"></Redirect>)
    }


}



export default PanouDeBord;