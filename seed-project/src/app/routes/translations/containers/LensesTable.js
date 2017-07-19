import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/lenses.json'
import config from '../../../config/config.json'

export default class LensesTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Lenses" schema={_schema} breadcrumbs={['Translations', 'Lenses']} identifier="lensesTable"/>
    )
  }
}