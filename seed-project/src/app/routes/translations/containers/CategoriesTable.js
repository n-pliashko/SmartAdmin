import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/cats.json'
import config from '../../../config/config.json'


export default class CategoriesTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Categories" schema={_schema} breadcrumbs={['Translations', 'Categories']} identifier="catsTable"/>
    )
  }
}