import { useState, useEffect } from 'react'
import Filter from './Service/Filter'
import PersonForm from './Service/PersonForm'
import Persons from './Service/Persons'
import Service from './Service/Service'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Service.getAll()
      .then(data => {
        console.log('Fetched persons:', data)
        setPersons(Array.isArray(data) ? data : [])
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
        setPersons([])
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )
  
    const newPerson = { name: newName, number: newNumber }
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
  
      if (!confirmUpdate) return
  
      const updatedPerson = { ...existingPerson, number: newNumber }
  
      Service.update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(prev =>
            prev.map(p => p.id !== existingPerson.id ? p : returnedPerson)
          )
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error updating person:', error)
        })
  
      return
    }
  
    Service.create(newPerson)
      .then(returnedPerson => {
        setPersons(prev => prev.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error creating person:', error)
      })
  }

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    
    if (!confirmDelete) return
  
    Service.remove(id)
      .then(() => {
        setPersons(prev => prev.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting person:', error)
      })
  }


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App