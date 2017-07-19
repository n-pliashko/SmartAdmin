import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/page_cats.json'
import config from '../../../config/config.json'

export default class PageCatsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Page categories" schema={_schema} breadcrumbs={['Translations', 'Page categories']} identifier="pageCatsTable"/>
    )
  }
}