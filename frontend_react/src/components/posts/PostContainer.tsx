import { ActionIcon, Modal, MultiSelect, Text, TextInput } from '@mantine/core';
import { IconSearch, IconSquarePlus } from '@tabler/icons';
import { useState } from 'react';
import '../../App.css';
import { PostCardProps } from '../../types/Post';
import { getRandomColors, lowerCaseStrArrays } from '../../utils/constants';
import { createPost } from '../../utils/post_service';
import CreateForm from './CreateForm';
import PostCard from './PostCard';

export default function PostContainer() {
  const mockUser = {
    user_id: 1,
    email: 'abby@test.com',
    name: 'abby cool',
    access_type: 1,
    avatarColor: getRandomColors()
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
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
      description: 'posted 34 minutes ago'
    }
  ];

  const categoriesData = ['Decorations', 'Food', 'Household Appliance'];

  const initPosts = items;
  const [posts, setPosts] = useState(items);
  const [searchVal, setSearchVal] = useState('');
  const [categories, setCategories] = useState<Array<string>>([]);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  function addPost(title: string, body: string, categories: string[]) {
    const data = {
      title,
      body,
      categories: categories.join(',')
    };
    const res = createPost(data).then((content: any) => {
      if ('error' in content) {
        setShowError(true);
      } else {
        setShowAlert(true);
        // Add new post to all posts
      }
    });
    return res;
  }

  return (
    <>
      <div
        className="flex-col-container"
        style={{
          margin: '3rem 3rem 5rem 8rem'
        }}
      >
        <div
          className="flex-row-container"
          style={{
            justifyContent: 'space-between',
            width: '85vw'
          }}
        >
          <div
            className="flex-col-container"
            style={{
              alignSelf: 'start',
              rowGap: '1rem',
              alignItems: 'start'
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
          <ActionIcon
            variant="transparent"
            onClick={() => setShowAddPostModal(true)}
          >
            <IconSquarePlus size={36} />
          </ActionIcon>
        </div>
        <div
          className="grid-container"
          style={{ marginTop: '2rem', alignSelf: 'start' }}
        >
          {posts.map((post, idx) => (
            <PostCard key={post.post_id + idx} {...post} />
          ))}
        </div>
      </div>
      <Modal
        opened={showAddPostModal}
        centered
        onClose={() => setShowAddPostModal(false)}
      >
        <CreateForm categoriesData={categoriesData} addPost={addPost} />
      </Modal>
      <Modal
        opened={showAlert}
        centered
        onClose={() => setShowAlert(false)}
        title="Post created successfully"
      ></Modal>
      <Modal
        opened={showError}
        centered
        onClose={() => setShowError(false)}
        title="Error occured while creating a post"
      >
        <Text c="red" fz="md">
          Something went wrong. Please refresh your browser and try again.
        </Text>
      </Modal>
    </>
  );
}
