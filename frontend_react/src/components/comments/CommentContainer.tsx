import CommentHtml from './CommentHtml';
import '../../App.css';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons';
import { useState } from 'react';
import { getRandomColors } from '../../utils/constants';
import { getHotkeyHandler } from '@mantine/hooks';

export default function CommentContainer() {
  const mockUser = {
    user_id: 1,
    email: 'abby@test.com',
    name: 'abby cool',
    access_type: 1,
    avatarColor: getRandomColors(),
  };
  const md = [
    {
      posted_on: '11 December 2022',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: mockUser,
    },
  ];

  const [commentsInfo, setCommentsInfo] = useState(md);
  const [comment, setComment] = useState('');

  const addComment = () => {
    if (comment.length === 0) return;
    const newComment = {
      posted_on: '11 December 2022',
      body: comment,
      author: mockUser,
    };
    setCommentsInfo((c) => [...c, newComment]);
    setComment('');
  };

  return (
    <div
      className="flex-col-container"
      style={{
        alignItems: 'start',
        rowGap: '1.5rem',
      }}
    >
      {commentsInfo.map((d, idx) => (
        <CommentHtml key={idx} {...d} />
      ))}
      <div
        className="flex-row-container"
        style={{
          width: '100%',
        }}
      >
        <Textarea
          data-autofocus
          value={comment}
          placeholder="Your comment"
          autosize
          minRows={2}
          maxRows={6}
          style={{
            width: '100%',
          }}
          onChange={(e) => setComment(e.currentTarget.value)}
          onKeyDown={getHotkeyHandler([['mod+Enter', addComment]])}
        />
        <ActionIcon
          onClick={addComment}
          disabled={comment.length === 0}
          className="action-icons"
        >
          <IconSend size={25} stroke={1.5} />
        </ActionIcon>
      </div>
    </div>
  );
}
