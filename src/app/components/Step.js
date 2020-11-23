import React from 'react'

function Step(props){
const nextStep = parseInt(props.step)+1;
const contentStyle = props.isActive ? "block" : "none";
const nextButton = props.hasNavigation ? <button className="actionButton" value={nextStep} type="button" onClick={props.handlenext}> Next ></button> : ''

    return (    
        <div className="accordionSection">
            <button type="button" className="accordionTitle" value={props.step} onClick={props.handlenext}>
                {props.title}
            </button>
            <div style={{display:contentStyle}} className="accordionContent">
                {props.children}
                {nextButton}
            </div>
        </div>
   )
}

export default Step