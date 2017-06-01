import React from 'react'

export default class InfoContent extends  React.Component {
  constructor(props) {
    super(props)
  }

  _closeDialog = (e)=> {
    this.props.closeDialog(e);
  }

  render() {
    let response = this.props.data;
    let content = '';

    if (response.service.status == true) {
      content = $.map(response.response, function (one, i) {
        return (
          <div key={i} style={{wordBreakWrap: true}}>
            <p style={{fontWeight: 'bold'}}>{one.brand}</p>
            <p>{one.items}</p>
          </div>
        );
      });
    } else {
      let message = (response.service.error) ? response.service.error : response.service.message;
      content = <p>{message}</p>;
    }
    return (
      <div width="inherit">
        {content}
        <div style={{textAlign: 'right'}}>
          <button className="btn btn-info" onClick={this._closeDialog}>
            <i className="fa fa-info"/>&nbsp; OK
          </button>
        </div>
      </div>
    );
  }
}