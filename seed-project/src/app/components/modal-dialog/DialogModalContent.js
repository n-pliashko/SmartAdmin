import React from 'react';

import UiDatepicker from '../forms/inputs/UiDatepicker';
import SmartCKEditor from '../../components/forms/editors/SmartCKEditor'

import 'script-loader!eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker'
require('eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');

export default class DialogModalContent extends React.Component{

  componentDidMount() {
    $(this.refs.datetime).datetimepicker({
      locale: 'en',
      showTodayButton: true,
      showClear: true
    });
  }

  componentWillUnmount() {
    $(this.refs.datetime).datetimepicker('destroy');
  }

  _submitDialog = (e)=> {
    e.preventDefault();
    let props = this.props;
    $.ajax({
      url: props.url,
      dataType: 'json',
      method: 'POST',
      data: this.state.row,
      cache: false,
      success: function (data) {
        console.log(data);
        this.closeDialog(e);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.state.row[name] = value;
    this.setState({});
  }

  handleEditorChange(event) {
    const name = event.name;
    const value = event.getData();
    this.state.row[name] = value;
    this.setState({});
  }

  render () {
    let data = this.state;
    let inputs = data.attributes.map((one, key) => {
      let label = '', className = 'form-control ';
      let readonly = false;
      if (one.type != 'hidden') {
        let title = one.title != '' ? one.title : one.name;
        label = <label className="col-md-2 control-label" style={{fontWeight:'bold'}}>{title.toUpperCase()}</label>
      }
      if (one.class != 'undefined') {
        className += one.class;
      }

      if (one.readonly != 'undefined' && !!one.readonly) {
        readonly = true;
      }

      let input = <input className={className} type={one.type} name={one.name} value={data.row[one.name]} onChange={this.handleInputChange} readOnly={readonly}/>;

      if (one.type == 'phone') {
        input = <label className="input-icon-right"><i  className="icon-append fa fa-phone"/><input type="text"
                                                                                                    name={one.name} value={data.row[one.name]} onChange={this.handleInputChange}
                                                                                                    className={className} readOnly={readonly}/>
        </label>;
      }

      if (one.type == 'date') {
        input = <label className="input-icon-right"><i  className="icon-append fa fa-calendar"/><UiDatepicker
                    name={one.name} value={data.row[one.name]} onChange={this.handleInputChange}
                    className={className} changeMonth={true} changeYear={true} readOnly={readonly}
                    data-date-format="dd/mm/yy"/>
        </label>;
      }

      if (one.type == 'datetime') {
        input = <label className="input-icon-right"><i  className="icon-append fa fa-calendar"/><input
          type="text" name={one.name} defaultValue={data.row[one.name]} onChange={this.handleInputChange} data-date-format="DD/MM/YYYY HH:mm:ss" ref="datetime"
          className={className}/>
        </label>;
      }

      if (one.type == 'textarea') {
        input = <textarea className={className} name={one.name} onChange={this.handleInputChange} readOnly={readonly}>{data.row[one.name]} </textarea>;
      }

      if (one.type == 'html') {
        input = <SmartCKEditor className={className} container={one.name} options={{
          height: '180px',
          startupFocus: true,
          language: 'en'
        }} name={one.name} onChange={this.handleEditorChange} defaultValue={data.row[one.name]} readOnly={readonly}/>;
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