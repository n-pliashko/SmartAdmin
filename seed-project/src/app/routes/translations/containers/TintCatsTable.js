import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/tint_cats.json'
import config from '../../../config/config.json'

export default class TintCatsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Tint categories" schema={_schema} breadcrumbs={['Translations', 'Tint categories']} identifier="tintCatsTable"/>
    )
  }
}