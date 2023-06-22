import { useState } from 'react';

import './Form.scss';

function Form(props) {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/');
  const [method, setMethod] = useState('GET');
  const [json, setJson] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      json: json,
    };
    props.handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span data-testid="form-span">URL: </span>
          <input
            name="url"
            type="text"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span
            data-testid="form-get"
            id="get"
            onClick={() => setMethod('GET')}
            style={{ backgroundColor: method === 'GET' ? 'green' : 'lightgrey' }}
          >
            GET
          </span>
          <span
            data-testid="form-post"
            id="post"
            onClick={() => setMethod('POST')}
            style={{ backgroundColor: method === 'POST' ? 'green' : 'lightgrey' }}
          >
            POST
          </span>
          <span
            data-testid="form-put"
            id="put"
            onClick={() => setMethod('PUT')}
            style={{ backgroundColor: method === 'PUT' ? 'green' : 'lightgrey' }}
          >
            PUT
          </span>
          <span
            data-testid="form-delete"
            id="delete"
            onClick={() => setMethod('DELETE')}
            style={{ backgroundColor: method === 'DELETE' ? 'red' : 'lightgrey' }}
          >
            DELETE
          </span>
        </label>
        {(method === 'POST' || method === 'PUT') && (
          <textarea onChange={(e) => setJson(e.target.value)} />
        )}
      </form>
    </>
  );
}

export default Form;




// import './Form.scss';

// function Form(props){

//  let handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       method:'GET',
//       url: 'https://pokeapi.co/api/v2/pokemon',
//     };
//     props.handleApiCall(formData);
//   }

//     return (
//       <>
//         <form onSubmit={handleSubmit}>
//           <label >
//             <span>URL: </span>
//             <input name='url' type='text' />
//             <button type="submit">GO!</button>
//           </label>
//           <label className="methods">
//             <span id="get">GET</span>
//             <span id="post">POST</span>
//             <span id="put">PUT</span>
//             <span id="delete">DELETE</span>
//           </label>
//         </form>
//       </>
//     );
//   }


// export default Form;
