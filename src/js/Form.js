import React from 'react'

class from extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.setValue(this.input.value)
      }}>
        <div class='form-group'>
          <input type="text" ref={(input) => this.input = input} class='form-control' />
        </div>
        <button type='submit' class='btn btn-primary'>Update</button>
        <hr />
      </form>
    )
  }
}

export default from
