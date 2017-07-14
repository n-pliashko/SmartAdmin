import React from 'react'
import ReactDOM from 'react-dom'

import {Stats, BigBreadcrumbs, WidgetGrid, JarvisWidget}  from '../index'
import DialogModalButton from '../modal-dialog/DialogModalButton'

export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  convertDataParams(schema, array) {
    return array.reduce((obj, one) => {
      obj[one] = schema[one]
      return obj
    }, {})
  }

  componentDidMount() {
    System.import('script-loader!../../../assets/js/DataTables/datatables').then(() => {

      $.extend($.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control input-sm",
        "sLengthSelect": "form-control input-sm"
      });

      let schema = this.props.schema;
      let attributes = schema.schema;

      let columns = [];
      attributes.map((one, key) => {
        let cell = {
          data: one.name,
          searchable: true
        };
        if (one.class)
          cell.className = one.class;
        if (one.visible)
          cell.visible = one.visible;
        if (one.priority)
          cell.responsivePriority = one.priority;
        columns.push(cell);
      });

      console.log(localStorage.getItem('token'));

      let ajax_options = {
        url: schema.ajaxTable.url,
        type: schema.ajaxTable.method,
        contentType: 'application/json',
        processData: false,
        beforeSend: function (jqXHR, settings) {
          var data = settings.data;
          data.search.regex = true;
          settings.data = JSON.stringify(data);
        }
      }

      if (schema.ajaxTable.token) {
        ajax_options.headers = {
          "Authorization": localStorage.getItem('token')
        }
      }

      if (schema.ajaxTable.data) {
        ajax_options.data = _.extend(this.convertDataParams(schema, schema.ajaxTable.data), {lang: localStorage.getItem('lang')});
      }

      if (schema.getUrl.data) {
        schema.getUrl.data = this.convertDataParams(schema, schema.getUrl.data)
      }

      let createUrl = schema.createUrl,
        deleteUrl = schema.deleteUrl,
        getUrl = schema.getUrl,
        updateUrl = schema.updateUrl;

      ['deleteUrl', 'createUrl', 'getUrl', 'updateUrl'].map((name) => {
        if (schema[name].data) {
          eval(name).data = _.extend(this.convertDataParams(schema, schema[name].data), {lang: localStorage.getItem('lang')});
        }
      })

      let table_identifier = '#' + this.props.identifier;

      let options = {
        dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'Bl>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        oLanguage: {
          sSearch: "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
          sLengthMenu: "_MENU_"
        },
        autoWidth: false,
        stateSave: true,
        processing: true,
        serverSide: true,
        search: {
          regex: true
        },
        ajax: ajax_options,
        columns: columns,
        buttons: [
          {
            text: '<i class="fa fa-plus-circle"/> Add',
            titleAttr: 'Add new record',
            responsivePriority: 2,
            className: 'create-record-' + table_identifier
          },
          {
            text: '<i class="fa fa-refresh"/> Refresh',
            titleAttr: 'Refresh all data',
            className: 'btn-sm',
            responsivePriority: 3,
            action: function (e, dt, node, config) {
              this.ajax.reload(null, false);
            }
          },
          {
            extend: 'colvis',
            text: '<i class="fa fa-columns"/> Visibility',
            titleAttr: 'Choose visible column',
            className: 'btn-sm',
            columns: ':not(:last-child)',
            columnDefs: [{className: 'select-checkbox', targets: 0, visible: false, targets: 1}]
          },
          {
            extend: 'print',
            text: '<i class="fa fa-print"/> Print',
            titleAttr: 'Print all data on current page',
            autoPrint: false,
            exportOptions: {
              columns: ':not(:last-child)',
              modifier: {
                page: 'current'
              }
            }
          }
        ]
      };

      let button_columns = [{
        orderable: false,
        data: null,
        targets: -1,
        createdCell: function (cell, cellData) {
          let id = cellData[schema.pk];
          $(cell).parent('tr').attr('data-row-id', id);
          let button = <div className="btn-group">
            <DialogModalButton header="<h4>Editing</h4>" modal={true} edit={true} attributes={attributes} pk={id}
                               ajax={getUrl} saveAction={updateUrl} tableIdentifier={table_identifier}/>
            <DialogModalButton header="<h4><i class='fa fa-warning'/> Are you sure do you want to remove?</h4>"
                               modal={true} delete={true} pk={id} tableIdentifier={table_identifier}
                               ajax={deleteUrl}/>
          </div>;
          ReactDOM.render(button, cell);
        },
        responsivePriority: 1
      }];

      $.merge(options.columns, button_columns);
      if (this.props.options) {
        options = $.extend({}, this.props.options, options);
      }

      $(table_identifier).DataTable(options);

      let create_button = document.getElementsByClassName('create-record-' + table_identifier)[0];
      let temp = document.createElement("div");
      ReactDOM.render(<DialogModalButton header="<h4>Creating</h4>" modal={true} add={true} attributes={attributes}
                                         className="dt-button" saveAction={createUrl} title="Add"
                                         titleAttr="Add new record"
                                         tableIdentifier={table_identifier}/>,
        temp);
      temp.setAttribute('class', 'dt-buttons');
      create_button.replaceWith(temp);
    });
  }

  render() {
    let thead = this.props.schema.schema.map((one, key) => {
      let icon = '', thClass = '';
      if (one.icon) {
        let className = "txt-color-blue hidden-md hidden-sm hidden-xs " + one.icon;
        icon = <i className={className}/>;
      }
      let title = one.title;
      if (title == '') {
        title = one.name;
        thClass = 'text-capitalize';
      }
      return (
          <th key={key} className={thClass} data-hide="phone,tablet">{icon}{title}</th>
      );
    });

    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs items={this.props.breadcrumbs} icon="fa fa-fw fa-table"
                          className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
        </div>

        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget editbutton={false} color="blueDark">
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                  <h2> {this.props.title}</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <table id={this.props.identifier} className="table table-responsive table-striped table-bordered table-hover" width="100%">
                      <thead>
                      <tr>
                      {thead}
                        <th data-hide="phone,tablet"><i
                          className="fa fa-fw fa-cogs txt-color-blue hidden-md hidden-sm hidden-xs"/>
                        </th>
                      </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </JarvisWidget>
            </article>
          </div>
        </WidgetGrid>
      </div>
    );
  }
}