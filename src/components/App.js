import React, { Component } from 'react';
import axios from 'axios';
import Highlighter from 'react-highlight-words';

class App extends Component {
  state = {
    url: '',
    html: '',
    summary: {},
    searchWords: []
  };

  handleChange({ target }) {
    this.setState({ url: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.get(`https://serene-wave-14662.herokuapp.com/?url=${this.state.url}`)
      .then(({ data }) => this.setState({ html: data.html, summary: data.summary, searchWords: [] }))
      .catch(error => this.setState({ html: 'Invalid URL.', summary: {}, searchWords: [] }));
  }

  highlightTags({ target }) {
    this.setState({ searchWords: [`<${target.value}`] });
  }

  renderSummary() {
    return Object.keys(this.state.summary).map(key => {
      return (
        <div key={key}>
          <button 
            className="waves-effect waves-light btn"
            onClick={this.highlightTags.bind(this)}
            value={key}
          >
            {key}
          </button>
          {this.state.summary[key]}
        </div>
      ); 
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>Enter URL:</label>
            <input type="text" value={this.state.url} onChange={this.handleChange.bind(this)} />
            <button className="btn waves-effect waves-light" type="submit">Search</button>
          </form>
        </div>
        <div className="row">
          <div className="col s3">
            {this.renderSummary()}
          </div>
          <div className="col s9">
            <pre>
              <Highlighter
                searchWords={this.state.searchWords}
                textToHighlight={this.state.html}
              />
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
