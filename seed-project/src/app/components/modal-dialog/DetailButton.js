import React from 'react'

export default class DetailButton extends React.Component {

  constructor(props) {
    super(props);
  }

  _showDialog = (e)=> {
    this.props.showDialog(e);
  }

  render() {
    return(
      <div>
        <a className="btn btn-circle" onClick={this._showDialog} style={{color:'green'}}><i className="fa fa-fw fa-plus-circle"/></a>
      </div>
    );
  }
}