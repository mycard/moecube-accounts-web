import { Button } from 'antd';
import React from 'react';
// import { FormattedMessage as Format } from 'react-intl';
import styles from './SubmitButton.css';
import Format from '../components/Format'

function SubmitButton(props) {
  return (
    <div className={styles.wrapSubmit}>
      <Button type="primary" htmlType="submit" size="large" {...props} ><Format id="save"/></Button>
    </div>
  );
}

export default SubmitButton;
