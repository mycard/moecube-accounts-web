import React from 'react';
import { connect } from 'dva';
import styles from './Profiles.css';

function Profiles({ dispatch, text }) {
  return (
    <div className={styles.normal} onClick={() => dispatch({type: 'haha/change', payload: {  text: Math.random() }})}>
      Route Component: {text}
    </div>
  );
}

function mapStateToProps(state) {
  const {
    haha: {text}
  } = state
  return {
    text
  };
}

export default connect(mapStateToProps)(Profiles);
