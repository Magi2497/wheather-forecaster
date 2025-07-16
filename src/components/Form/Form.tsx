import React, { useState } from 'react'
import type { SearchType } from '../../types'
import { countries } from '../../data/countries'
import styles from './Form.module.css'
import Alert from '../Alert/Alert'
export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: '',
  })
  const [alert, setAlert] = useState('')
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(search).includes('')) {
      setAlert('All the fields are required')
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {alert && <Alert>{alert}</Alert>}

        <div className={styles.field}>
          <label htmlFor="city"> City:</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Type a city"
            value={search.city}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="country"> Country: </label>
          <select
            name="country"
            id="country"
            value={search.country}
            onChange={handleChange}
          >
            <option value=""> --Select one Country --</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <input
            type="submit"
            className={styles.submit}
            value="Consult Wheater"
          />
        </div>
      </form>
    </>
  )
}
