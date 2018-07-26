import React from 'react'
import Form from './Form'

class Content extends React.Component {
  render() {
    return (
      <div>
        <p>Value: {this.props.value}</p>
        <Form setValue={this.props.setValue} />
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content

