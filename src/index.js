import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Questions from './questions';

import './style.css';
import './bluebird.min.js';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
		<>
			<Questions />
		</>
    )
  }
}
export default App;

const rootElement = document.getElementById("app");

if (module.hot) {
	ReactDOM.render(<App />, rootElement);
}else{
	if (rootElement.hasChildNodes()) {
		ReactDOM.hydrate(<App />, rootElement);
	} else {
		ReactDOM.render(<App />, rootElement);
	}
}