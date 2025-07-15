import { countries } from '../../data/countries'
import styles from './Form.module.css'
export default function Form() {
  return (
    <>
      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="city"> City:</label>
          <input type="text" id="city" name="city" placeholder="City" />
        </div>
        <div className={styles.field}>
          <label htmlFor="country"> Country: </label>
          <select name="country" id="country">
            <option value=""> --Select one Country --</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <input type="submit" value="Consult Wheater" />
        </div>
      </form>
    </>
  )
}
