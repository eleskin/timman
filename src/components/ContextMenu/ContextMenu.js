import React from 'react';
import styles from './ContextMenu.module.css';
import {DeleteOutlined} from '@ant-design/icons';
import notesActions from '../../utils/notes/notesActions';
import {connect} from 'react-redux';

const ContextMenu = props => {
  const handleRemove = (event, id) => {
    props.remove(id);
  };

  return (
    <div
      className={`${styles.context_menu} ${props.className === 'visible' ? styles.visible : styles.hidden}`}
      style={{left: props.screenX, top: props.screenY}}
    >
      <ul>
        {/*<li><i><EditOutlined/></i> <span>Rename</span></li>*/}
        {/*<li><i><ShareAltOutlined/></i> <span>Share</span></li>*/}
        <li onClick={event => handleRemove(event, props.noteID)}><i><DeleteOutlined/></i> <span>Delete</span></li>
      </ul>
    </div>
  );
};

export default connect(null, dispatch => ({
  remove: id => notesActions.remove(id).then(result => dispatch(result))
}))(ContextMenu);