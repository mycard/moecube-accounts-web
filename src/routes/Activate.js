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
    const { loading } = this.props;
    const email = this.props.location.query.email;
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ width: '60%', background: 'rgba(230,230,230,0.8)', padding: '40px', flexDirection: 'column', justifyContent: 'center', display: 'flex', alignItems: 'center', zIndex: 1 }}>
          <h2><Format id="Your-are-almost-done!" /></h2>
          <br /><br />
          <p><Format id="Thank-you!-This-is-the-last-step." /></p>
          <p><Format id="Please click the following button to confirm your email address" />: {email}</p>
          <br /><br />
          <Button type="primary" icon="poweroff" loading={loading} onClick={this.handleClick}>
            <Format id={'Finish-Verification'} />
          </Button>
          <br /><br />
          <p><Format id="After-verification,-you-can-sign-in-to-MoeCube-with-this-email-address." /></p>
          <p><Format id="Welcome-to-MoeCube!" /></p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loading = state.loading.global || false;
  return {
    loading,
  };
}
export default connect(mapStateToProps)(Active);
