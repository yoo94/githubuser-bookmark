export const fetchUsers = async (since: number | null = null) => {
  const url = new URL('https://api.github.com/users');
  if (since) {
    url.searchParams.append('since', since.toString());
  }
  url.searchParams.append('per_page', '20');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
