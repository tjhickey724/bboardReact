import {useState} from 'react';

const randint = (a,b) => Math.round(Math.random()*(b-a)+a)

const MathQuiz = ({u,v}) => {
  const [x,setX] = useState(u);
  const [y,setY] = useState(v);
  const [xy, setXY] = useState("")

  return (
    <div style={{display:'flex',
                 flexDirection:'column',}}>
       <h1>Math Quiz</h1>
       <form>
          <label>
             {x}*{y}=
             <input type="text"
                    onChange={event => {setXY( event.target.value)}}
             />
          </label>
          <button onClick = {() => console.log('clicked check')}>
          Check</button>

       </form>
       <button onClick={() => console.log('clicked')}> new problem</button>
       answer:{xy}

    </div>
  )
}

export default MathQuiz;
