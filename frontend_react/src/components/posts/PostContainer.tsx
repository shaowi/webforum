import {
  ActionIcon,
  Loader,
  Modal,
  MultiSelect,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core';
import { IconSearch, IconSquarePlus } from '@tabler/icons';
import { useEffect, useState } from 'react';
import '../../App.css';
import { PostCardProps } from '../../types/Post';
import { User } from '../../types/User';
import { lowerCaseStrArrays } from '../../utils/constants';
import {
  convertToPostCard,
  createPost,
  getAllPosts,
  hasOverlap
} from '../../utils/post_service';
import CreateForm from './CreateForm';
import PostCard from './PostCard';

export default function PostContainer({ user }: { user: User }) {
  const [initPosts, setInitPosts] = useState<PostCardProps[]>();
  const [posts, setPosts] = useState<PostCardProps[]>();
  const categoriesData = ['Decorations', 'Food', 'Household Appliance'];

  const [searchVal, setSearchVal] = useState('');
  const [categories, setCategories] = useState<Array<string>>([]);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCreateError, setShowCreateError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setPosts(initPosts!.filter((post) => post.title.toLowerCase().includes(v)));
  }

  function filterCategories(curCategories: Array<string>) {
    const t = lowerCaseStrArrays(curCategories);
    if (t.length === 0) {
      setPosts(initPosts);
      return;
    }
    setPosts(initPosts!.filter((post) => hasOverlap(t, post.categories)));
  }

  function filterTitlesAndCategories(curCategories: Array<string>, v: string) {
    const t = lowerCaseStrArrays(curCategories);
    setPosts(
      initPosts!.filter(
        (post) =>
          post.title.toLowerCase().includes(v) && hasOverlap(t, post.categories)
      )
    );
  }

  function addPost(title: string, body: string, categories: string[]) {
    const data = {
      author_name: user.name,
      author_email: user.email,
      title,
      body,
      categories: categories.join(',')
    };
    const res = createPost(data);
    res.then((content: any) => {
      if ('error' in content) {
        setShowError(true);
      } else {
        setShowAlert(true);
        // Add new post to all posts
        const newAllPosts = initPosts?.concat([convertToPostCard(content)]);
        setPosts(newAllPosts);
        setInitPosts(newAllPosts);
      }
    });
    return res;
  }

  useEffect(() => {
    getAllPosts().then((content: any) => {
      if ('error' in content) {
        setShowError(true);
      } else {
        const finalData = content.map(convertToPostCard);
        setPosts(finalData);
        setInitPosts(finalData);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader className="centered" />;
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
            justifyContent: posts!.length > 0 ? 'space-between' : 'end',
            width: '82vw'
          }}
        >
          {posts!.length > 0 && (
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
          )}
          <Tooltip label="Add New Post">
            <ActionIcon
              variant="transparent"
              onClick={() => setShowAddPostModal(true)}
            >
              <IconSquarePlus size={36} />
            </ActionIcon>
          </Tooltip>
        </div>

        <div
          className="grid-container"
          style={{ marginTop: '2rem', alignSelf: 'start' }}
        >
          {posts!.map((post) => (
            <PostCard key={post.post_id} {...post} />
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
        opened={showCreateError}
        centered
        onClose={() => setShowCreateError(false)}
        title="Error occured while creating a post"
      >
        <Text c="red" fz="md">
          Something went wrong. Please refresh your browser and try again.
        </Text>
      </Modal>
      <Modal
        opened={showError}
        centered
        onClose={() => setShowError(false)}
        title="Error occured while fetching posts"
      >
        <Text c="red" fz="md">
          Something went wrong. Please refresh your browser and try again.
        </Text>
      </Modal>
    </>
  );
}
