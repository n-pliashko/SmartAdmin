import React from 'react'

import Table from '../../../components/table-schema/Table'

import schema  from '../schema/gettexts.json'
import config from '../../../config/config.json'

export default class GettextsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Gettexts" schema={_schema} breadcrumbs={['Translations', 'Gettexts']} identifier="gettextsTable"/>
    )
  }
}