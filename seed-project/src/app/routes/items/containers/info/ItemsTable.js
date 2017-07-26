import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';

import {BigBreadcrumbs, WidgetGrid, JarvisWidget}  from '../../../../components/index'
import DialogModalButton from '../../../../components/modal-dialog/DialogModalButton'
import { showDialogError } from '../../../../components/ui/uiDialog'
import ItemsDetailContainer from '../info/ItemsDetailContainer';

import schema  from './items_schema.json'
import config from '../../../../config/config.json'

export class ItemsTable extends React.Component {
  constructor (props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const _schema = Object.assign({}, config.items_info, schema);
    this.state = {
      search: '',
      table: null,
      schema: _schema,
      regex: true
    };
  }

  convertDataParams (schema, array_data) {
    return array_data.reduce((obj, one) => {
      obj[one] = schema[one]
      return obj
    }, {})
  }

  handleInputChange (event) {
    this.setState({
      regex: event.target.checked
    });

    if (this.state.table !== null) {
      let inputSearch = this.state.table.search();
      this.setState({
        search: inputSearch
      });
      this.state.table.search(inputSearch, event.target.checked).draw();
    }
  }

  componentDidMount () {
    System.import('script-loader!../../../../../assets/js/DataTables/datatables').then(() => {
      $.extend($.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control input-sm",
        "sLengthSelect": "form-control input-sm"
      });

     /* $.extend($.fn.dataTable.ext.order,  {
        "dom-text": function  ( settings, col ) {
          console.log(this.api().column( col, {order:'index'} ).context);
          return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
            return $(td).text();
          } );
        }
      });*/


      const schema = this.state.schema;

      let ajax_options = {
        url: schema.ajaxTable.url,
        type: schema.ajaxTable.method,
        contentType: 'application/json',
        processData: false,
        beforeSend: function (jqXHR, settings) {
          var data = settings.data;
          settings.data = JSON.stringify(data);
        },
        error: function (xhr, error, thrown) {
          let message = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : xhr.responseText;
          showDialogError('Loaded data error', message);
        }
      }

      if (schema.ajaxTable.token) {
        ajax_options.headers = {
          "Authorization": localStorage.getItem('token')
        }
      }

      if (schema.ajaxTable.data) {
        ajax_options.data = _.extend(this.convertDataParams(schema, schema.ajaxTable.data));
      }

      const getUrl = schema.getUrl;
      const table_identifier = '#itemsInfoTable';

      let buttons = [
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
          columns: ':lt(6)',
        },
        {
          extend: 'print',
          text: '<i class="fa fa-print"/> Print',
          titleAttr: 'Print all data on current page',
          autoPrint: false,
          exportOptions: {
            columns: ':not(:last-child):visible',
            modifier: {
              page: 'current'
            }
          }
        }
      ];

      let options = {
        dom: "<'dt-toolbar'<'col-xs-12 col-sm-6' f<'#regex-search-checkbox'>><'col-sm-6 col-xs-12 hidden-xs text-right'Bl>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        oLanguage: {
          sSearch: "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
          sLengthMenu: "_MENU_"
        },
        retrieve: true,
        autoWidth: false,
        serverSide: true,
        search: {
          regex: this.state.regex,
          smart: false
        },
        ajax: ajax_options,
        columns: [
          {
            data: '_id',
            visible: false
          },
          { data: '__service.created' },
          { data: '__service.updated' },
          { data: 'item_number' },
          {
            data:  function ( row, type, set, meta ) {
              let designers = row.group_designers.reduce( (obj, designer) => {
                obj.push(designer.designer_name);
                return obj;
              }, [row.designer_name])
              return _.uniq(designers, false).join(', ');
            },
            orderData: 6,
            searchable: false,
          },
          {
            orderable: false,
            searchable: false,
            createdCell: function (cell, cellData, rowData, row, col) {
              let color = 'green';

              if (cellData === 'DISCONTINUED') {
                color = 'red';
              }
              if (cellData === 'HIDDEN') {
                color = 'gray';
              }
              $(cell).css('color', color);
            },
            data:  function ( row, type, set, meta ) {
              let status = 'ACTIVE';

              if (row.options.filter((obj) => obj.status === 'DISCONTINUED').length === row.options.length) {
                status = 'DISCONTINUED';
              }
              if (row.options.filter((obj) => obj.price === 0).length === row.options.length) {
                status = 'HIDDEN';
              }
              return status;
            }
          },
          {
            data: 'designer_name',
            visible: false
          },
          {
            orderable: false,
            data: null,
            targets: -1,
            createdCell: function (cell, cellData) {
              let id = cellData[schema.pk];
              $(cell).parent('tr').attr('data-row-id', id);
              let button = <DialogModalButton header="<h4>Details</h4>"
                                              modal={true} pk={id} tableIdentifier={table_identifier}
                                              info={true} template={<ItemsDetailContainer/>}
                                              ajax={getUrl}/>
              ReactDOM.render(button, cell);
            },
            responsivePriority: 1
          }
        ],
        buttons: buttons,
        order: [[ 1, 'desc' ]]
      };

      let table = $(table_identifier).DataTable(options);

      ReactDOM.render(<label>
          <input id="regex-search" name="regex" type="checkbox" defaultChecked={this.state.regex}
                 onChange={this.handleInputChange}/>
          <label htmlFor="regex-search">FullText Search</label>
        </label>,
        document.getElementById('regex-search-checkbox'));

      this.setState({
        table: table,
      })
    });
  }

  render () {
    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs items={['Items', 'Information']} icon="fa fa-fw fa-table"
                          className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
        </div>

        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget editbutton={false} color="blueDark">
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                  <h2>Items</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <table id="itemsInfoTable"
                           className="table table-responsive table-striped table-bordered table-hover" width="100%">
                      <thead>
                      <tr>
                        <th data-hide="phone,tablet">ID</th>
                        <th data-hide="phone,tablet"><i
                          className="txt-color-blue hidden-md hidden-sm hidden-xs fa fa-fw fa-calendar"/>Created Date
                        </th>
                        <th data-hide="phone,tablet"><i
                          className="txt-color-blue hidden-md hidden-sm hidden-xs fa fa-fw fa-calendar"/>Updated Date
                        </th>
                        <th data-hide="phone,tablet">Item Number</th>
                        <th data-hide="phone,tablet">Designers Name</th>
                        <th data-hide="phone,tablet">Status</th>
                        <th data-hide="phone,tablet"></th>
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

function mapStateToProps(state) {
  return {
    language: state.language,
    routing: state.routing
  }
}

export default connect(mapStateToProps)(ItemsTable)