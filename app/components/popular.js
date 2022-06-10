import * as React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button 
            className='btn-clear nav-link'
            style = {language === selected ? {color: 'rgb(187, 46, 31)'} : null}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLaunguage: "All",
      repos: null,
      error: null,
      // loading: true
    }

    this.updateLaungage = this.updateLaungage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount () {
    this.updateLaungage(this.state.selectedLaunguage)
  }

  updateLaungage (selectedLaunguage){
    this.setState({
      selectedLaunguage,
      error: null,
      repos: null
    })

    fetchPopularRepos(selectedLaunguage)
      .then((repos) => this.setState({
        repos, 
        errors: null,
      }))
      .catch(() =>{
        console.warn('Error fetching repos', error)

        this.setState({
          error: `There was an error fetching repositories`
        })
      })
  }
  isLoading() {
    return this.state.repos === null && this.state.error === null
  }
  render() {
    const { selectedLaunguage, repos, error } = this.state

    return(
      <React.Fragment>
        <LanguagesNav
          selected={selectedLaunguage}
          onUpdateLanguage={this.updateLaungage}
          />
          {this.isLoading() && <p>LOADING</p>}

          {error && <p>{error}</p>}

          {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>

    )
  }
}