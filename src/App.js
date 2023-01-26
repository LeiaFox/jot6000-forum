import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [posts,setposts] = useState([])
  const [title,settitle] = useState("")
  const [content,setcontent] = useState("")
  useEffect(()=>{
    fetch("http://localhost:4000/testdata")
    .then(response => response.json())
    .then(data => setposts(data))
  },[])

  const sendPost =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:4000/posts',
      {
        author: "James",
        title: title,
        posted: "01/01/2023",
        likes: 0,
        dislikes: 0,
        content: content,
        replies: []
      }
    ).then( data =>{
      console.log(data)
      setcontent("")
      settitle("")
      fetch("http://localhost:4000/testdata")
      .then(response => response.json())
      .then(data => setposts(data))
    }

    )
  }

  return (
    <div className="App">
      <form onSubmit={(e)=>sendPost(e)}>
        <h1>Create a post</h1>
        <label>
          Title: 
          <input 
            type="text" 
            value={title} 
            onChange={(e)=>settitle(e.target.value)}
          />
        </label>
        <label>
          Content: 
          <textarea 
            value={content} 
            onChange={(e)=>setcontent(e.target.value)}
          />
        </label>

      </form>
      {posts?.map((post) => 
        <div className='post bgcolor'>
          <header>          
            <h3>{post.author}</h3>
            <h1>{post.title}</h1>
            <div className='stats'>
              <p>Likes:{post.likes} | Dislikes:{post.dislikes}</p>
              <p>Posted: {post.posted}</p>
            </div>
          </header>
          {post?.replies?.map((reply)=>
            <Reply {...reply}/>
          )}
        </div>
      )}
    </div>
  );
}


function Reply(props){
  return(
    <div className='post reply'>
      <header>          
        <h4>{props.author}</h4>
        <h2>{props.content}</h2>
        <div className='stats'>
          <p>Likes:{props.likes} | Dislikes:{props.dislikes}</p>
          <p>Posted: {props.posted}</p>
        </div>
      </header>
      {props?.replies.map((reply)=>
        <Reply {...reply}/>
      )}
    </div>
  )
}

export default App;
