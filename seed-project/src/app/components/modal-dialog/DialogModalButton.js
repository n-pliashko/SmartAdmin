import React from 'react'
import ReactDOM from 'react-dom'
import DialogModalContent from './DialogModalContent'


$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
  _title: function (title) {
    if (!this.options.title) {
      title.html("&#160;");
    } else {
      title.html(this.options.title);
    }
  }
}))

export default class DialogModalButton extends React.Component {

  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
  }

  showDialog (e) {
    e.preventDefault();

    let props = this.props;
    let id = props.id;

    let $dialog = $('<div><p>Loading...</p></div>').dialog({
      title: `<div class="widget-header">${props.header}</div>`,
      width: 800,
      maxHeight: 400,
      position: {
        my: 'center',
        at: 'center',
        of: window,
        collision: 'fit'
      },
      modal: !!this.props.modal,
      close: function (e) {
        $(this).remove();
      }
    });

    let closeDialog = function (e) {
      e.persist();
      $dialog.dialog('close');
    };

    let ajax_options = {
      url: props.ajax.url,
      dataType: 'JSON',
      cache: false,
    }

    if (props.ajax.token) {
      ajax_options.headers = {
        "Authorization": localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    }

    if (props.ajax.method) {
      ajax_options.method = props.ajax.method;
    }

    if (props.ajax.data) {
      ajax_options.data = props.ajax.data;
    }

    if (props.pk) {
      ajax_options.url = ajax_options.url.replace(':pk', props.pk);
    }

    if (!!props.edit) {
      $.ajax(_.extend(ajax_options, {
        success: function (data) {
          let content = React.createElement(DialogModalContent, {
            closeDialog: closeDialog,
            tableIdentifier: props.tableIdentifier,
            attributes: this.props.attributes,
            row: data,
            pk: props.pk,
            ajax: props.saveAction
          });
          ReactDOM.render(content, $dialog[0])
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      }));
    }

    if (!!props.delete) {
      let content = React.createElement(deleteContent, {closeDialog: closeDialog, tableIdentifier: props.tableIdentifier, ajax_options: ajax_options});
      ReactDOM.render(content, $dialog[0])
    }

    if (!!props.info) {
      $.ajax(_.extend(ajax_options, {
        success: function (data) {
          let content = '';
          if (props.template) {
            content = React.createElement(props.template, {closeDialog: closeDialog, data: data});
          } else {
            content = data.content;
          }
          ReactDOM.render(content, $dialog[0])
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(props.url, status, err.toString());
        }.bind(this)
      }));
    }
  }

  render() {
    let button ='';

    if (!!this.props.edit) {
      button = <button className="btn btn-default btn-edit" type="button" onClick={this.showDialog}><i className="fa fa-pencil"></i></button>
    }

    if (!!this.props.delete) {
      button =
        <button className="btn btn-default btn-delete" type="button" onClick={this.showDialog}><i className="fa fa-times"></i></button>
    }

    if (!!this.props.info) {
      button =
        <button className="btn btn-info" type="button" onClick={this.showDialog}><i className="fa fa-info"></i></button>
    }

    if (this.props.customButton) {
      button = React.createElement(this.props.customButton, {showDialog: this.showDialog});
    }

    return button;
  }
}

class deleteContent extends React.Component {

  _submitDialog = (e)=> {
    e.preventDefault();

    console.log(this.props.ajax_options);
    $.ajax(_.extend(this.props.ajax_options, {
      success: function (data) {
        console.log(data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.ajax_options.url, status, err.toString());
      }.bind(this)
    }));
    this.props.closeDialog(e);
    $(this.props.tableIdentifier).dataTable().api().ajax.reload(null, false);
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="dialog_simple">
        <form method="POST" onSubmit={this._submitDialog}>
          <div style={{textAlign: 'right'}}>
            <button className="btn btn-danger" onClick={this._submitDialog}><i
              className="fa fa-trash-o"/>&nbsp; Yes
            </button>
            <button className="btn btn-default" onClick={this.props.closeDialog}><i
              className="fa fa-times"/>&nbsp; Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}