import {useState,useEffect} from 'react'
import Axios from 'axios'

const GitHubView = ({userId}) => {
  const [id,setId] = useState(userId)
  const [repos,setRepos] = useState([])


  useEffect(() => {
    getRepos()
  },[id])

  const getRepos = async () => {
    const url = 'https://api.github.com/users/'+id+'/repos';
    console.log('url='+url)
    const result = await Axios.get(
        url)
    const vals = result.data
    console.log('length = '+vals.length)
    setRepos(vals)
    console.log('getting repos ')
  }

  const styles = {
  container: {
    display:'flex',
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    padding:0,
    margin:0,
    width:'100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    width:'100%',
    padding:25,
    color:"red",
    backgroundColor:'black',
  }
};


  return (
    <div style={styles.container}>
      <div style={styles.header}>
         <h1>Github Viewer</h1>
      </div>
      <div>
        Github Id:
        <input type="text"
               onChange={event => {setId( event.target.value)}}
               placeholder="id" />
      </div>
      <button onClick={() => getRepos()}>get repos</button>
      <h1>Repos for {id} </h1>
      <table>
        <tbody>
          {repos.map((item) =>
            (<tr style={{backgroundColor:"#cccccc", margin:20,padding:20}}>
                <td style={{fontSize:20}}>
                    <a href={"https://github.com/"+item.full_name}>
                     {item.name}
                    </a>
                </td>
             </tr>
            )
          )}
        </tbody>
      </table>
    </div>)
}

export default GitHubView;
