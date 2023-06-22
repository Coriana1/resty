import './Results.scss';
import JSONPretty from 'react-json-pretty';
const JSONPrettyTheme = require('react-json-pretty/dist/adventure_time');

function Results(props){
  return (
    <section >
      {
        props.loading
        ? <div>Waiting for search query OR loading...!</div>
        : <JSONPretty data-testid="results-section" id="json-pretty" theme={JSONPrettyTheme} data={props.data}></JSONPretty>
      }
    </section>
  );
}
export default Results;


// import '../Results';
// import JSONPretty from 'react-json-pretty'

// function Results (props) {
//     return (
//       <section>
//         <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
//       </section>
//     );
//   }
// export default Results;

