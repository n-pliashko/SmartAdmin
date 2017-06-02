import React from 'react'

import Table from '../../../components/table-schema/Table'
import gettext_schema  from '../schema/gettexts.json'

require('../../../../assets/package/DataTables/datatables.min.css');

export default class GettextsTable extends React.Component {

  render() {
    return (
      <Table title="Gettexts" options={{}} schema={gettext_schema} breadcrumbs={['Translations', 'Gettexts']} identifier="gettextsTable"/>
    )
  }
}