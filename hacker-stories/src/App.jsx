import { useState, useEffect, Fragment, useRef } from "react";
import "./App.css";

// const title = "Hello React";

const welcome = {
  greeting: "Hey",
  title: "React",
};

const initialStories = [
  {
    title: "React",
    url: "https://react.js.org/",
    auther: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectId: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    auther: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectId: 1,
  },
];

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "");
  const [stories, setStories] = useState(initialStories);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => story.objectId !== item.objectId
    );
    setStories(newStories);
  };

  return (
    <>
      <h1>{welcome.greeting + welcome.title}</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchStories} onRemoveItem={handleRemoveStory} />
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
    {list.map((item) => (
      <Item key={item.objectId} item={item} onRemoveItem={onRemoveItem} />
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
