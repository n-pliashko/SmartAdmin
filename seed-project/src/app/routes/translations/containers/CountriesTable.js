import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/countries.json'
import config from '../../../config/config.json'

export default class CountriesTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Countries" schema={_schema} breadcrumbs={['Translations', 'Countries']} identifier="countriesTable"/>
    )
  }
}