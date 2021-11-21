
import {useValue} from '../ValueContext';

const styles={
  row:{
    fontSize:20,
    color:'red',
    display:'flex',
  },
}

export default function Profile() {
  let {currentValue} = useValue()
  return (
    <div style={{display:'flex',
                flex:1,
                flexDirection:'column',
                justifyContent:'flex-start',
                padding:10,margin:10,
                backgroundColor:"#ddd "}}>
        <div style={styles.row}>Username:{currentValue.name}</div>
        <div style={styles.row}>Email:{currentValue.email}</div>
        <div style={styles.row}>AppURL:{currentValue.appURL}</div>
        <div style={styles.row}>Secret:{currentValue.secret}</div>
        <div style={styles.row}>UserId:{currentValue.userid}</div>
    </div>
  )
}
