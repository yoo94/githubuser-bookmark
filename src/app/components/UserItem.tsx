type UserItemProps = {
  data: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

export default function UserItem({ data }: UserItemProps) {
  return (
    <div className="flex items-center bg-gray-800 rounded-md p-4 shadow-md w-full max-w-md mx-auto my-2">
      <img
        src={data.avatar_url}
        alt={`${data.login}'s avatar`}
        className="w-12 h-12 rounded-full border-2 border-blue-400"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h2 className="text-sm font-semibold text-white">
            {data.login || 'Unknown'}
          </h2>
        </div>
        <div className="text-xs text-gray-300 mt-1">
          <p><a className="hover:text-blue-600" href={data.html_url} target="_blank">go to {data.login}'s GitHub page</a></p>
        </div>
      </div>
    </div>
  );
}
