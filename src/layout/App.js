import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      a: 0,
      b: 0,
      result: 0,
    };
  }

  load() {
    console.log('Load');
    this.setState({ list: ['First', 'Second'] });

    fetch('http://localhost:5000/product', { method: 'POST' })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  sum() {
    const body = JSON.stringify({
      a: this.state.a,
      b: this.state.b,
    });

    fetch(
      'http://localhost:5000/calc/sum',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      },
    )
      .then(response => response.json())
      .then((json) => {
        this.setState({ result: json.result });
        console.log(json);
      });
  }

  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <input className="form-control" type="text" onChange={e => this.setState({ a: +e.target.value })} />
          <input className="form-control" type="text" onChange={e => this.setState({ b: +e.target.value })} />

          <div className="btn btn-primary" onClick={() => this.sum()}>Sum</div>

          <div className="btn btn-primary" onClick={() => this.load()}>Load</div>
        </div>

        <div className="row">

          <h2>{this.state.result}</h2>

          <ul>
            {
              this.state.list.map(el => <li key={el}>{el}</li>)
            }
          </ul>
        </div>

      </div>
    );
  }
}

export default App;
