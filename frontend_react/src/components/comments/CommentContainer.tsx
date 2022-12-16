import CommentHtml from './CommentHtml';
import '../../App.css';
import { ActionIcon, Loader, Textarea, Text } from '@mantine/core';
import { IconSend } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { getHotkeyHandler } from '@mantine/hooks';
import { Author } from '../../types/User';
import { CommentCardProps } from '../../types/Comment';
import { convertToCommentCard, getComments } from '../../utils/comment_service';
import TransitionModal from '../TransitionModal';

export default function CommentContainer({
  post_id,
  userAccessType,
  curUser
}: {
  post_id: number;
  userAccessType: number;
  curUser: Author;
}) {
  // const mockUser: Author = {
  //   name: 'abby cool',
  //   email: 'abby@test.com',
  // };
  // const md: Comment[] = [
  //   {
  //     posted_on: '11 December 2022',
  //     body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
  //     author: mockUser
  //   }
  // ];

  const [commentsInfo, setCommentsInfo] = useState<CommentCardProps[]>([]);
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  function addComment() {
    if (comment.length === 0) return;
    // const newComment = {
    //   posted_on: '11 December 2022',
    //   body: comment,
    //   author: mockUser
    // };
    // setCommentsInfo((c) => [...c, newComment]);
    setComment('');
  }

  function deleteComment() {}

  useEffect(() => {
    setLoading(true);
    // Fetch all comments from database relating to this post
    getComments(post_id)
      .then((content: any) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          const finalData: CommentCardProps[] =
            content.map(convertToCommentCard);
          setCommentsInfo(finalData);
        }
      })
      .finally(() => setLoading(false));
  }, [post_id]);

  if (loading) {
    return (
      <Loader size="md" className="centered" style={{ position: 'relative' }} />
    );
  }

  return (
    <>
      <div
        className="flex-col-container"
        style={{
          alignItems: 'start',
          rowGap: '1.5rem'
        }}
      >
        {commentsInfo.map((d, idx) => (
          <CommentHtml
            key={idx}
            commentCardProps={d}
            userAccessType={userAccessType}
            deleteComment={deleteComment}
          />
        ))}
        <div
          className="flex-row-container"
          style={{
            width: '100%'
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
              width: '100%'
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
      <TransitionModal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Error occured while fetching posts"
        InnerComponent={
          <Text c="red" fz="md">
            Something went wrong. Please refresh your browser and try again.
          </Text>
        }
      />
    </>
  );
}
