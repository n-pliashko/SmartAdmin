import React from 'react'
import ReactDOM from 'react-dom'

import {Stats, BigBreadcrumbs, WidgetGrid, JarvisWidget}  from '../index'
import DialogModalButton from '../modal-dialog/DialogModalButton'

export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    System.import('script-loader!../../../assets/package/DataTables/datatables').then(() => {

      $.extend($.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control input-sm",
        "sLengthSelect": "form-control input-sm"
      });

      let attributes = this.props.schema;

      let columns = [];
      attributes.map((one, key) => {
        let cell = {data: one.name};
        if (one.class)
          cell.className = one.class;
        if (one.visible)
          cell.visible = one.visible;
        if (one.priority)
          cell.responsivePriority = one.priority;
        columns.push(cell);
      });


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
        ajax: 'assets/api/tables/datatables.standard.json',
        columns: columns,
        buttons: [
          {
            text: '<i class="fa fa-refresh"/> Refresh',
            titleAttr: 'Refresh all data',
            className: 'btn-sm',
            responsivePriority: 2,
            action: function ( e, dt, node, config ) {
              this.ajax.reload(null, false);
            }
          },
          {
            extend: 'colvis',
            text: '<i class="fa fa-columns"/> Visibility',
            titleAttr: 'Choose visible column',
            className: 'btn-sm',
            columns: ':not(:last-child)',
            columnDefs: [ {className: 'select-checkbox',targets:   0}]
          }
        ]
      };

      let button_columns = [{
        orderable: false,
        data: null,
        targets: -1,
        createdCell: function (cell, cellData) {
          $(cell).parent('tr').attr('data-row-id', cellData.id);
          let button = <div className="btn-group">
            <DialogModalButton header="<h4>Editing</h4>" modal={true} edit={true} attributes={attributes} id={cellData.id}
                               url="assets/api/tables/datatables.standard.json" data_url="id"/>
            <DialogModalButton header="<h4><i class='fa fa-warning'/> Are you sure do you want to remove?</h4>"
                               modal={true} delete={true} id={cellData.id} table={this}
                               url="" data_url="id"/>
          </div>;
          ReactDOM.render(button, cell);
        },
        responsivePriority: 1
      }];

      $.merge(options.columns, button_columns);
      options = $.extend({}, this.props.options, options);
      $('#' + this.props.identifier).DataTable(options);
    });
  }

  render() {
    let thead = this.props.schema.map((one, key) => {
      let icon = '';
      if (one.icon) {
        let className = "txt-color-blue hidden-md hidden-sm hidden-xs " + one.icon;
        icon = <i className={className}/>;
      }
      return (
          <th key={key} data-hide="phone,tablet">{icon}{one.title}</th>
      );
    });

    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs items={this.props.breadcrumbs} icon="fa fa-fw fa-table"
                          className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
          <Stats />
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