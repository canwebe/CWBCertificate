import { db } from '@/lib/firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  // Router
  const router = useRouter()

  // Local States
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = prompt('Enter the admin passcode?')
    if (password !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      return
    }

    if (type !== 'membership') {
      alert('Currently only mebership certificate available')
      return
    }

    try {
      setLoading(true)
      const docSnap = await addDoc(collection(db, 'certficates'), {
        name,
        type,
        date,
      })

      setLoading(false)
      router.push('/' + docSnap.id)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className="homeContainer">
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <label htmlFor="name">Recipient Name</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Eg: Golam Rabbani"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="twoDiv">
          <div className="formDiv">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="membership">Membership</option>
              <option value="experience">Experience</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="formDiv">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <button disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
      </form>
    </div>
  )
}
