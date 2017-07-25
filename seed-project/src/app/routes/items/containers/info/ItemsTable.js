import React from 'react'

import Table from '../../../../components/table-schema/Table'
import ItemsDetailContainer from '../info/ItemsDetailContainer';

import schema  from './items_schema.json'
import config from '../../../../config/config.json'

export default class ItemsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.items_info, schema);
    return (
      <Table title="Items" schema={_schema} breadcrumbs={['Items', 'Information']} identifier="itemsInfoTable" infoTemplate={<ItemsDetailContainer/>}/>
    )
  }
}