import { MultiSelect, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useState } from 'react';
import '../../App.css';
import { PostCardProps } from '../../types/Post';
import { getRandomColors, lowerCaseStrArrays } from '../../utils/constants';
import PostCard from './PostCard';

export default function PostContainer() {
  const mockUser = {
    user_id: 1,
    email: 'abby@test.com',
    name: 'abby cool',
    access_type: 1,
    avatarColor: getRandomColors(),
  };

  const items: PostCardProps[] = [
    {
      post_id: 1,
      category: 'decorations',
      title: 'abc',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
    {
      post_id: 1,
      category: 'food',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cumque quis. Labore, natus, ipsum ab porro facilis eius aspernatur non enim accusamus aliquid dolores, voluptatibus ullam possimus molestiae repellendus tempora!',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
    {
      post_id: 1,
      category: 'decorations',
      title: 'you',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
    {
      post_id: 1,
      category: 'household appliance',
      title: 'def',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
    {
      post_id: 1,
      category: 'food',
      title: 'abz',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },

    {
      post_id: 1,
      category: 'food',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cumque quis. Labore, natus, ipsum ab porro facilis eius aspernatur non enim accusamus aliquid dolores, voluptatibus ullam possimus molestiae repellendus tempora!',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
    {
      post_id: 1,
      category: 'food',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cumque quis. Labore, natus, ipsum ab porro facilis eius aspernatur non enim accusamus aliquid dolores, voluptatibus ullam possimus molestiae repellendus tempora!',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
    {
      post_id: 1,
      category: 'food',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, cumque quis. Labore, natus, ipsum ab porro facilis eius aspernatur non enim accusamus aliquid dolores, voluptatibus ullam possimus molestiae repellendus tempora!',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, provident dolores sit animi quia deserunt. Amet quidem ut id nesciunt, expedita cumque, temporibus suscipit, quam voluptatum quod ducimus eveniet?',
      likes: 1000,
      views: 733,
      comments: 5,
      author: mockUser,
      description: 'posted 34 minutes ago',
    },
  ];

  const categoriesData = ['Decorations', 'Food', 'Household Appliance'];

  const initPosts = items;
  const [posts, setPosts] = useState(items);
  const [searchVal, setSearchVal] = useState('');
  const [categories, setCategories] = useState<Array<string>>([]);

  function filterPostsByTitle(e: any) {
    const curSearchVal = e.currentTarget.value;
    setSearchVal(curSearchVal);

    // Categories has no selection
    if (categories.length === 0) {
      filterTitles(curSearchVal);
      return;
    }

    filterTitlesAndCategories(categories, curSearchVal);
  }

  function filterPostsByCategories(categoriesChosen: Array<string>) {
    setCategories(categoriesChosen);

    // Title search bar is empty
    if (searchVal.length === 0) {
      filterCategories(categoriesChosen);
      return;
    }
    filterTitlesAndCategories(categoriesChosen, searchVal);
  }

  function filterTitles(v: string) {
    setPosts(initPosts.filter((post) => post.title.toLowerCase().includes(v)));
  }

  function filterCategories(curCategories: Array<string>) {
    const t = lowerCaseStrArrays(curCategories);
    if (t.length === 0) {
      setPosts(initPosts);
      return;
    }
    setPosts(
      initPosts.filter((post) => t.includes(post.category.toLowerCase()))
    );
  }

  function filterTitlesAndCategories(curCategories: Array<string>, v: string) {
    const t = lowerCaseStrArrays(curCategories);
    setPosts(
      initPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(v) &&
          t.includes(post.category.toLowerCase())
      )
    );
  }

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
        <TextInput
          className="searchBox"
          placeholder="Search By Title"
          icon={<IconSearch size={16} stroke={1.5} />}
          onChange={(e) => filterPostsByTitle(e)}
        />
        <MultiSelect
          className="searchBox"
          data={categoriesData}
          value={categories}
          onChange={(cats) => filterPostsByCategories(cats)}
          searchable
          label="Filter By Categories"
          placeholder="Pick Posts Categories"
          transitionDuration={150}
          transition="pop-top-left"
          transitionTimingFunction="ease"
        />
      </div>
      <div className="grid-container" style={{ marginTop: '2rem' }}>
        {posts.map((post, idx) => (
          <PostCard key={post.post_id + idx} {...post} />
        ))}
      </div>
    </div>
  );
}
