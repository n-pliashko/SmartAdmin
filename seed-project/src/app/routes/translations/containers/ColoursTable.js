import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/colours.json'

export default class ColoursTable extends React.Component {

  render() {
    return (
      <Table title="Colours" schema={schema} breadcrumbs={['Translations', 'Colours']} identifier="coloursTable"/>
    )
  }
}