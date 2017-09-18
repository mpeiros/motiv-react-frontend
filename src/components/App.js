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
      .then(({ data }) => {
        this.setState({
          html: data.html,
          summary: data.summary,
          searchWords: []
        });
      })
      .catch(error => {
        this.setState({
          html: 'Invalid URL. Try with format http(s)://www.example.com', 
          summary: {},
          searchWords: []
        });
      });
  }

  highlightTags({ target }) {
    this.setState({ searchWords: [`<${target.value}`] });
  }

  renderSummary() {
    return Object.keys(this.state.summary).map(key => {
      return (
        <div className="row valign-wrapper" key={key}>
          <div className="col s7">
            <button
              className="waves-effect waves-light btn"
              onClick={this.highlightTags.bind(this)}
              value={key}
            >
              {key}
            </button>
          </div>
          <div className="col s5">
            Count: {this.state.summary[key]}
          </div>
        </div>
      ); 
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row center-align" style={{ marginTop: '20px' }}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label style={{ fontSize: '18px' }}>Enter URL Below (e.g., http://www.google.com)</label>
            <input type="text" value={this.state.url} onChange={this.handleChange.bind(this)} />
            <button className="btn waves-effect waves-light" type="submit">Search</button>
          </form>
        </div>
        <div className="row">
          <div className="col s3">
            {this.renderSummary()}
          </div>
          <div className="col s9" style={this.state.html === '' ? {} : { border: '1px solid black' }}>
            <pre>
              <code>
                <Highlighter
                  searchWords={this.state.searchWords}
                  textToHighlight={this.state.html}
                />
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
