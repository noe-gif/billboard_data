import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

const mockPostsCompanies = [
  {
    company: 'Spotify',
    icon: 'logos:spotify-icon',
    description:
      'Découvrez les nouvelles offres exclusives de Spotify, disponibles dès maintenant!',
    covering: Math.floor(Math.random() * 101), // Random number between 0 and 100
    date: `01/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Microsoft',
    icon: 'logos:microsoft-icon',
    description: 'Explorez les dernières technologies de Microsoft et boostez votre productivité!',
    covering: Math.floor(Math.random() * 101),
    date: `02/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Google',
    icon: 'devicon:google',
    description: 'Découvrez les innovations de Google qui facilitent votre vie numérique!',
    covering: Math.floor(Math.random() * 101),
    date: `03/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Apple',
    icon: 'ic:baseline-apple',
    description:
      "Plongez dans l'univers Apple avec des produits révolutionnaires et un design exceptionnel!",
    covering: Math.floor(Math.random() * 101),
    date: `04/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Mastercard',
    icon: 'logos:mastercard',
    needsColor: true,
    color: '#FF2E2E',
    description:
      'Découvrez la puissance du paiement éléctronique avec Mastercard, le système du futur!',
    covering: Math.floor(Math.random() * 101),
    date: `05/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Twitter',
    icon: 'pajamas:twitter',
    description: "Explorez l'innovation technologique avec Twitter et ses produits de pointe!",
    covering: Math.floor(Math.random() * 101),
    date: `06/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Facebook',
    icon: 'logos:facebook',
    description:
      'Connectez-vous avec le monde! Découvrez les dernières fonctionnalités de Facebook!',
    covering: Math.floor(Math.random() * 101),
    date: `07/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'Instagram',
    icon: 'skill-icons:instagram',

    description:
      "Suivez l'actualité en temps réel avec Instagram! Découvrez ce qui se passe dans le monde!",
    covering: Math.floor(Math.random() * 101),
    date: `08/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
  {
    company: 'LinkedIn',
    icon: 'skill-icons:linkedin',
    description:
      'Boostez votre carrière avec LinkedIn! Connectez-vous avec des professionnels du monde entier!',
    covering: Math.floor(Math.random() * 101),
    date: `09/${Math.floor(Math.random() * 12) + 1}-08/23`,
  },
];

export function useGetPosts() {
  const generateMockPosts = () => {
    const mockPosts: IPostItem[] = [];

    const imageUrl = 'https://i.pinimg.com/564x/b5/fd/aa/b5fdaa45daad2e25c42678c1e5df8dd9.jpg';
    const loremIpsum =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    for (let i = 0; i < 9; i++) {
      const mockPost: IPostItem = {
        id: `post_${i}`,
        title: mockPostsCompanies[i].company,
        company: mockPostsCompanies[i].company,
        tags: ['tag1', 'tag2'],
        publish: 'Campagnes passées',
        content: 'Lorem ipsum content',
        coverUrl: imageUrl,
        metaTitle: 'Meta Title',
        totalViews: 100,
        totalShares: 50,
        description: mockPostsCompanies[i].description,
        icon: mockPostsCompanies[i].icon,
        covering: mockPostsCompanies[i].covering,
        newData: mockPostsCompanies[i].date,
        totalComments: 5,
        totalFavorites: 20,
        metaKeywords: ['keyword1', 'keyword2'],
        metaDescription: 'Meta description',
        comments: [],
        createdAt: new Date(),
        favoritePerson: [{ name: 'Fav Person', avatarUrl: imageUrl }],
        author: { name: 'Author', avatarUrl: imageUrl },
      };

      mockPosts.push(mockPost);
    }

    return mockPosts;
  };

  const mockPosts = generateMockPosts();

  const memoizedValue = useMemo(
    () => ({
      posts: mockPosts,
      postsLoading: false,
      postsError: null,
      postsValidating: false,
      postsEmpty: mockPosts.length === 0,
    }),
    []
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPost(title: string) {
  const URL = title ? ['endpoints.post.details', { params: { title } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      post: data?.post as IPostItem,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data?.post, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const URL = title ? ['endpoints.post.latest', { params: { title } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: (data?.latestPosts as IPostItem[]) || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query: string) {
  const URL = query ? ['endpoints.post.search', { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IPostItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
