import { Button } from 'antd';
import React from 'react';
import styles from './SubmitButton.css';

function SubmitButton() {
  return (
    <div className={styles.wrapSubmit}>
      <Button type="primary" htmlType="submit" size="large">提交</Button>
    </div>
  );
}

export default SubmitButton;
