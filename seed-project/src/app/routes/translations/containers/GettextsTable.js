import React from 'react'

import Table from '../../../components/table-schema/Table'
//import schema  from '../schema/gettexts.json'
import schema  from '../schema/test.json'


export default class GettextsTable extends React.Component {

  render() {
    return (
      <Table title="Gettexts" schema={schema} breadcrumbs={['Translations', 'Gettexts']} identifier="gettextsTable"/>
    )
  }
}