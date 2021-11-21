import {Link} from 'react-router-dom';

const Layout = ({children}) => {
  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/bboards">BBoards</Link>
      </div>
      <h1 style={styles.header}>
          BBoard Demo
      </h1>
      <div>
        {children}
      </div>
    </div>
  )
};

const styles={
  container:{
    display:'flex',
    flexDirection:'column',
  },
  navbar:{
    display:'flex',
    backgroundColor:'#ffccaa',
    padding:0,
    margin:0,
    flexDirection:'row',
    justifyContent:'space-around',
  },
  header:{
    backgroundColor:'black',
    color:'red',
    padding:0,
    margin:0,
  },
};

export default Layout;
