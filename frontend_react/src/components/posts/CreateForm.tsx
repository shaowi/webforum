import {
  ActionIcon,
  Button,
  Group,
  Loader,
  MultiSelect,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCirclePlus } from '@tabler/icons';
import { useState } from 'react';
import { capitalize } from '../../utils/constants';

export default function CreateForm({
  categoriesData,
  addPost
}: {
  categoriesData: Array<string>;
  addPost: Function;
}) {
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
      category: ''
    }
  });

  const [chosenCategories, setChosenCategories] = useState<Array<string>>([]);
  const [categories, setCategories] = useState<Array<string>>(categoriesData);
  const [loading, setLoading] = useState(false);

  function addNewCategoryToChosen() {
    const newCategory = capitalize(form.values.category);
    setChosenCategories((cats) => [...cats, newCategory]);
    setCategories((cats) => [...cats, newCategory]);
    form.setFieldValue('category', '');
  }

  function onFormSubmit({ title, body }: { title: string; body: string }) {
    console.log(title, body, chosenCategories);
    setLoading(true);
    addPost(title, body, chosenCategories).then(() => setLoading(false));
  }

  return (
    <>
      <Title order={2} align="center" mb={20}>
        New Post
      </Title>
      <form
        onSubmit={form.onSubmit((values) => onFormSubmit(values))}
        className="flex-col-container children-w-max"
        style={{
          rowGap: '1rem'
        }}
      >
        <TextInput
          data-autofocus
          withAsterisk
          required
          label="Title"
          placeholder="Please enter a title"
          {...form.getInputProps('title')}
        />

        <MultiSelect
          className="searchBox"
          data={categories}
          value={chosenCategories}
          onChange={(cats) => setChosenCategories(cats)}
          searchable
          label="Categories"
          placeholder="Pick Categories"
          transitionDuration={150}
          transition="pop-top-left"
          transitionTimingFunction="ease"
        />

        <div className="flex-row-container">
          <TextInput
            placeholder="Add New Categories"
            {...form.getInputProps('category')}
          />
          <ActionIcon variant="transparent" onClick={addNewCategoryToChosen}>
            <IconCirclePlus size={24} />
          </ActionIcon>
        </div>

        <Textarea
          withAsterisk
          required
          label="Body"
          placeholder="Please enter a body for the post"
          autosize
          minRows={4}
          maxRows={8}
          {...form.getInputProps('body')}
        />

        <Group position="right" mt="md">
          <Button type="submit">
            {loading ? <Loader color="white" size="sm" /> : 'Submit'}
          </Button>
        </Group>
      </form>
    </>
  );
}
