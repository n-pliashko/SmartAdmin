import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/user_notifications_msg.json'
import config from '../../../config/config.json'

export default class UserNotificationsTable extends React.Component {

  render() {
    const _schema = Object.assign({}, config.gettext, schema);
    return (
      <Table title="User notifications" schema={_schema} breadcrumbs={['Translations', 'User notifications']} identifier="tintsTable"/>
    )
  }
}