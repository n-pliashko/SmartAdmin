import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/tabs.json'

export default class TabsTable extends React.Component {

  render() {
    return (
      <Table title="Tabs" schema={schema} breadcrumbs={['Translations', 'Tabs']} identifier="tabsTable"/>
    )
  }
}