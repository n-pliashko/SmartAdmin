import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/payment_systems.json'

export default class PaymentSystemsTable extends React.Component {

  render() {
    return (
      <Table title="Payment systems" schema={schema} breadcrumbs={['Translations', 'Payment systems']} identifier="paymentSystemsTable"/>
    )
  }
}