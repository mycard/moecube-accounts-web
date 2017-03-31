import { Button } from 'antd';
import { connect } from 'dva';
import React from 'react';

class Active extends React.Component {

  handleClick = () => {
    const { dispatch, location: { query: { key } } } = this.props;

    dispatch({ type: 'auth/activate', payload: { key } });
  };

  render() {
    const { loading } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
        <Button type="primary" icon="poweroff" loading={loading} onClick={this.handleClick}>
          激活
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
  } = state;

  const loading = state.loading.global || false

  return {
    loading,
  };
}

export default connect(mapStateToProps)(Active);
