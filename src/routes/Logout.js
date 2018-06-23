import { connect } from 'dva';
import React from 'react';

class Logout extends React.Component {
  componentDidMount() {
    window.localStorage.removeItem('token');
    const url = new URL(window.location.href);
    const redirect = url.searchParams.get('redirect') || '/';
    window.location.href = redirect;
  }

  render() {
    return null;
  }
}


function mapStateToProps(state) {
  const loading = state.loading.global || false;
  return {
    loading,
  };
}

export default connect(mapStateToProps)(Logout);
