import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/page_cats.json'

export default class PageCatsTable extends React.Component {

  render() {
    return (
      <Table title="Page categories" schema={schema} breadcrumbs={['Translations', 'Page categories']} identifier="pageCatsTable"/>
    )
  }
}