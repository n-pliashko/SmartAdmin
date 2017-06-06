import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/cats.json'

export default class CategoriesTable extends React.Component {

  render() {
    return (
      <Table title="Categories" schema={schema} breadcrumbs={['Translations', 'Categories']} identifier="catsTable"/>
    )
  }
}