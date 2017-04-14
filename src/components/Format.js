import React from 'react';
import { connect } from 'react-redux';


class Format extends React.Component {

  render() {
    const { id, messages } = this.props

    return (
      <span>{messages[id] || id}</span>
    );
  }
}


function mapStateToProps(state) {
  const {
    common: { messages },
  } = state;
  return {
    messages,
  };
}


export default connect(mapStateToProps)(Format);

