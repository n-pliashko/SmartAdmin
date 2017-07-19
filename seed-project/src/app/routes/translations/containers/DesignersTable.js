import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/designers.json'
import config from '../../../config/config.json'

export default class DesignerTable extends React.Component {
  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Designers" options={_schema} schema={_schema} breadcrumbs={['Translations', 'Designers']} identifier="designersTable"/>
    )
  }
}