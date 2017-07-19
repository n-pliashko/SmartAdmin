import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/payment_systems.json'
import config from '../../../config/config.json'

export default class PaymentSystemsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Payment systems" schema={_schema} breadcrumbs={['Translations', 'Payment systems']} identifier="paymentSystemsTable"/>
    )
  }
}