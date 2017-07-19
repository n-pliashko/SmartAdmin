import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/presc_use.json'
import config from '../../../config/config.json'

export default class PrescriptionUsedTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Prescription used" schema={_schema} breadcrumbs={['Translations', 'Prescription used']} identifier="prescUseTable"/>
    )
  }
}