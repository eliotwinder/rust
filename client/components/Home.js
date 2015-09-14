var React = require('react');

var Home = React.createClass({
  componentDidMount: function() {
    this.loadComments()  
  },
  
  loadComments: function(searchObject){

    var query = {};
    // always search by host
    query.url = 'develiot.com/'

    $.ajax({
      url: 'http://localhost:3000/api/comments/url',
      data: query,
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log('received comments:', data);
        console.log('received userInfo:', data.userInfo);
        // this.pendingAjax = false;
        
        // var updatedComments; 
        // if (this.lastCommentId === -1) {  
        //   updatedComments = data.comments;
        // } else {
        //   updatedComments = this.state.comments.concat(data.comments);
        // }

        // // add new comments so we render the page
        // if (data.comments.length < 25) {
        //   // TODO: when do we need to reset this to true?
        //   this.hasMoreComments = false;
        //   this.lastCommentId = 0;
        // } else {
        //   this.lastCommentId = data.comments[data.comments.length - 1].id;
        // }
        // this.count = data.numComments;
        // this.setState({comments: updatedComments});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(xhr, status, err.message);
      }
    });
  },

  render: function() {
    // TODO: build out actual landing page
    return (
      <h2 className="text-center">
        Home Landing Page
      </h2>
    );
  }
});

module.exports = Home;