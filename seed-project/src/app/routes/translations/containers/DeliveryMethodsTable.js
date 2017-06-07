import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/delivery_methods.json'

export default class DeliveryMethodsTable extends React.Component {

  render() {
    return (
      <Table title="Delivery methods" schema={schema} breadcrumbs={['Translations', 'Delivery methods']} identifier="deliveryMethodsTable"/>
    )
  }
}