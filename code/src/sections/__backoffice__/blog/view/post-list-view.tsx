'use client';

import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { useGetPosts, useSearchPosts } from 'src/api/blog';

import Label from 'src/components/mui/label';

import { IPostItem, IPostFilters, IPostFilterValue } from 'src/types/blog';

import PostListHorizontal from '../post-list-horizontal';

// ----------------------------------------------------------------------

const defaultFilters: IPostFilters = {
  publish: 'Campagnes passées',
};

// ----------------------------------------------------------------------

export default function PostListView() {
  const [sortBy, setSortBy] = useState('latest');

  const [filters, setFilters] = useState(defaultFilters);

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { posts, postsLoading } = useGetPosts();

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const dataFiltered = applyFilter({
    inputData: posts,
    filters,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleFilters = useCallback((name: string, value: IPostFilterValue) => {
    setFilters((prevState): any => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  return (
    <Container maxWidth={'lg'}>
      <Tabs
        value={filters.publish}
        onChange={handleFilterPublish}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {['Campagnes passées', 'Campagnes en cours', 'Campagnes en préparation'].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            icon={
              <Label
                variant={
                  ((tab === 'Campagnes passées' || tab === filters.publish) && 'filled') || 'soft'
                }
                color={(tab === 'Campagnes en cours' && 'info') || 'default'}
              >
                {tab === 'Campagnes passées' && posts.length}

                {tab === 'Campagnes en cours' &&
                  posts.filter((post: any) => post.publish === 'Campagnes en cours').length}

                {tab === 'Campagnes en préparation' &&
                  posts.filter((post: any) => post.publish === 'Campagnes en préparation').length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={dataFiltered} loading={postsLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IPostItem[];
  filters: IPostFilters;
  sortBy: string;
}) => {
  const { publish } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  if (publish !== 'Campagnes passées') {
    inputData = inputData.filter((post) => post.publish === publish);
  }

  return inputData;
};
