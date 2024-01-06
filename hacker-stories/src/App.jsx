
import './App.css'

// const title = "Hello React";

const welcome = {
  greeting: "Hey",
  title:"React"
};

const list = [
  {
    title: "React",
    url: "https://react.js.org/",
    auther: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectId:0
  },
    {
    title: "Redux",
    url: "https://redux.js.org/",
    auther: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points:5 ,
    objectId:1
  }
];
function App() {

  return (
    <div>
      <h1>{welcome.greeting + welcome.title}</h1>
      
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />

      <ul>
        {list.map(item => {
          return (
            <li key={item.title}>
              <span> 
                <a href={item.url}>{ item.title }</a>
              </span>
              <span> {item.auther} </span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
