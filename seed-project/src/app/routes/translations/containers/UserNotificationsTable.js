import React from 'react'

import Table from '../../../components/table-schema/Table'
import schema  from '../schema/user_notifications_msg.json'

export default class UserNotificationsTable extends React.Component {

  render() {
    return (
      <Table title="User notifications" schema={schema} breadcrumbs={['Translations', 'User notifications']} identifier="tintsTable"/>
    )
  }
}