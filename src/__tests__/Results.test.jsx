import React from 'react';
import './Results.scss';
import JSONPretty from 'react-json-pretty';
const JSONPrettyTheme = require('react-json-pretty/themes/monikai.css');

function Results(props) {
  return (
    <section >
      {
        props.loading 
        ? <p>Loading...</p>
        : <pre data-testid='json'>{
          props.data ? <JSONPretty id="json-pretty" theme ={JSONPrettyTheme} data={props.data}></JSONPretty> : ''
        } 
        </pre>

      }
      
    </section>
  );
}

export default Results;
  