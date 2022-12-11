import PostCard from './PostCard';
import { PostCardProps } from '../../types/Post';
import '../../App.css';
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  Container,
  MultiSelect,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';

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
      category: 'decorations',
      title: 'Top 50 underrated plants for house decoration',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: {
        user_info: mockUser,
        description: 'posted 34 minutes ago',
      },
    },
  ];

  const useStyles = createStyles((theme) => ({
    container: {
      margin: '5rem 3rem 5rem 8rem',
      flexDirection: 'column',
    },
  }));

  const { classes } = useStyles();

  const categoriesData = [
    { label: 'United States', value: 'US' },
    { label: 'Great Britain', value: 'GB' },
    { label: 'Finland', value: 'FI' },
    { label: 'France', value: 'FR' },
    { label: 'Russia', value: 'RU' },
  ];

  return (
    <div
      className="flex-col-container"
      style={{
        margin: '3rem 3rem 5rem 8rem',
      }}
    >
      <div
        className="flex-col-container"
        style={{
          alignSelf: 'start',
          rowGap: '1rem',
          alignItems: 'start',
        }}
      >
        <Autocomplete
          placeholder="Search By Title"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={[
            'React',
            'Angular',
            'Vue',
            'Next.js',
            'Riot.js',
            'Svelte',
            'Blitz.js',
          ]}
        />
        <MultiSelect
          data={categoriesData}
          label="Filter Categories"
          placeholder="Pick Posts Categories"
        />
      </div>
      <div className="grid-container" style={{ marginTop: '2rem' }}>
        {items.map((item) => (
          <PostCard key={item.post_id} {...item} />
        ))}
      </div>
    </div>
  );
}
