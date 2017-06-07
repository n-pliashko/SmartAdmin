import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/coatings.json'

export default class CoatingsTable extends React.Component {

  render() {
    return (
      <Table title="Coatings" schema={schema} breadcrumbs={['Translations', 'Coatings']} identifier="coatingsTable"/>
    )
  }
}