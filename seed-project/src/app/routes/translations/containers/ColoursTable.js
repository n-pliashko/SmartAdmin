import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/colours.json'
import config from '../../../config/config.json'

export default class ColoursTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Colours" schema={_schema} breadcrumbs={['Translations', 'Colours']} identifier="coloursTable"/>
    )
  }
}