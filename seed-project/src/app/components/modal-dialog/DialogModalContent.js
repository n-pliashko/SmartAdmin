import React from 'react';
import ReactDOM from 'react-dom'

import UiDatepicker from '../forms/inputs/UiDatepicker';
import SmartCKEditor from '../../components/forms/editors/SmartCKEditor'

import 'script-loader!eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker'
require('eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');

export default class DialogModalContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      attributes: this.props.attributes,
      row: this.props.row,
      new: this.props.new
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.getValueByName = this.getValueByName.bind(this);
  }

  componentDidMount() {
    $(this.refs.datetime).datetimepicker({
      locale: 'en',
      showTodayButton: true,
      showClear: true,
      ignoreReadonly: true
    });
  }

  componentWillUnmount() {
    $(this.refs.datetime).datetimepicker('destroy');
  }

  _submitDialog = (e)=> {
    e.preventDefault();
    let props = this.props;
    let ajax_options = {
      url: props.ajax.url.replace(':pk', props.pk),
      dataType: 'JSON',
      data: JSON.stringify(this.state.row),
      cache: false,
      contentType: "application/json"
    }

    if (props.ajax.token) {
      ajax_options.headers = {
        "Authorization": localStorage.getItem('token')
      };
    }

    if ( props.ajax.method ) {
      ajax_options.method = props.ajax.method;
    }

    $.ajax(_.extend(ajax_options,{
      success: function (data) {
        console.log(data);
        this.props.closeDialog(e);
        $(this.props.tableIdentifier).dataTable().api().ajax.reload(null, false);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.ajax.url, status, err.toString());
      }.bind(this)
    }));
  }

  _cancelDialog = (e)=> {
    this.props.closeDialog(e);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    _.set(this.state.row, name, value);
    this.setState({});
  }

  handleEditorChange(event) {
    const name = event.name;
    const value = event.getData();
    _.set(this.state.row, name, value)
    this.setState({});
  }

  handleLinkChange(event) {
    const name = event.name;
    const value = event.getData();

    console.log(event);
    /*
    _.set(this.state.row, name, value.split(';'))
    this.setState({});*/
  }

  getValueByName(name) {
    return _.isEmpty(this.state.row) ? '' : name.split('.')
      .reduce(function (object, property) {
        return object[property];
      }, this.state.row);
  }

  render () {
    let data = this.state;
    let inputs = data.attributes.map((one, key) => {
      let label = '', className = 'form-control ';
      let readonly = false;

      if (!!one.autoCreate && data.new) {
        return true;
      }

      if (one.type != 'hidden') {
        let title = one.title != '' ? one.title : one.name;
        label = <label className="col-md-2 control-label" style={{fontWeight:'bold'}}>{title.toUpperCase()}</label>
      }
      if (one.class != 'undefined') {
        className += one.class;
      }

      if (one.readonly != 'undefined' && !!one.readonly && !data.new) {
        readonly = true;
      }

      let input = <input className={className} type={one.type} name={one.name} value={this.getValueByName(one.name)} onChange={this.handleInputChange} readOnly={readonly}/>;

      if (one.type == 'phone') {
        input = <label className="input-icon-right"><i  className="icon-append fa fa-phone"/><input type="text"
                                                                                                    name={one.name} value={this.getValueByName(one.name)} onChange={this.handleInputChange}
                                                                                                    className={className} readOnly={readonly}/>
        </label>;
      }

      if (one.type == 'link') {
        let links = this.getValueByName(one.name);
        input = '';
        if (!_.isEmpty(links)) {
          if (!_.isArray(links)) {
            links = [links];
          }
          links.map(link => {
            input += '<a href="' + link + '">' + link + '</a>';
          })
        }

        if (!!data.new) {
          input = <SmartCKEditor className={className} container={one.name} options={{
            height: '80px',
            toolbar: [{ name: 'links', items : [ 'Link','Unlink','Anchor' ] }],
            allowedContent: {
              a: {
                attributes: '!href'
              }
            },
            language: 'en'
          }} name={one.name} onChange={this.handleLinkChange} defaultValue={input}/>
        }
      }

      if (one.type == 'date') {
        input = <label className="input-icon-right"><i  className="icon-append fa fa-calendar"/><UiDatepicker
                    name={one.name} value={this.getValueByName(one.name)} onChange={this.handleInputChange}
                    className={className} changeMonth={true} changeYear={true} readOnly={readonly}
                    data-date-format="dd/mm/yy"/>
        </label>;
      }

      if (one.type == 'datetime') {
        input = <label className="input-icon-right"><i  className="icon-append fa fa-calendar"/><input
          type="text" name={one.name} defaultValue={this.getValueByName(one.name)} onChange={this.handleInputChange} data-date-format="DD/MM/YYYY HH:mm:ss" ref="datetime"
          className={className}/>
        </label>;
      }

      if (one.type == 'textarea') {
        input = <textarea className={className} name={one.name} onChange={this.handleInputChange} readOnly={readonly}>{this.getValueByName(one.name)} </textarea>;
      }

      if (one.type == 'html') {
        input = <SmartCKEditor className={className} container={one.name} options={{
          height: '180px',
          language: 'en'
        }} name={one.name} onChange={this.handleEditorChange} defaultValue={this.getValueByName(one.name)} readOnly={readonly}/>
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
      <div className={this.props.className}>
        <form className="form-horizontal" method="POST">
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