import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        notifications: []
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "planningZone": "R5",
          "propertyAreaMin": 1
        })
      });
      const data = await response.json();
      console.dir({ data })

      this.setState({ notifications : JSON.stringify(data) })
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.notifications) return <div>Loading..</div>;
    return <ul>{this.state.notifications}</ul>;
  }
});