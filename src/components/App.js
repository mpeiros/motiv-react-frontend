import React, { Component } from 'react';
import axios from 'axios';
import Highlighter from 'react-highlight-words';

class App extends Component {
  state = {
    html: '',
    summary: {},
    searchWords: []
  };

  componentDidMount() {
    axios.get('http://localhost:3000?url=http://www.google.com')
      .then(response => this.setState({ html: response.data.html, summary: response.data.summary }));
  }

  highlightTags(event) {
    this.setState({ searchWords: [`<${event.target.value}`] });
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
