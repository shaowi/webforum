import PostCard from './PostCard';
import { PostCardProps } from '../../types/Post';
import '../../App.css';

export default function PostContainer() {
  const mockUser = {
    user_id: 1,
    email: 'abby@test.com',
    name: 'abby cool',
    access_type: 1,
  };

  const items: PostCardProps[] = [
    {
      post_id: 1,
      image:
        'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      category: 'decorations',
      title: 'Top 50 underrated plants for house decoration',
      likes: 1000,
      views: 733,
      comments: 5,
      author: {
        user_info: mockUser,
        description: 'posted 34 minutes ago',
      },
    },
  ];
  return (
    <div className="grid-container" style={{ margin: '5rem 3rem 5rem 8rem' }}>
      {items.map((item, idx) => (
        <PostCard key={item.image + idx} {...item} />
      ))}
    </div>
  );
}
