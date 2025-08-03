
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
import Greeting from "./practice/Greeting"
import Counter from "./counter/Counter"
function App() {
  const person={
    name:"shivani",
    age:22
  }

  const course={
    name:'Half Stack application development',
      
    parts:[
      {
        name:'Fundamentals of react',
        exercises:10
      },

      {
        name:'Using props to pass data',
        exercises:7
      },

      {
        name:'State of a component',
        exercises:14
      }
    ]
  }

  return (
    <>
      <Greeting person={person}/>
      <Counter />
      <Header  course={course}/>
      <Content  course={course} />
      <Total course={course}/>

    </>
  )
}

export default App
