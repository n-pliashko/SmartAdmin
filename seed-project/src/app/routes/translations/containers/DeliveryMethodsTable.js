import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/delivery_methods.json'
import config from '../../../config/config.json'

export default class DeliveryMethodsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Delivery methods" schema={_schema} breadcrumbs={['Translations', 'Delivery methods']} identifier="deliveryMethodsTable"/>
    )
  }
}