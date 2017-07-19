import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/omnis_statuses.json'
import config from '../../../config/config.json'

export default class OmnisStatusesTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Omnis statuses" schema={_schema} breadcrumbs={['Translations', 'Omnis statuses']} identifier="omnisStatusesTable"/>
    )
  }
}