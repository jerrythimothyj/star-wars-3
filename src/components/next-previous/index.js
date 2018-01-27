import React, { Component } from 'react';

class NextPrevious extends Component {
  render() {
    const {
      previousAllowed, nextAllowed, page, navToPage,
    } = this.props;
    return (
      <div className="text-center">
        { previousAllowed &&
        <span
          role="button"
          tabIndex="0"
          className="next-previous"
          onClick={() => navToPage(page - 1)}
          onKeyDown={this.handleKeyDown}
        ><img src="./images/previous.png" alt="" />
        </span> }
        { nextAllowed &&
        <span
          role="button"
          tabIndex="0"
          className="next-previous"
          onClick={() => navToPage(page + 1)}
          onKeyDown={this.handleKeyDown}
        ><img src="./images/next.png" alt="" />
        </span> }
      </div>
    );
  }
}

export default NextPrevious;
