import {
  useState,
  useEffect,
  Fragment,
  useRef,
  useReducer,
  useCallback,
} from "react";
import "./App.css";

// const title = "Hello React";

const welcome = {
  greeting: "Hey",
  title: "React",
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  console.log("APP Render");
  const [searchTerm, setSearchTerm] = useStorageState("search", "");
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleFetchStories = useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });

    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits, // D
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [searchTerm]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <>
      <h1>{welcome.greeting + welcome.title}</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </>
  );
};

const Search = ({ search, onSearch }) => {
  console.log("Search renders");

  const handleChange = (event) => {
    onSearch(event);
  };
  return (
    <Fragment>
      <InputWithLabel
        id="search"
        label="search"
        value={search}
        isFocused
        onInputChange={handleChange}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <p>
        Searching for <strong>{search}</strong>.
      </p>
    </Fragment>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item, index) => (
      <Item
        key={`${item.objectId}-${index}`}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span> {item.auther} </span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button
          type="button"
          onClick={() => {
            onRemoveItem(item);
          }}
        >
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default App;
