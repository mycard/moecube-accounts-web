import React from 'react';
import styles from './SubmitButton.css';
import {Button} from 'antd'

function SubmitButton() {
  return (
      <div className={styles.wrapSubmit}>
        <Button type="primary" htmlType="submit" size="large">提交</Button>                  
      </div>
  );
}

export default SubmitButton;
