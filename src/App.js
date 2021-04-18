import './App.css';
import React, {useState} from "react";

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const AVAILABLE_RESOURCES = [
    'posts',
    'comments',
    'albums',
    'photos',
    'todos',
    'users',
]

48:27 react-hw

function App() {
    // const [endpoint, setEndpoint] = useState('');
    // const [id, setId] = useState('');

    const [endpointFields, setEndpointFields] = useState({
    // const [{endpoint, id}, setEndpointFields] = useState({
        endpoint: '',
        id: ''
    });

    const {endpoint, id} = endpointFields;

    const [errorMessage, setErrorMessage] = useState('');

    const [items, setItems] = useState([]);
    const [singleItem, setSingleItem] = useState(null);

    const onSubmit = () => {
        // первір чи перший інпут не є пустим
        // перевір чи в пешому інпуті валідне значення
        if (!endpoint) {
            return setErrorMessage('first input is required!!!')
        }

        if (!AVAILABLE_RESOURCES.includes(endpoint.trim().toLowerCase())) {
            return setErrorMessage('value is not valid, try to use smth from this list: posts, comments, albums, photos, todos, users')
        }

        // перевір чи значення є числовим
        // перевір чи значення в діапазоні 1-100

        const idToNum = Number(id);

        if (!idToNum && id.trim() !== '' && idToNum !== 0) {
            return setErrorMessage('value for second input is not valid, pls use numeric value')
        }
        if ((idToNum < 1 || idToNum > 100) && id.trim() !== '') {
            return setErrorMessage('value for second input is out of range, pls use 1-100')
        }

        setErrorMessage('');
        fetchData();
    }


    const fetchData = async () => {
        const responce = await fetch(`${BASE_URL}/${endpoint.trim().toLowerCase()}/${id.trim()}`);
        const json = await responce.json();

        if (id) {
            setSingleItem(json);
            setItems([]);
            return
        }
        setSingleItem(null);
        setItems(json);
        // console.log(json);
    }

    const onFieldUpdate = ({target: {name, value}}) => setEndpointFields({...endpointFields, [name]: value});

    return (
        <div className="App">
            <br/>
            <br/>
            {/*<input value={endpoint} onChange={({target: {value}}) => setEndpoint(value)} name="endpoint" type="text" placeholder="E.g. posts, comments, todos etc"/>*/}
            <input value={endpoint} onChange={onFieldUpdate} name="endpoint" type="text" placeholder="E.g. posts, comments, todos etc"/>
            <br/>
            <br/>
            {/*<input value={id} onChange={({target: {value}}) => setId(value)} name="id" type="text" placeholder="resource id, e.g. 1,2,3"/>*/}
            <input value={id} onChange={onFieldUpdate} name="id" type="text" placeholder="resource id, e.g. 1,2,3"/>
            <br/>
            <br/>
            {/*<button onClick={fetchData}>fetch data</button>*/}
            <button onClick={onSubmit}>fetch data</button>

            <hr/>

            <h1 style={{color: 'red'}}>{errorMessage}</h1>

            <div style={{width: '400px', textAlign: 'left', padding: '20px'}}>
                <pre style={{whiteSpace: 'pre-wrap'}}>
                {singleItem &&
                JSON.stringify(singleItem, null, 2)
                }
                </pre>
            </div>

            <hr/>
            <div>
                {items.map(el => (<div>{el.id} - {el.title ?? 'N/A'}</div>))}
            </div>

        </div>
    );
}

export default App;

// дз  створти 2 інтупи і кнопку
// перший відповідає за ендпоінт джсон плейсхолдера (перша частина енпоніту)
// другий- за айдішнік якщо другого ендпоінту нема- тягнемо весь список
//
//
// потрібно зробити валідацію
// на перший інпут- чи ендпоінт існуючий
// на другий- чи це число і чи воно в рамках 1-100
// зробити версію на функціональній компоненті контрольовану і не контрольовану
// якщо є час- на класовій компоненті теж таке саме написати
//
// друга частина дз
// inputs (for each create 2 versions- class based and functional based)
//
// create controlled and uncontrolled select component
// create controlled and uncontrolled checkbox
// create controlled and uncontrolled radio
//
//
// 1
// inputs (for each create 2 versions - class and functional based)
// create controlled and uncontrolled <select> component
// create controlled and uncontrolled checkbox
// create controlled and uncontrolled radio
// // create controlled and uncontrolled number input
// should also create button, that on click will create an object from it and print it on page at the button
// 2
// lifecycle
// have ext input, that has endpoint partition (todos, posts, users) or select input
// have number picker or text input, that will specify id
// button, that will fetch data
// create two versions - controlled and uncontrolled
// два input (1: posts... 2: /1)