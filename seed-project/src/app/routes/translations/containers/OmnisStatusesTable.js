import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/omnis_statuses.json'

export default class OmnisStatusesTable extends React.Component {

  render() {
    return (
      <Table title="Omnis statuses" schema={schema} breadcrumbs={['Translations', 'Omnis statuses']} identifier="omnisStatusesTable"/>
    )
  }
}