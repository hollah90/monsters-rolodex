import CardList from './components/card-list/card-list.component'
import './App.css';
import SearchBox from './components/search-box/search-box.component'
import { useState, useEffect } from 'react'


const App = () => {

  const [searchField, setSearchField] = useState('')
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters)

  console.log('render')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users)
      );
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters)

  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  }


  return (
    <div className="App">
      <h1 className='app-tittle'>Monsters Rolodex</h1>

      <SearchBox onChangeHandler={onSearchChange}
        placeholder='search monsters'
        className={'monsters-search-box'} />
      <CardList monsters={filteredMonsters} />

    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) =>
//         setMonsters(
//           () => {
//             return { monsters: users };
//           },
//         ))
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField }
//     })
//   }
//   render() {


//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this;

//     const filteredMonsters = this.state.monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     })
//   }
// }

export default App;
