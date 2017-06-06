import React from 'react'

import $script from 'scriptjs'


export default class SmartCKEditor extends React.Component {
  componentDidMount() {

    $script("https://cdn.ckeditor.com/4.5.11/standard/ckeditor.js", () => {
      const CKEDITOR = window['CKEDITOR'];

      this._editor = CKEDITOR.replace(this.props.container, this.props.options);

      let props = this.props;
      CKEDITOR.on('instanceReady', function (ev) {
        var editor = ev.editor;
        if (props.onChange) {
          editor.on("change", function (e) {
            props.onChange(editor);
          });
        }
        if (props.onClick) {
          editor.on("click", function (e) {
            props.onClick(editor);
          });
        }
        if (props.onBlur) {
          editor.on("blur", function (e) {
            props.onBlur(editor);
          });
        }
      });
    });
  }

  componentWillUnmount() {
    this._editor && this._editor.destroy();
  }

  render() {

    const {container, options, ...props} = {...this.props}
    return (
      <textarea style={{opacity: 0}} id={container} {...props} ref="editor"/>
    )
  }
}