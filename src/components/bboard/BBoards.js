import { useState, useEffect } from "react";
import Axios from 'axios'
import {useValue} from '../ValueContext';

const flagPost = (item) => {return 0}


const BBoards = () => {
  const {currentValue} = useValue();
  const [title,setTitle] = useState("");
  const [text,setText] = useState("");
  const [bboard,setBboard] = useState("");
  const [posts,setPosts] = useState([]);
  const [numNewPosts,setNumNewPosts] = useState(0)

  useEffect(() => {
    // go out to the server and get the posts for the current bboard

    const getPosts = async () => {
      let result = {data:[]}
      result =
        await Axios.post(
          currentValue.appURL+"/posts",
          {bboard:bboard}
        )
      setPosts(result.data)
      return result.data
    }

    const ps = getPosts()

  },[bboard,numNewPosts])


  const addPost = async () =>{

    await Axios.post(currentValue.appURL+"/addComment",
        {email:currentValue.email,
         secret:currentValue.secret,
         bboard:bboard,
         title:title,
         text:text,
       });
    setTitle("");
    setText("");

    setNumNewPosts(numNewPosts+1)
  }

  const remove = async (item) => {
    console.log('remove is called on item: ')
    console.log(item)
    const result = await Axios.post(currentValue.appURL+"/deletePost",
       {email:currentValue.email,
        secret:currentValue.secret,
        postid:item._id})
    console.log(result)
    setNumNewPosts(numNewPosts+1)
  }

  const Item = ({item}) => {
       const userid = currentValue.userid;
       const isAuthor = userid === item.author;
    return (
      <div style={{padding:10,margin:10,backgroundColor:"#ddd"}}>
        <div style={{fontSize:24}}>{item.title}...</div>
        <div>{item.text}</div>
        <div>{item.createdAt}</div>

        {isAuthor &&
          <button
            onClick={()=>remove(item)}> Delete
          </button>
        }

        <button
          title="Flag"
          onClick={() => flagPost(item)}>
          Flag
        </button>
      </div>
    )
  }


  return (
    <div style={{flex:1}}>

      <div style={styles.input}>
        <div style={{marginRight:10}}>Bboard</div>
        <input type="text"
            onChange={event => {setBboard( event.target.value)}}
            placeholder="bboard name"/>
      </div>

      <div style={styles.input}>
          <div> Add your own post</div>
          <div> You've made  {numNewPosts} new posts</div>
          <input type="text"
              onChange={event => {setTitle( event.target.value)}}
              value={title}
              placeholder="title"/>
          <input
              onChange={event => {setText( event.target.value)}}
              value={text}
              placeholder="body of the post"/>
          <button
              onClick = {() => addPost()}
              style={{width:200,backgroundColor:"#fca"}}>
              Submit
          </button>
      </div>


      <div style={styles.posts}>
          <div>
            BBoard n={""+posts.length}
          </div>
          <div style={{display:'flex',flex:1,flexDirection:'column'}}>
              {posts.map((item) =>
                <Item item={item} />
              )}
          </div>

          <div>end of posts {JSON.stringify(posts,null,5)} </div>

      </div>



    </div>
  )
}

const styles = {
  input:{
    display:'flex',
    flexDirection:'column',
    borderColor:'red',
    borderWidth:5,
    borderRadius:20,
    backgroundColor:'#fcc',
    padding:5,
    margin:5,

  },
  posts:{
    display:'flex',
    flexDirection:'column',
    borderColor:'blue',
    borderWidth:5,
    borderRadius:20,
    backgroundColor:'#ccf',
    padding:5,
    margin:5,
  },
}

export default BBoards;
