import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/frames.json'

export default class FramesTable extends React.Component {

  render() {
    return (
      <Table title="Frames" schema={schema} breadcrumbs={['Translations', 'Frames']} identifier="framesTable"/>
    )
  }
}