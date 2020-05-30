import React from 'react';
import {MessageUserBar} from './MessageHeader';

function MessageText(props) {
  return (
    <React.Fragment>
      {' '}
      {props.message.attachment.length === 0 && (
        <MessageUserBar {...props} />
      )}{' '}
      {props.renderText(props.message, props.theme.message.content.markdown)}{' '}
    </React.Fragment>
  );
}

export default MessageText;
