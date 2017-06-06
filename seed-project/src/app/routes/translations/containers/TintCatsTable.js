import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/tint_cats.json'

export default class TintCatsTable extends React.Component {

  render() {
    return (
      <Table title="Tint categories" schema={schema} breadcrumbs={['Translations', 'Tint categories']} identifier="tintCatsTable"/>
    )
  }
}