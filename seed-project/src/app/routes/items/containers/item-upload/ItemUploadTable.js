import React from 'react'
import ReactDOM from 'react-dom';

import {WidgetGrid, JarvisWidget}  from '../../../../components/index'
import DetailButton from '../../../../components/modal-dialog/DetailButton'
import Table from './Table'
import DialogModalButton from '../../../../components/modal-dialog/DialogModalButton'
import InfoContent from './InfoContent'

require('../../../../../assets/js/DataTables/datatables.min.css');

export default class ItemUpload extends React.Component {

  componentDidMount() {
    System.import('script-loader!../../../../../assets/js/DataTables/datatables').then(()=> {

      $.extend($.fn.dataTableExt.oStdClasses, {
        "sFilterInput": "form-control input-sm",
        "sLengthSelect": "form-control input-sm"
      });

      $('#itemUpload').DataTable( {
        dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs buttons-right'Bl>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        oLanguage: {
          sSearch: "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
          sLengthMenu: "_MENU_"
        },
        autoWidth: false,
        ajax: {
          url: 'http://ssv4/api/item_upload_info/',
          dataSrc: 'response',
        },
        columns: [
          {
            searchable: false,
            visible: false,
            className: 'none',
            orderable: false,
            data: null,
          },
          {data: "count"},
          {data: "date_updated"},
        ],
        responsive: {
          details: {
            renderer: function (api, rowIdx, columns) {
              let row = api.rows(rowIdx).data()[0];
              $.ajax({
                url: 'http://ssv4/api/item_upload_by_hour/',
                dataType: 'json',
                cache: false,
                method: 'GET',
                data: {date: decodeURI(row.date_updated)},
                success: function(data, textStatus, jqXHR) {
                  if (data.response) {
                    let rows = $.map(data.response, function (one, i) {
                      let button = React.createElement(DialogModalButton, {
                        header: 'Detail information about items',
                        modal: true,
                        info:true,
                        date: row.date_updated+ ' ' + one.hour_updated,
                        customButton: DetailButton,
                        url: 'http://ssv4/api/item_upload_detail/',
                        data_url: 'date',
                        template: InfoContent
                      });
                      return (
                        <tr key={i}>
                          <td>{one.count}</td>
                          <td>{one.hour_updated}</td>
                          <td>{button}</td>
                        </tr>
                      );
                    });
                    let thead = (
                      <tr>
                        <th data-hide="phone">Count</th>
                        <th data-class="expand">
                          <i className="fa fa-fw fa-clock-o text-muted hidden-md hidden-sm hidden-xs"/>Hour
                        </th>
                        <th></th>
                      </tr>
                    );
                    ReactDOM.render(<Table thead={thead} tbody={rows}/>, document.getElementById('itemUploadHour-' + rowIdx));
                  }
                },
                error: function (xhr, status, err) {
                  console.error('http://ssv4/api/item_upload_by_hour/', status, err.toString());
                }
              });

              return $('<div id="itemUploadHour-' + rowIdx + '"/>');
            },
          }
        },
        stateSave: true,
        buttons: [
          {
            text: '<i class="fa fa-refresh"/> Refresh',
            titleAttr: 'Refresh all data',
            className: 'btn-sm',
            action: function (e, dt, node, config) {
              this.ajax.reload(null, false);
            }
          }
        ],
        order: [[ 1, 'asc' ]]
      });
    });
  }

  render() {
    return (
      <div id="content">
        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget editbutton={false} sortable={false} color="blueDark">
                <header>
                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                  <h2>Item updates table </h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <table id="itemUpload" className="display collapsed table-responsive table-striped table-bordered" cellSpacing="0" width="100%">
                      <thead>
                      <tr>
                        <th></th>
                        <th data-hide="phone">Items count</th>
                        <th data-hide="phone,tablet"><i
                          className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"/>
                          Date
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



