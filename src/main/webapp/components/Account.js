import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: null
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/account', {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();
      console.dir({ data })

      this.setState({ data: JSON.stringify(data) })
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.data) return <div>Loading..</div>;
    return <ul>{this.state.data}</ul>;
  }
});