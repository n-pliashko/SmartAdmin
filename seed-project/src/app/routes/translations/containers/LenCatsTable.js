import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/len_cats.json'

export default class LenCatsTable extends React.Component {

  render() {
    return (
      <Table title="Lens category" schema={schema} breadcrumbs={['Translations', 'Lens category']} identifier="tintCatsTable"/>
    )
  }
}