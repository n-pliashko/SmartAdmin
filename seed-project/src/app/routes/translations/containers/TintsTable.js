import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/tints.json'

export default class TintsTable extends React.Component {

  render() {
    return (
      <Table title="Tints" schema={schema} breadcrumbs={['Translations', 'Tints']} identifier="tintsTable"/>
    )
  }
}