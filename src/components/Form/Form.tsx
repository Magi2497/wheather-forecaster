import { useState } from 'react'
import type { SearchType } from '../../types'
import { countries } from '../../data/countries'
import styles from './Form.module.css'
export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: '',
  })

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

  return (
    <>
      <form className={styles.form}>
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
