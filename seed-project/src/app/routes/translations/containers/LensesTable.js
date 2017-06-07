import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/lenses.json'

export default class LensesTable extends React.Component {

  render() {
    return (
      <Table title="Lenses" schema={schema} breadcrumbs={['Translations', 'Lenses']} identifier="lensesTable"/>
    )
  }
}