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
      .then(({ data }) => this.setState({ html: data.html, summary: data.summary }))
      .catch(error => this.setState({ html: 'Please enter a valid URL.' }));
  }

  highlightTags({ target }) {
    this.setState({ searchWords: [`<${target.value}`] });
  }

  renderSummary() {
    return Object.keys(this.state.summary).map(key => {
      return (
        <div key={key}>
          <button onClick={this.highlightTags.bind(this)} value={key}>{key}</button>
          {this.state.summary[key]}
        </div>
      ); 
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Enter URL:
            <input type="text" value={this.state.url} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Search" />
        </form>
        <pre>
          <Highlighter
            searchWords={this.state.searchWords}
            textToHighlight={this.state.html}
          />
        </pre>
        {this.renderSummary()}
      </div>
    );
  }
}

export default App;
