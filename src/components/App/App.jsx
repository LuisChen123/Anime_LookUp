import React from 'react';
import Axios from 'axios';

const port = 8081;

const url = `http://localhost:${port}`;

const params = new URLSearchParams(window.location.search);

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { dataObject } = this.state;
    return (
      <>
        <div>hello</div>
      </>
    );
  }
}

export default App;
