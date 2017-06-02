import React from 'react';

import UiDatepicker from '../forms/inputs/UiDatepicker';

export default class DialogModalContent extends React.Component{

  _submitDialog = (e)=> {
    this.closeDialog(e);
  }

  _cancelDialog = (e)=> {
    this.props.closeDialog(e);
  }

  constructor(props) {
    super(props);
    this.state = {
      attributes : this.props.attributes,
      row : this.props.row
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.state.row[name] = value;
    this.setState({});
  }

  render () {
    let data = this.state;
    let inputs = data.attributes.map((one, key) => {
      let label = '', className = 'form-control ';
      let readonly = false;
      if (one.type != 'hidden') {
        label = <label className="col-md-2 control-label" style={{fontWeight:'bold'}}>{one.title.toUpperCase()}</label>
      }
      if (one.class != 'undefined') {
        className += one.class;
      }

      if (one.readonly != 'undefined' && !!one.readonly) {
        readonly = true;
      }

      let input = <input className={className} type={one.type} name={one.name} value={data.row[one.name]} onChange={this.handleInputChange} readOnly={readonly}/>;
      if (one.type == 'date') {
        input = <label><i  className="fa fa-calendar"/><UiDatepicker
                    name={one.name} value={data.row[one.name]} onChange={this.handleInputChange}
                    className={className} changesMonth={true}
                    data-date-format="dd/mm/yy"/>
        </label>;
      }
      return (
        <div key={key} className="form-group">
          {label}
          <div className="col-md-10">
            {input}
          </div>
        </div>
      );
    });
    return (
      <div id={data.row.id} className={this.props.className}>
        <form id={data.id} className="form-horizontal" method="POST">
          {inputs}
          <div className="col-md-12" style={{textAlign: 'right'}}>
            <button className="btn btn-default" type="reset" onClick={this._cancelDialog}>
              Cancel
            </button>&nbsp;
            <button className="btn btn-primary" onClick={this._submitDialog} type="submit">
              <i className="fa fa-save"></i>&nbsp;
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}