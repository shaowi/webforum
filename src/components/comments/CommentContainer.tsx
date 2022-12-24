import { ActionIcon, Loader, Text, Textarea, Tooltip } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconSend } from '@tabler/icons';
import { useEffect, useState } from 'react';
import '../../App.css';
import { CommentCardProps } from '../../types/Comment';
import { Author } from '../../types/User';
import { convertToCommentCard, getComments } from '../../utils/comment_service';
import TransitionModal from '../TransitionModal';
import CommentHtml from './CommentHtml';

export default function CommentContainer({
  post_id,
  userAccessType,
  curUser,
  addCommentPost,
  deleteCommentPost
}: {
  post_id: number;
  userAccessType: number;
  curUser: Author;
  addCommentPost: Function;
  deleteCommentPost: Function;
}) {
  const [commentsInfo, setCommentsInfo] = useState<CommentCardProps[]>([]);
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);
  const [showOpError, setShowOpError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  function addComment() {
    if (comment.length === 0) return;
    setIsCreating(true);
    addCommentPost(post_id, { content: comment })
      .then((res: any) => {
        if ('error' in res) {
          setShowOpError(true);
        } else {
          // Add new comment to all comments
          const { comment_id, posted_on, content } = res;
          setCommentsInfo((c) => [
            ...c,
            {
              comment_id,
              posted_on,
              content,
              author: curUser
            }
          ]);
        }
      })
      .finally(() => {
        setComment('');
        setIsCreating(false);
      });
  }

  function deleteComment(comment_id: number) {
    const res = deleteCommentPost(post_id, comment_id);
    res.then((content: any) => {
      if ('error' in content) {
        setShowOpError(true);
      } else {
        setCommentsInfo((c) => c.filter((i) => i.comment_id !== comment_id));
      }
    });
    return res;
  }

  useEffect(() => {
    // Fetch all comments from database relating to this post
    getComments(post_id)
      .then((content: any) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          // Sort the comments in ascending time from top to bottom
          content.sort((a: any, b: any) => a.created_dt - b.created_dt);
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
          {isCreating ? (
            <Loader />
          ) : (
            <Tooltip label="Send">
              <ActionIcon
                onClick={addComment}
                disabled={comment.length === 0}
                className="action-icons"
              >
                <IconSend size={25} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      </div>
      <TransitionModal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Error occured while fetching comments"
        InnerComponent={
          <Text c="red" fz="md">
            Something went wrong. Please refresh your browser and try again.
          </Text>
        }
      />
      <TransitionModal
        opened={showOpError}
        onClose={() => setShowOpError(false)}
        title="Error occured while performing this operation"
        InnerComponent={
          <Text c="red" fz="md">
            Something went wrong. Please refresh your browser and try again.
          </Text>
        }
      />
    </>
  );
}
