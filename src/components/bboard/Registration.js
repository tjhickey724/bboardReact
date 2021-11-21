
import Axios from 'axios';
import {useState,useEffect} from 'react';

import ValueProvider,{useValue} from '../ValueContext';

const Registration = () => {
    const {currentValue,setCurrentValue} = useValue();
    const [debugging,setDebugging] = useState(true);
    const [email,setEmail] = useState("");
    const [checkedRegistration, setCheckedRegistration] = useState(false);


    useEffect(() => { getUserData()}, []);

    const registerEmail = async (email) => {
      try{
          let appURL = currentValue.appURL
          let result = await Axios.post(appURL+'/register',{email:email})
          let secret = result.data.secret
          let userid = result.data.userid

          localStorage.setItem(
            '@userData',
            JSON.stringify({...currentValue,email,secret,userid}))
          setEmail(email)
          setCurrentValue({...currentValue, email,secret,userid})
        }catch(e){
          console.log('error'+e)
          console.dir(e)

        }
    }


    const getUserData = async () => {
      let email = currentValue.email
      let secret = currentValue.secret
      const appURL = currentValue.appURL
      // this function gets the userKey from asyncStorage if it is there
      // if not, it goes to the appURL to get a userKey which it stores in asyncStorage
       try {
         console.log('in getUserData')
         let jsonValue = localStorage.getItem('@userData')
         //jsonValue=null
         console.log('jsonValue = '+jsonValue)

         let userData = null
         if (jsonValue!=null) {
           userData = JSON.parse(jsonValue)
           let newData =
            {appURL:currentValue.appURL,
              email:userData.email,
              userid:userData.userid,
              secret:userData.secret}
           setCurrentValue(newData)
           setEmail(userData.email)
           setCheckedRegistration(true)

         } else {
              console.log('else clause of Registration')
              setCheckedRegistration(true)
              console.log('no async, set checked to true')
         }
       } catch(e) {
         console.dir(e)
       }
    }

  let ui = <div>nodebug</div>
  if (debugging) {
    ui = (
      <div>
        <div>
            currentValue={JSON.stringify(currentValue,null,5)}
        </div>
      </div>
    )
  }




  return (
    <div><div style={{fontSize:24}}>Mobile Bulletin Board</div>
        <div style={{padding:10,margin:10,backgroundColor:"#ddd"}}>

             <div style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <div style={{fontSize:24}}>email: </div>
                <input type="text"
                     style={{fontSize:24}}
                     placeholder="Enter your email "
                     value={email}
                     onChange={event => {setEmail( event.target.value)}}
                />
             </div>

             {currentValue.email==""?
             (<button
                onClick = {() => registerEmail(email)}
             >
               <div style={{fontSize:20}}> Register </div>
             </button>)
             :
             (<button
                onClick={async () => {
                  localStorage.clear()
                  setEmail("")
                  setCurrentValue(
                    {appURL:currentValue.appURL,email:"",secret:""})
                }}
             >
               <div style={{fontSize:20}}> Logout </div>
             </button>
           )}

        </div>

     </div>)
}

export default Registration;
