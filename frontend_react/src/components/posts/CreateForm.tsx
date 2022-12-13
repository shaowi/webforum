import {
  ActionIcon,
  Button,
  Group,
  MultiSelect,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCirclePlus } from '@tabler/icons';
import { useState } from 'react';
import { capitalize } from '../../utils/constants';

export default function CreateForm({
  categoriesData,
  addPost,
}: {
  categoriesData: Array<string>;
  addPost: Function;
}) {
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
      category: '',
    },

    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Title must not be empty' : null,
      body: (value) =>
        value.trim().length === 0 ? 'Body must not be empty' : null,
    },
  });

  const [chosenCategories, setChosenCategories] = useState<Array<string>>([]);
  const [categories, setCategories] = useState<Array<string>>(categoriesData);

  function addNewCategoryToChosen() {
    const newCategory = capitalize(form.values.category);
    setChosenCategories((cats) => [...cats, newCategory]);
    setCategories((cats) => [...cats, newCategory]);
    form.setFieldValue('category', '');
  }

  return (
    <form
      onSubmit={form.onSubmit((values) => addPost(values))}
      className="flex-col-container children-w-max"
      style={{
        rowGap: '1rem',
      }}
    >
      <TextInput
        withAsterisk
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
        data-autofocus
        label="Body"
        placeholder="Please enter a body for the post"
        autosize
        minRows={4}
        maxRows={8}
        {...form.getInputProps('body')}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
