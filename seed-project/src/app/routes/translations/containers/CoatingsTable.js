import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/coatings.json'
import config from '../../../config/config.json'

export default class CoatingsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Coatings" schema={_schema} breadcrumbs={['Translations', 'Coatings']} identifier="coatingsTable"/>
    )
  }
}