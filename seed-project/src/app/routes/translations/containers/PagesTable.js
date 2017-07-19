import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/pages.json'
import config from '../../../config/config.json'

export default class PagesTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Pages" schema={_schema} breadcrumbs={['Translations', 'Pages']} identifier="pagesTable"/>
    )
  }
}