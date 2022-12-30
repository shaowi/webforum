import {
  ActionIcon,
  createStyles,
  Group,
  Loader,
  MultiSelect,
  SegmentedControl,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
  Tooltip
} from '@mantine/core';
import {
  IconBackspace,
  IconSearch,
  IconSortAscending2,
  IconSortDescending2,
  IconSquarePlus
} from '@tabler/icons';
import { useEffect, useState } from 'react';
import '../../App.css';
import { PostCardProps, PostCreate, PostFetched } from '../../types/Post';
import { CurrentUser } from '../../types/User';
import { createComment, removeComment } from '../../utils/comment_service';
import { capitalize, isError, lowerCaseStrArrays } from '../../utils/constants';
import {
  convertToPostCard,
  createPost,
  getAllPosts,
  getCommentedPosts,
  getLikedPosts,
  getViewedPosts,
  incrDecrPostComments,
  incrementPostView,
  isSubset,
  likePost,
  removePost,
  viewPost
} from '../../utils/post_service';
import { accountLikes } from '../../utils/user_service';
import TransitionModal from '../TransitionModal';
import CreateForm from './CreateForm';
import PostCard from './PostCard';

export default function PostContainer({
  user,
  isHistory,
  postsType,
  setPostsType
}: {
  user: CurrentUser;
  isHistory: boolean;
  postsType: string;
  setPostsType: Function;
}) {
  const useStyles = createStyles((_) => ({}));
  const { theme } = useStyles();
  const [initPosts, setInitPosts] = useState<PostCardProps[]>([]);
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [categoriesData, setCategoriesData] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [orderByAsc, setOrderByAsc] = useState<boolean>(true);

  const [searchVal, setSearchVal] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteError, setShowDeleteError] = useState(false);

  // Only applicable to main container
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showCreateError, setShowCreateError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  function filterPostsByTitle(v: string) {
    // Categories has no selection
    if (categories.length === 0) {
      filterTitles(v);
      return;
    }

    filterTitlesAndCategories(categories, v);
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
    setPosts(initPosts!.filter((post) => isSubset(t, post.categories)));
  }

  function filterTitlesAndCategories(curCategories: Array<string>, v: string) {
    const t = lowerCaseStrArrays(curCategories);
    setPosts(
      initPosts!.filter(
        (post) =>
          post.title.toLowerCase().includes(v) && isSubset(t, post.categories)
      )
    );
  }

  function addPost(title: string, body: string, categories: string[]) {
    const data: PostCreate = {
      user_id: String(user?.user_id),
      author_name: user?.name,
      author_email: user?.email,
      title,
      body,
      categories: categories.join(',')
    };
    const res = createPost(data);
    res
      .then((content) => {
        if (isError(content)) {
          setShowCreateError(true);
        } else {
          setShowAlert(true);
          // Add new post to all posts
          const newAllPosts = initPosts?.concat([
            convertToPostCard(content as PostFetched)
          ]);
          setPosts(newAllPosts);
          setInitPosts(newAllPosts);

          setAvailableCategoriesFromPosts(newAllPosts);
        }
      })
      .catch(() => setShowCreateError(true));

    return res;
  }

  function deletePost(id: number) {
    const res = removePost(id);
    res.then((content) => {
      if (isError(content)) {
        setShowDeleteError(true);
      } else {
        const newAllPosts = initPosts?.filter((post) => post.post_id !== id);
        setPosts(newAllPosts);
        setInitPosts(newAllPosts);
      }
    });
    return res;
  }

  function likeOrUnlikePost(post_id: number, like: boolean) {
    const res = likePost(post_id, {
      like: String(like),
      user_id: String(user.user_id)
    });
    res.then((content) => {
      if (isError(content)) {
        setShowError(true);
      } else {
        setInitPosts((posts) => accountLikes(posts, post_id, like));
      }
    });
    return res;
  }

  function addViewPost(post_id: number) {
    viewPost(post_id, { user_id: String(user.user_id) }).then((content) => {
      if (isError(content)) {
        setShowError(true);
      } else {
        setInitPosts((posts) => incrementPostView(posts, post_id));
      }
    });
  }

  function addCommentPost(
    post_id: number,
    data: { user_id: string; content: string }
  ) {
    const res = createComment(post_id, data);
    res.then((content) => {
      if (!isError(content)) {
        setInitPosts((posts) => incrDecrPostComments(posts, post_id, 1));
      }
    });
    return res;
  }

  function deleteCommentPost(post_id: number, comment_id: number) {
    const res = removeComment(post_id, comment_id);
    res.then((content) => {
      if (!isError(content)) {
        setInitPosts((posts) => incrDecrPostComments(posts, post_id, 0));
      }
    });
    return res;
  }

  function sortPosts(sortBy: string, orderByAsc: boolean) {
    setSortBy(sortBy);
    setInitPosts(() => _sortPosts(posts, sortBy, orderByAsc));
    setPosts(() => _sortPosts(posts, sortBy, orderByAsc));
  }

  function _sortPosts(
    posts: PostCardProps[],
    sortBy: string,
    sortAsc: boolean
  ) {
    return posts.sort((a: any, b: any) =>
      sortAsc
        ? a[sortBy as keyof PostCardProps] - b[sortBy as keyof PostCardProps]
        : b[sortBy as keyof PostCardProps] - a[sortBy as keyof PostCardProps]
    );
  }

  function reorderPosts(orderByAsc: boolean) {
    setOrderByAsc(orderByAsc);
    if (sortBy) sortPosts(sortBy, orderByAsc);
  }

  function validateAndPopulatePosts(content: unknown) {
    if (isError(content)) {
      setShowError(true);
    } else {
      const finalData = (content as PostFetched[]).map(convertToPostCard);
      setPosts(finalData);
      setInitPosts(finalData);
      setAvailableCategoriesFromPosts(finalData);
    }
  }

  function setAvailableCategoriesFromPosts(posts: PostCardProps[]) {
    let allCategories: Set<string> = new Set();
    for (let { categories } of posts) {
      const curCat = new Set([...categories]);
      allCategories = new Set([...allCategories, ...curCat]);
    }
    setCategoriesData([...allCategories].map(capitalize));
  }

  useEffect(() => {
    // Fetch only posts that this user has viewed/liked/commented before from database
    setLoading(true);
    switch (postsType) {
      case 'viewed':
        getViewedPosts(user.user_id)
          .then(validateAndPopulatePosts)
          .finally(() => setLoading(false));
        break;
      case 'liked':
        getLikedPosts(user.user_id)
          .then(validateAndPopulatePosts)
          .finally(() => setLoading(false));
        break;
      case 'commented':
        getCommentedPosts(user.user_id)
          .then(validateAndPopulatePosts)
          .finally(() => setLoading(false));
        break;
      default:
        getAllPosts()
          .then(validateAndPopulatePosts)
          .finally(() => setLoading(false));
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsType]);

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
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <div
            className="flex-col-container"
            style={{
              alignSelf: 'flex-start',
              rowGap: '1rem',
              alignItems: 'flex-start'
            }}
          >
            <TextInput
              className="searchBox"
              placeholder="Search By Title"
              value={searchVal}
              icon={<IconSearch size={16} stroke={1.5} />}
              rightSection={
                <ActionIcon
                  variant="transparent"
                  onClick={() => {
                    setSearchVal('');
                    filterPostsByTitle('');
                  }}
                >
                  <IconBackspace size={16} stroke={1.5} />
                </ActionIcon>
              }
              onChange={(e) => {
                const curSearchVal = e.currentTarget.value;
                setSearchVal(curSearchVal);
                filterPostsByTitle(curSearchVal);
              }}
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
              clearButtonLabel="Clear selection"
              clearable
            />
            <Group position="apart">
              <Select
                label="Sort By"
                placeholder="Pick one"
                value={sortBy}
                onChange={(v: string) => sortPosts(v, orderByAsc)}
                data={[
                  { value: 'likes', label: 'Like Count' },
                  { value: 'views', label: 'View Count' },
                  { value: 'comments', label: 'Comment Count' }
                ]}
              />
              <Switch
                size="lg"
                color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                onLabel={
                  <IconSortAscending2
                    size={16}
                    stroke={2.5}
                    color={theme.colors.red[6]}
                  />
                }
                offLabel={
                  <IconSortDescending2
                    size={16}
                    stroke={2.5}
                    color={theme.colors.blue[6]}
                  />
                }
                checked={orderByAsc}
                onChange={(e) => reorderPosts(e.currentTarget.checked)}
              />
            </Group>
          </div>
          {isHistory ? (
            <SegmentedControl
              value={postsType}
              onChange={(t) => setPostsType(t)}
              data={[
                { label: 'Viewed', value: 'viewed' },
                { label: 'Liked', value: 'liked' },
                { label: 'Commented', value: 'commented' }
              ]}
            />
          ) : (
            <Tooltip label="Add New Post">
              <ActionIcon
                variant="transparent"
                onClick={() => setShowAddPostModal(true)}
              >
                <IconSquarePlus size={36} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>

        {posts.length === 0 ? (
          <Title order={1} className="centered">
            No posts found
          </Title>
        ) : (
          <div
            className="grid-container"
            style={{ marginTop: '2rem', alignSelf: 'flex-start' }}
          >
            {posts.map((post) => (
              <PostCard
                key={post.post_id}
                postCardProps={post}
                deletePost={deletePost}
                userAccessType={user?.access_type}
                curUser={user}
                likeOrUnlikePost={likeOrUnlikePost}
                addViewPost={addViewPost}
                addCommentPost={addCommentPost}
                deleteCommentPost={deleteCommentPost}
              />
            ))}
          </div>
        )}
      </div>
      {!isHistory && (
        <>
          <TransitionModal
            opened={showAddPostModal}
            onClose={() => setShowAddPostModal(false)}
            InnerComponent={
              <CreateForm categoriesData={categoriesData} addPost={addPost} />
            }
          />
          <TransitionModal
            opened={showAlert}
            onClose={() => setShowAlert(false)}
            title="Post created successfully"
          />
          <TransitionModal
            opened={showCreateError}
            onClose={() => setShowCreateError(false)}
            title="Error occured while creating a post"
            InnerComponent={
              <Text c="red" fz="md">
                Something went wrong. Please refresh your browser and try again.
              </Text>
            }
          />
          <TransitionModal
            opened={showDeleteError}
            onClose={() => setShowDeleteError(false)}
            title="Error occured while deleting a post"
            InnerComponent={
              <Text c="red" fz="md">
                Something went wrong. Please refresh your browser and try again.
              </Text>
            }
          />
        </>
      )}
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
