import React from 'react';
const config = require('../../../../config/config.json')

require('../../../../../assets/css/dropzone.css');

export default class ImagesContainer extends React.Component {

  componentDidMount() {
    System.import('script-loader!../../../../../assets/js/dropzone.js').then(() => {

      let self = this;
      let previewNode = document.getElementById("template");
      let previewTemplate = previewNode.parentNode.innerHTML;
      previewNode.parentNode.removeChild(previewNode);

      let dropzone = new Dropzone(document.getElementById('content'), {
        url: config.imageLoadUrl,
        params: {upload: 1},
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        autoQueue: false,
        previewsContainer: "#previews",
        dictRemoveFileConfirmation: 'Are you sure?',
        clickable: ".fileinput-button",
        totaluploadprogress: function(progress) {
          self.totalUploadProgress(progress);
        },
        sending: function(file) {
          self.sending(file);
        },
        queuecomplete: function(progress) {
          self.queueComplete(progress);
        },
        removedfile: function(file) {
          dropzone.options.params.upload = 0
          dropzone.uploadFile(file)
          let ref;
          if (file.previewElement) {
            if ((ref = file.previewElement) != null) {
              ref.parentNode.removeChild(file.previewElement);
            }
          }
          dropzone.options.params.upload = 1
          return dropzone._updateMaxFilesReachedClass();
        }
      })

      dropzone.on("addedfile", function(file) {
        file.previewElement.querySelector(".start").onclick = function () {
          dropzone.enqueueFile(file);
        };
      });

      this.setState({
        dropzone: dropzone
      });
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      startProgress: false,
      dropzone: null,
      style: {
        opacity: '0'
      },
      disabled: false
    };

    this.totalUploadProgress = this.totalUploadProgress.bind(this)
    this.sending = this.sending.bind(this)
    this.startLoad = this.startLoad.bind(this)
    this.cancelLoad = this.cancelLoad.bind(this)
    this.queueComplete = this.queueComplete.bind(this)
  }

  totalUploadProgress(progress) {
    this.setState({
      progress: progress + '%'
    });
  }

  sending(file) {
    file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
    this.setState({
      style: {
        opacity: "1"
      },
      startProgress: true
    });
  }

  startLoad(event) {
    this.setState({
      disabled: true
    });
    this.state.dropzone.enqueueFiles(this.state.dropzone.getFilesWithStatus(Dropzone.ADDED));
  }

  cancelLoad(event) {
    this.state.dropzone.removeAllFiles(true);
  }

  queueComplete(progress) {
    this.setState({
      style: {
        opacity: "0"
      },
      startProgress: false
    });
  }

  render() {
    return (
      <div id="content">
        <div id="actions" className="row">
          <div className="col-lg-7">
            <span className="btn btn-success fileinput-button dz-clickable">
            <i className="glyphicon glyphicon-plus"></i>
            <span>Add files...</span>
        </span>
            <button type="submit" className="btn btn-primary start" onClick={this.startLoad}>
              <i className="glyphicon glyphicon-upload"></i>
              <span>Start upload</span>
            </button>
            <button type="reset" className="btn btn-warning cancel" onClick={this.cancelLoad}>
              <i className="glyphicon glyphicon-ban-circle"></i>
              <span>Cancel upload</span>
            </button>
          </div>
          <div className="col-lg-5">
            <span className="fileupload-process">
              {this.state.startProgress ? parseInt(this.state.progress) + '%' : ''}
          <div id="total-progress" className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style={this.state.style}>
            <div className="progress-bar progress-bar-success" style={{width: this.state.progress}} data-dz-uploadprogress=""></div>
          </div>
        </span>
          </div>
        </div>

        <div className="table table-striped files" id="previews">
          <div id="template" className="file-row">
            <div>
              <span className="preview"><img data-dz-thumbnail/></span>
            </div>
            <div>
              <p className="name" data-dz-name></p>
              <strong className="error text-danger" data-dz-errormessage></strong>
            </div>
            <div>
              <p className="size" data-dz-size></p>
              <div className="progress progress-striped active" role="progressbar" aria-valuemin="0"
                   aria-valuemax="100" aria-valuenow="0">
                <div className="progress-bar progress-bar-success" style={{width: '0%'}}
                     data-dz-uploadprogress></div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary start">
                <i className="glyphicon glyphicon-upload"></i>
                <span>Start</span>
              </button>
              <button data-dz-remove className="btn btn-warning cancel">
                <i className="glyphicon glyphicon-ban-circle"></i>
                <span>Cancel</span>
              </button>
              <button data-dz-remove className="btn btn-danger delete">
                <i className="glyphicon glyphicon-trash"></i>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}