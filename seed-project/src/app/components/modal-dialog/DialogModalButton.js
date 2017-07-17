import React from 'react'
import ReactDOM from 'react-dom'
import DialogModalContent from './DialogModalContent'

$.widget('ui.dialog', $.extend({}, $.ui.dialog.prototype, {
  _title: function (title) {
    if (!this.options.title) {
      title.html('&#160;')
    } else {
      title.html(this.options.title)
    }
  },
  _allowInteraction: function(event) {
    return !!$(event.target).closest(".cke_dialog").length || this._super(event);
  }
}))

export default class DialogModalButton extends React.Component {

  constructor (props) {
    super(props)
    this.showDialog = this.showDialog.bind(this)
  }

  showDialog (e) {
    e.preventDefault()

    let props = this.props
    let id = props.id

    let $dialog = $('<div><p>Loading...</p></div>').dialog({
      title: `<div class="widget-header">${props.header}</div>`,
      width: 800,
      position: {
        my: 'center',
        at: 'center',
        of: window,
        collision: 'fit'
      },
      resizable: true,
      modal: !!this.props.modal,
      close: function (e) {
        $(this).remove()
      }
    })

    let closeDialog = function (e) {
      e.persist()
      $dialog.dialog('close')
    }

    if (!!props.add) {
      let row = props.attributes.reduce((obj, attr) => _.set(obj,attr.name, ''), {});
      if (props.saveAction.data) {
        row = _.extend(row, props.saveAction.data);
      }
      let content = React.createElement(DialogModalContent, {
        new: true,
        closeDialog: closeDialog,
        tableIdentifier: props.tableIdentifier,
        attributes: props.attributes,
        row: row,
        pk: '',
        ajax: props.saveAction
      })
      ReactDOM.render(content, $dialog[0]);
      return;
    }

    let ajax_options = {
      url: props.ajax.url,
      dataType: 'JSON',
      cache: false,
      contentType: 'application/json',
      crossDomain: true
    }

    if (props.ajax.token) {
      ajax_options.headers = {
        'Authorization': localStorage.getItem('token')
      }
    }

    if (props.ajax.method) {
      ajax_options.method = props.ajax.method;
    }

    if (props.ajax.data) {
      ajax_options.data = _.extend(props.ajax.data, {lang: localStorage.getItem('lang')});
    }

    if (props.pk) {
      ajax_options.url = ajax_options.url.replace(':pk', props.pk)
    }

    if (!!props.edit) {
      $.ajax(_.extend(ajax_options, {
        success: function (data) {
          let content = React.createElement(DialogModalContent, {
            new: false,
            closeDialog: closeDialog,
            tableIdentifier: props.tableIdentifier,
            attributes: this.props.attributes,
            row: data,
            pk: props.pk,
            ajax: props.saveAction
          })
          ReactDOM.render(content, $dialog[0])
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString())
        }.bind(this)
      }))
    }

    if (!!props.delete) {
      let content = React.createElement(deleteContent, {
        closeDialog: closeDialog,
        tableIdentifier: props.tableIdentifier,
        ajax_options: ajax_options
      })
      ReactDOM.render(content, $dialog[0])
    }

    if (!!props.info) {
      $.ajax(_.extend(ajax_options, {
        success: function (data) {
          let content = ''
          if (props.template) {
            content = React.createElement(props.template, {closeDialog: closeDialog, data: data})
          } else {
            content = data.content
          }
          ReactDOM.render(content, $dialog[0])
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(props.url, status, err.toString())
        }.bind(this)
      }))
    }
  }

  render () {
    let button = ''
    let className = '';
    let title = '';
    let titleAttr = '';

    if (this.props.className) {
      className = this.props.className;
    }

    if (this.props.title) {
      title = this.props.title;
    }

    if (this.props.titleAttr) {
      titleAttr = this.props.titleAttr;
    }

    if (!!this.props.edit) {
      button = <button className={"btn btn-default btn-edit " + className} onClick={this.showDialog} title={titleAttr}><i
        className="fa fa-pencil"></i> {title}</button>
    }

    if (!!this.props.delete) {
      button =
        <button className={"btn btn-default btn-delete " + className} onClick={this.showDialog} title={titleAttr}><i
          className="fa fa-times"></i> {title}</button>
    }

    if (!!this.props.info) {
      button =
        <button className={"btn btn-default" + className} onClick={this.showDialog}><i className="fa fa-info" title={titleAttr}></i> {title}</button>
    }

    if (!!this.props.add) {
      button =
        <button className={"btn " + className} onClick={this.showDialog} title={titleAttr}><i className="fa fa-plus-circle"></i> {title}</button>
    }

    if (this.props.customButton) {
      button = React.createElement(this.props.customButton, {showDialog: this.showDialog})
    }

    return button
  }
}

class deleteContent extends React.Component {

  _submitDialog = (e) => {

    e.preventDefault()

    $.ajax(_.extend(this.props.ajax_options,
      {
        success: function (data) { console.log(data) }.bind(this),

        error: function (xhr, status, err) {
          console.error(this.props.ajax_options.url, status, err.toString());
        }.bind(this)
      }));
    this.props.closeDialog(e)
    $(this.props.tableIdentifier).dataTable().api().ajax.reload(null, false)
  }

  constructor (props) {
    super(props)
  }

  render () {
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
    )
  }
}