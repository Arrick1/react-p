import * as React from 'react'
import PropTypes from 'prop-types'

function LanguagesNav({ selected, onUpdateLanguage }){
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
      selectedLaunguage: "All"
    }

    this.updateLaungage = this.updateLaungage.bind(this)
  }

  updateLaungage (selectedLaunguage){
    this.setState({
      selectedLaunguage
    })

  }
  render() {
    const { selectedLaunguage } = this.state

    return(
      <React.Fragment>
        <LanguagesNav
          selected={selectedLaunguage}
          onUpdateLanguage={this.updateLaungage}
          />
      </React.Fragment>

    )
  }
}