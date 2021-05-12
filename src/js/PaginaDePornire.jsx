import React from "react";
import "../css/PaginaDePornire.css"


function PaginaDePornire(){
    return(
        <div className="container">
            <div className="credite"  id="baraSUS">
                <div className="text">
                Aplicatie web pentru planificarea activitatilor zilnice si pentru gestionarea timpului
                </div>
            </div>
            <div className="logareBox">
            <a className="text" id="logare" href="/autentificare">
               Autentificare
                </a>
            </div>
            <div className="credite">
            <div className="text" id="creditNume">
                Proiect realizat de Rabuga Andrei-Flavius
                </div>
            </div>
        </div>
    )
};

export default PaginaDePornire;