import React from 'react'

export default class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className={this.props.className}>
        <thead>
        {this.props.thead}
        </thead>
        <tbody>
        {this.props.tbody}
        </tbody>
      </table>
    );
  }
}
