import CommentHtml from './CommentHtml';
import '../../App.css';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons';

export default function CommentContainer() {
  const md = [
    {
      postedAt: '10 minutes ago',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: 'Jacob Warnhalter',
        image:
          'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      },
    },
    {
      postedAt: '10 minutes ago',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: 'Jacob Warnhalter',
        image:
          'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      },
    },
    {
      postedAt: '10 minutes ago',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: 'Jacob Warnhalter',
        image:
          'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      },
    },
    {
      postedAt: '10 minutes ago',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: 'Jacob Warnhalter',
        image:
          'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      },
    },
    {
      postedAt: '10 minutes ago',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: 'Jacob Warnhalter',
        image:
          'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      },
    },
    {
      postedAt: '10 minutes ago',
      body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
      author: {
        name: 'Jacob Warnhalter',
        image:
          'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      },
    },
  ];

  const addComment = () => console.log('addd comment');

  return (
    <div
      className="flex-col-container"
      style={{
        rowGap: '1.5rem',
      }}
    >
      {md.map((d) => (
        <CommentHtml {...d} />
      ))}
      <div
        className="flex-row-container"
        style={{
          columnGap: '1.5rem',
          width: '100%',
        }}
      >
        <Textarea
          data-autofocus
          placeholder="Your comment"
          autosize
          minRows={2}
          maxRows={6}
          style={{
            width: '100%',
          }}
        />
        <ActionIcon onClick={addComment}>
          <IconSend size={25} stroke={1.5} />
        </ActionIcon>
      </div>
    </div>
  );
}
