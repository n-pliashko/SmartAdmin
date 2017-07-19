import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/tints.json'
import config from '../../../config/config.json'

export default class TintsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Tints" schema={_schema} breadcrumbs={['Translations', 'Tints']} identifier="tintsTable"/>
    )
  }
}