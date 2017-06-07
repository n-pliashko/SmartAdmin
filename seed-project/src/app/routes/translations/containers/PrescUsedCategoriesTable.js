import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/presc_use_cats.json'

export default class PrescUsedCategoriesTable extends React.Component {

  render() {
    return (
      <Table title="Prescription used categories" schema={schema} breadcrumbs={['Translations', 'Prescription used categories']} identifier="prescUseCatsTable"/>
    )
  }
}