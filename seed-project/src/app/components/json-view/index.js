import React from 'react';
import ('../../../assets/js/jsonView/jquery.jsonview.min.css');

export default class JsonView extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    System.import('script-loader!../../../assets/js/jsonView/jquery.jsonview.min').then(() => {
      $('#json-' + this.props.identifier).JSONView(this.props.json, {collapsed: true});
    });
  }

  render () {
    return (
      <div>
        <div id={'json-' + this.props.identifier}></div>
      </div>
    );
  }
}
