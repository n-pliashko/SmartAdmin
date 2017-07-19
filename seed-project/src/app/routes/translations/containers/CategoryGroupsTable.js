import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/category_groups.json'
import config from '../../../config/config.json'

export default class CategoryGroupsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Category groups" schema={_schema} breadcrumbs={['Translations', 'Category groups']} identifier="categoryGroupsTable"/>
    )
  }
}