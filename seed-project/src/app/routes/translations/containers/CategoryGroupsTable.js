import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/category_groups.json'

export default class CategoryGroupsTable extends React.Component {

  render() {
    return (
      <Table title="Category groups" schema={schema} breadcrumbs={['Translations', 'Category groups']} identifier="categoryGroupsTable"/>
    )
  }
}