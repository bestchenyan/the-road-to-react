import { useState } from "react";
import "./App.css";

// const title = "Hello React";

const welcome = {
  greeting: "Hey",
  title: "React",
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("React");

  const stories = [
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>{welcome.greeting + welcome.title}</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => {
  console.log("Search renders");

  const handleChange = (event) => {
    onSearch(event);
  };
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" value={search} onChange={handleChange} />

      <p>
        Searching for <strong>{search}</strong>.
      </p>
    </>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.title} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li key={item.title}>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span> {item.auther} </span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;
