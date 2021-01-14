import React from 'react';
import styles from './ContextMenu.module.css';
import {DeleteOutlined} from '@ant-design/icons';

const ContextMenu = props => {
  return (
    <div
      className={`${styles.context_menu} ${props.className === 'visible' ? styles.visible : styles.hidden}`}
      style={{left: props.screenX, top: props.screenY}}
    >
      <ul>
        {/*<li><i><EditOutlined/></i> <span>Rename</span></li>*/}
        {/*<li><i><ShareAltOutlined/></i> <span>Share</span></li>*/}
        <li onClick={() => props.onRemove(props.noteID)}><i><DeleteOutlined/></i> <span>Delete</span></li>
      </ul>
    </div>
  );
};

export default ContextMenu;