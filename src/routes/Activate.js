import { Button } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { FormattedMessage as Format } from 'react-intl';

class Active extends React.Component {

  handleClick = () => {
    const { dispatch, location: { query: { key } } } = this.props;

    dispatch({ type: 'auth/activate', payload: { key } });
  };

  render() {
    const { activateState } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
        <Button type="primary" icon="poweroff" loading={activateState} onClick={this.handleClick}>
          <Format id={'verify email'} />
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: { activateState },
  } = state;
  return {
    activateState,
  };
}

export default connect(mapStateToProps)(Active);
