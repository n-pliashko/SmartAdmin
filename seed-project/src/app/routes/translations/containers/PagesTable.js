import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/pages.json'

export default class PagesTable extends React.Component {

  render() {
    return (
      <Table title="Pages" schema={schema} breadcrumbs={['Translations', 'Pages']} identifier="pagesTable"/>
    )
  }
}