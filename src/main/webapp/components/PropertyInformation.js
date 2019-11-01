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
      const response = await fetch('/api/propertyinformation/699866', {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();
      console.dir({ data })

      this.setState({ content: JSON.stringify(content) })
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.propertyId) return <div>Loading..</div>;
    const items = this.state.propertyId.map(propertyId =>
      <li key={propertyId}>{propertyId}</li>
    );
    return <ul>{items}</ul>;
  }
});