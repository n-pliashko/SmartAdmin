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
        ReactDOM.unmountComponentAtNode(this);
        $(this).remove();
      }
    });

    let closeDialog = function (e) {
      e.preventDefault();
      $dialog.dialog('close');
    };

    if (!!props.edit) {
      $.ajax({
        url: props.url,
        dataType: 'json',
        cache: false,
        data: {[props.data_url] : encodeURIComponent(props[props.data_url])},
        success: function (data) {
          data = data.aaData;
          let content = React.createElement(DialogModalContent, {
            closeDialog: closeDialog,
            attributes: this.props.attributes,
            row: data[id - 1],
            url: props.saveAction
          });
          ReactDOM.render(content, $dialog[0])
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    if (!!props.delete) {
      let content = React.createElement(deleteContent, {closeDialog: closeDialog, id: id, table: props.table, url: props.url});
      ReactDOM.render(content, $dialog[0])
    }

    if (!!props.info) {
      $.ajax({
        url: props.url,
        dataType: 'json',
        cache: false,
        method: 'GET',
        data: {[props.data_url] : encodeURIComponent(props[props.data_url])},
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
      });
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
    let table = this.props.table;
    if (!table.ajax) {
      table = table.dataTable().api();
    }

    let id = this.props.id;
    /*$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        if (data.success) {
          table.row('[data-row-id="' + id + '"]').remove().draw(false);
        } else {
          console.error('assets/api/tables/datatables.standard.json', 500, data.message);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('assets/api/tables/datatables.standard.json', status, err.toString());
      }.bind(this)
    })*/
    table.row('[data-row-id="' + id + '"]').remove().draw(false);
    this.props.closeDialog(e);
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