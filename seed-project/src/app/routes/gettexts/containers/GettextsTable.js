import React from 'react'
import ReactDOM from 'react-dom'

import {WidgetGrid, JarvisWidget}  from '../../../components'
import DialogModalButton from '../../../components/modal-dialog/DialogModalButton'

require('../../../../assets/package/DataTables/datatables.min.css');

export default class GettextsTable extends React.Component {

  componentDidMount() {
    System.import('script-loader!../../../../assets/package/DataTables/datatables').then(() => {


      function createdCellAttributes(td, name, type, className = '', visible = true, readonly = true) {
        $(td).attr('data-name', name);
        $(td).attr('data-type', type);
        $(td).attr('data-visibility', visible);
        $(td).attr('data-readonly', readonly);
        $(td).attr('data-input', name);
        $(td).attr('data-class', className);
      }

      $.extend($.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control input-sm",
        "sLengthSelect": "form-control input-sm"
      });

      $('#gettextsTable').DataTable({
        dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'Bl>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        oLanguage: {
          sSearch: "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
          sLengthMenu: "_MENU_"
        },
        autoWidth: false,
        responsive: true,
        ajax: 'assets/api/tables/datatables.standard.json',
        columns: [
          {
            data: "id",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'id', 'hidden');
            },
            responsivePriority: 2
          },
          {
            data: "name",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'name', 'text');
            },
            responsivePriority: 3
          },
          {
            data: "phone",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'phone', 'phone');
            },
            responsivePriority: 6
          },
          {
            data: "company",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'company', 'text');
            },
            responsivePriority: 5
          },
          {
            data: "zip",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'zip', 'text');
            },

            responsivePriority: 10
          },
          {
            data: "city",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'city', 'text');
            },
            responsivePriority: 4
          },
          {
            data: "date",
            createdCell: function (cell) {
              createdCellAttributes(cell, 'date', 'date', 'datepicker');
            },
            responsivePriority: 8
          },
          {
            orderable: false,
            data: null,
            createdCell: function (cell, cellData) {
              $(cell).parent('tr').attr('data-row-id', cellData.id);
              let data = [];
              _.each($(cell).parent().find('td'), function (field) {
                let dataset = field.dataset;
                if (!$.isEmptyObject(dataset)) {
                  data.push(dataset);
                }
              });
              let button = <div className="btn-group">
                <DialogModalButton header="<h4>Editing</h4>" modal={true} edit={true} attributes={data} id={cellData.id}
                                   url="assets/api/tables/datatables.standard.json" data_url="id"/>
                <DialogModalButton header="<h4><i class='fa fa-warning'/> Are you sure do you want to remove?</h4>"
                                   modal={true} delete={true} id={cellData.id} table={this}
                                   url="" data_url="id"/>
              </div>;
              ReactDOM.render(button, cell);
            },
            responsivePriority: 1
          },
        ],
        stateSave: true,
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
        ],
        drawCallback: function( settings ) {
          /*let api = this.api();
          api.columns.adjust();
          api.tables({ api: true }).buttons.resize();*/
        }
      });
    });
  }

  render() {
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget editbutton={false} color="blueDark">
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                  <h2>Gettexts table </h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <table id="gettextsTable" className="table table-responsive table-striped table-bordered table-hover" width="100%">
                    <thead>
                    <tr>
                      <th data-hide="phone">ID</th>
                      <th data-class="expand"><i
                        className="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs"/>
                        Name
                      </th>
                      <th data-hide="phone"><i
                        className="fa fa-fw fa-phone text-muted hidden-md hidden-sm hidden-xs"/>
                        Phone
                      </th>
                      <th>Company</th>
                      <th data-hide="phone,tablet"><i
                        className="fa fa-fw fa-map-marker txt-color-blue hidden-md hidden-sm hidden-xs"/>
                        Zip
                      </th>
                      <th data-hide="phone,tablet">City</th>
                      <th data-hide="phone,tablet"><i
                        className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
                        Date
                      </th>
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
    )
  }
}
