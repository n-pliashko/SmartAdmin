import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/designers.json'

export default class DesignerTable extends React.Component {
  render() {
    return (
      <Table title="Designers" options={{}} schema={schema} breadcrumbs={['Translations', 'Designers']} identifier="designersTable"/>
    )
  }
}