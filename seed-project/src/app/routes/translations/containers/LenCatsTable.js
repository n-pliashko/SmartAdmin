import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/len_cats.json'
import config from '../../../config/config.json'

export default class LenCatsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Lens category" schema={_schema} breadcrumbs={['Translations', 'Lens category']} identifier="tintCatsTable"/>
    )
  }
}