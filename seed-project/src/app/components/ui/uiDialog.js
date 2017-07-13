import React from 'react'
import ReactDOM from 'react-dom'

$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
  _title: function (title) {
    if (!this.options.title) {
      title.html("&#160;");
    } else {
      title.html(this.options.title);
    }
  }
}));

export function showDialog(options) {
  let dialogCommonOptions = {
    title: '<div class="widget-header"><span class="' +  (options.icon ? options.icon : '') + '"></span><span>' + options.header + '</span></div>',
    width: 300,
    maxHeight: 300,
    position: {
      my: 'center',
      at: 'center',
      of: window,
      collision: 'fit'
    },
    modal: true,
    close: function (e) {
      $(this).remove();
    }
  }

  let $dialog = $('<div></div>').dialog(_.extend(dialogCommonOptions, options));
  ReactDOM.render(options.content, $dialog[0])
};

export function showDialogError(header, message) {
  showDialog({
    header: header,
    icon: 'fa fa-fw fa-warning',
    classes: {
      "ui-dialog-title": "text-align-center ui-dialog-title txt-color-red"
    },
    content: <div><p>{message}</p></div>
  })
};

