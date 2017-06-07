import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/presc_use.json'

export default class PrescriptionUsedTable extends React.Component {

  render() {
    return (
      <Table title="Prescription used" schema={schema} breadcrumbs={['Translations', 'Prescription used']} identifier="prescUseTable"/>
    )
  }
}