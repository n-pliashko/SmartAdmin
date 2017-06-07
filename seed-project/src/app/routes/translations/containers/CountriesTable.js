import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/countries.json'

export default class CountriesTable extends React.Component {

  render() {
    return (
      <Table title="Countries" schema={schema} breadcrumbs={['Translations', 'Countries']} identifier="countriesTable"/>
    )
  }
}