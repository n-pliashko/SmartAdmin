import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/frames.json'
import config from '../../../config/config.json'

export default class FramesTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="Frames" schema={_schema} breadcrumbs={['Translations', 'Frames']} identifier="framesTable"/>
    )
  }
}