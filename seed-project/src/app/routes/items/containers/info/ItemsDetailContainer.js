import React from 'react';
import JsonView from '../../../../components/json-view'

export default class ItemsDetailContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, tableIdentifier} = this.props;
    return (<JsonView json={data} identifier={tableIdentifier.replace(/^#/, '')} />);
  }
}