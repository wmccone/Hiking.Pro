import { Button, Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
//import AsyncSelect from 'react-select/async'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import citiesImport from './us_cities.json'
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN } from '../../utils/actions';
import './Home.css'
let axios = require('axios').default

function Home(props) {
    let [citySelectId, setCitySelectId] = useState(null)
    const [state, dispatch] = useStoreContext();

    let cities = []
    citiesImport.map((city, i) => {
        cities.push({
            label: `${city.name}, ${city.state}`,
            value: city.id
        })
    })


    async function register() {
        if (
            !(document.getElementById('email-input').value == '') &&
            !(document.getElementById('password-input').value == '') &&
            (document.getElementById('password-input').value == document.getElementById('password-input-confirm').value) &&
            citySelectId
        ) {
            try {
                const response = await axios('/api/users/register', {
                    method: 'post',
                    data: {
                        email: document.getElementById('email-input').value,
                        password: document.getElementById('password-input-confirm').value,
                        cityId: citySelectId
                    }
                })
                dispatch({
                    type: LOGIN,
                    cred: {
                        ...response.data.user,
                        loggedIn: true,
                        authToken: response.data.token
                    }
                })
                props.setLogin(response.data)
            } catch (err) {
                console.error(err)
            }
        }
    }

    let queryCities = (q) => {
        axios.get(`/api/cities/?q=${q}`).then(r => {
            let options = []
            r.data.map(city => options.push({ label: `${city.name}, ${city.state}`, value: city.id }))
            return options
        }).catch(e => {
            console.error(e)
        })
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <header>
                    <h1>Welcome to Hiking.Pro</h1>
                </header>
                <main>
                    <div className='text-center'>
                        <Select
                            onChange={(selected) => setCitySelectId(selected.value)}
                            options={cities.slice(0, 10)}
                        />
                    </div>
                    <Link to='/login'>Already have an account? Click here to log in</Link>
                    <div className='dropdown'></div>
                    <div>
                        <form>
                            <h3>Finish your registration</h3>
                            <label htmlFor='email-input'>Enter your email</label> <input id='email-input' name='email-input' type='email'></input>
                            <label htmlFor='password-input'>Enter a password</label> <input id='password-input' name='password-input' type='password'></input>
                            <label htmlFor='password-input-confirm'>Confirm password</label> <input id='password-input-confirm'></input>
                            <Button onClick={register} variant='primary'>Register</Button>
                        </form>
                    </div>
                </main>
            </Row>
        </Container>
    )
}

export default Home