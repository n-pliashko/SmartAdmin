import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/tabs.json'
import config from '../../../config/config.json'

export default class TabsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Tabs" schema={_schema} breadcrumbs={['Translations', 'Tabs']} identifier="tabsTable"/>
    )
  }
}