import { Button } from 'antd';
import React from 'react';
import styles from './SubmitButton.css';

function SubmitButton(props) {
  return (
    <div className={styles.wrapSubmit}>
      <Button type="primary" htmlType="submit" size="large" {...props} >提交</Button>
    </div>
  );
}

export default SubmitButton;
