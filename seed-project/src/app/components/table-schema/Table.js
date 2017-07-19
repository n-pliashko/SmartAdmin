import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';

import {Stats, BigBreadcrumbs, WidgetGrid, JarvisWidget}  from '../index'
import DialogModalButton from '../modal-dialog/DialogModalButton'
import { showDialogError } from '../ui/uiDialog'

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const {language} = this.props;
    this.state = {
      lang: language.language.key,
      table: null,
      schema: this.props.schema,
      regex: true
    };
  }

  convertDataParams(schema, array_data) {
    return array_data.reduce((obj, one) => {
      obj[one] = schema[one]
      return obj
    }, {})
  }

  handleInputChange(event) {
    this.setState({
      regex: event.target.checked
    });

    if (this.state.table !== null) {
      let inputSearch = this.state.table.search();
      this.state.table.search(inputSearch, event.target.checked).draw();
    }
  }

  initDatatble(lang) {
    const schema = this.state.schema;
    const attributes = schema.schema;

    let columns = [];
    attributes.map((one, key) => {
      let cell = {
        data: one.name,
        searchable: true
      };
      if (one.class !== 'undefined')
        cell.className = one.class;
      if (one.visible !== 'undefined')
        cell.visible = one.visible;
      if (one.priority !== 'undefined')
        cell.responsivePriority = one.priority;
      columns.push(cell);
    });

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
      ajax_options.data = _.extend(this.convertDataParams(schema, schema.ajaxTable.data), {lang: lang});
    }

    let createUrl, deleteUrl, getUrl, updateUrl;

    ['deleteUrl', 'createUrl', 'getUrl', 'updateUrl'].forEach((name) => {
      eval(name + ' = ' + JSON.stringify(schema[name]));
      if (schema[name].data !== undefined) {
        [name].data = _.extend(this.convertDataParams(schema, schema[name].data), {lang: lang});
      }
    })

    const table_identifier = '#' + this.props.identifier;

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
      stateSave: true,
      processing: true,
      serverSide: true,
      search: {
        regex: this.state.regex,
        smart: false
      },
      columnDefs: [
        {visible: false, targets: 0}
      ],
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

    let table = $(table_identifier).DataTable(options);

    table.column(0).visible(false); //invisible ID column

    ReactDOM.render(<label>
        <input id="regex-search" name="regex" type="checkbox" defaultChecked={this.state.regex} onChange={this.handleInputChange}/>
        <label htmlFor="regex-search">FullText Search</label>
      </label>,
      document.getElementById('regex-search-checkbox'));

    let create_button = document.getElementsByClassName('create-record-' + table_identifier)[0];
    let temp = document.createElement("div");
    ReactDOM.render(<DialogModalButton header="<h4>Creating</h4>" modal={true} add={true} attributes={attributes}
                                       className="dt-button" saveAction={createUrl} title="Add"
                                       titleAttr="Add new record"
                                       tableIdentifier={table_identifier}/>,
      temp);
    temp.setAttribute('class', 'dt-buttons');
    create_button.replaceWith(temp);


    this.setState({
      table: table,
      lang: lang
    })
  }

  componentDidMount() {
    System.import('script-loader!../../../assets/js/DataTables/datatables').then(() => {
      $.extend($.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control input-sm",
        "sLengthSelect": "form-control input-sm"
      });

      const {language} = this.props;
      const lang = language.language.key;
      this.initDatatble(lang);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { language } = nextProps;
    let result = false;
    if (language.language.key !== nextState.lang) {
      result = true;
      if (nextState.table !== null) {
        nextState.table.destroy();
      }
      this.initDatatble(language.language.key);
    }
    return result;
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

function mapStateToProps(state) {
  return {
    language: state.language
  }
}
export default connect(mapStateToProps)(Table)