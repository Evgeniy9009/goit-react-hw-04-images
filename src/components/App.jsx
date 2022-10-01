import PostsSearch from "./PostsSearch/PostsSearch";

export const App = () => {

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <PostsSearch/>
    </div>
  );
};
