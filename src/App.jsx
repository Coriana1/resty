import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

export const initialState = {
  data: null,
  loading: false,
  history: [],
}

export const dataReducer = (state=initialState, action) => {
  switch(action.type){
    case 'ADD DATA':
      return {
        ...state, 
        data: action.payload}
    case 'LOADING':
      return {...state, 
       loading: action.payload}
    case 'HISTORY':
      return {...state,
        history: [...state.history, action.payload]}
    default:
      return state;
  }
}

function App(){

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [history, setHistory] = useState([]);
  // const [input, setInput] = useState('');
  const [requestParams, setRequestParams] = useState({});
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    console.log('An Event Occured');
  });

  useEffect(() => {
    try{
      dispatch({type: 'LOADING', payload: true });
      async function getData(){
        if(requestParams.method === 'GET'){
          let response = await axios.get(requestParams.url);
          dispatch({type: 'ADD DATA', payload: response.data });
          let historyData = [requestParams, response.data];
          dispatch({type: 'HISTORY', payload: historyData });
        }
        // if(requestParams.method === 'POST'){
          //   let response = await axios.post(requestParams.url, requestParams.json)
          //   setData(response.data)
          // }
          // if(requestParams.method === 'PUT'){
            //   let response = await axios.put(requestParams.url, requestParams.json)
            //   setData(response.data)
            // }
        // if(requestParams.method === 'DELETE'){
        //   let response = await axios.delete(requestParams.url)
        //   setData(response.data)
        // }
      }
      if(requestParams.method && requestParams.url){
        getData();
        dispatch({type: 'LOADING', payload: false });
      }
    } catch {
      dispatch({type: 'ADD DATA', payload: 'no data available' });
      dispatch({type: 'LOADING', payload: false });
    }
  }, [requestParams])
  
  const callApi = (requestParams) => {
    setRequestParams(requestParams);
  }

  const historyClickHandler = (results) => {
    dispatch({type: 'ADD DATA', payload: results})
  }
  
  return (
    <>
      <Header />
      <div data-testid="app-method" className="divvy">Request Method: {requestParams.method}</div>
      <div data-testid="app-url" className="divvy">URL: {requestParams.url}</div>
      { 
        requestParams.json
        ? <div className="divvy">Sent JSON: {requestParams.json}</div>
        : <div></div>
      }
      <Form handleApiCall={callApi} />
      <Results data={state.data} loading={state.loading} />
      <History history={state.history} historyClickHandler={historyClickHandler}/>
      <Footer />
    </>
  );
}

export default App;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.scss';

// // Let's talk about using index.js and some other name in the component folder.
// // There's pros and cons for each way of doing this...
// // OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// // Why is this source of truth beneficial when spread across a global organization?
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Form from './Components/Form';
// import Results from './Components/Results';
// import History from './Components/History';

// // Define initial state
// const initialState = {
//   loading: false,
//   data: null,
//   history: [],
// };

// // Define reducer function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     case 'SET_RESULTS':
//       return { ...state, data: action.payload };
//     case 'ADD_TO_HISTORY':
//       return { ...state, history: [...state.history, action.payload] };
//     default:
//       return state;
//   }
// };

// function App() {
//   const [requestParams, setRequestParams] = useState({});
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const callApi = (requestParams) => {
//     setRequestParams(requestParams);
//   };

//   const handleHistoryClick = (index) => {
//     const selectedHistory = state.history[index];
//     setRequestParams({
//       method: selectedHistory.method,
//       url: selectedHistory.url,
//       json: selectedHistory.json || {},
//     });
//     dispatch({ type: 'SET_RESULTS', payload: selectedHistory.results });
//   };

//   useEffect(() => {
//     async function fetchData() {
//       if (requestParams.method) {
//         dispatch({ type: 'SET_LOADING', payload: true });
//         try {
//           let response;
//           if (requestParams.method === 'GET') {
//             response = await axios.get(requestParams.url);
//           } else if (requestParams.method === 'POST') {
//             response = await axios.post(requestParams.url, requestParams.json);
//           } else if (requestParams.method === 'PUT') {
//             response = await axios.put(requestParams.url);
//           } else if (requestParams.method === 'DELETE') {
//             response = await axios.delete(requestParams.url);
//           }

//           const historyItem = {
//             method: requestParams.method,
//             url: requestParams.url,
//             json: requestParams.json,
//             results: response.data,
//           };

//           dispatch({ type: 'SET_RESULTS', payload: response.data });
//           dispatch({ type: 'ADD_TO_HISTORY', payload: historyItem });
//         } catch (error) {
//           console.log(error);
//         }

//         dispatch({ type: 'SET_LOADING', payload: false });
//       }
//     }
//     fetchData();
//   }, [requestParams]);

//   return (
//     <React.Fragment>
//       <Header />
//       <div data-testid='app-method'>Request Method: {requestParams.method}</div>
//       <div data-testid='app-url'>URL: {requestParams.url}</div>
//       <Form handleApiCall={callApi} />
//       <Results data={state.data} loading={state.loading} />
//       <History history={state.history} handleHistoryClick={handleHistoryClick} />
//       <Footer />
//     </React.Fragment>
//   );
// }

// export default App;