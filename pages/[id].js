import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import rabbani from '@/assets/rabbaniSIgn.png'
import kaushik from '@/assets/kaushikSign.png'
import Image from 'next/image'
import Head from 'next/head'

export default function Certificate() {
  const router = useRouter()

  const {
    query: { id },
  } = router

  // States
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const res = await getDoc(doc(db, 'certificates', id))
        if (res.exists()) {
          setData(res.data())
        } else {
          setData({})
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    id && handleFetch()
  }, [id])

  // const titleName = data?.name
  //   ? `${data?.name}'s Certificate`
  //   : 'CWBCertificate'

  return (
    <>
      {/* <Head>
        <title>{titleName}</title>
      </Head> */}
      <div className="certificateContainer">
        {loading ? (
          <p className="loading">Getting Data...</p>
        ) : !data?.name ? (
          <p className="loading">No Data Found</p>
        ) : (
          <div className="certificate">
            <h1>Certificate of {data?.type}</h1>
            <p className="content">
              This certificate of membership is awarded to{' '}
              <strong>{data?.name}</strong> in recognition of their membership
              in our organization,{' '}
              <a
                href="https://www.canwebe.tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                CanWeBe!
              </a>
              . Our organization specializes in creating innovative, cost-free
              applications that solve everyday problems, making a positive
              impact on society. Given{' '}
              {moment(data?.date).format('Do [of] MMMM YYYY')} signed by,
            </p>
            <div className="signDiv">
              <div className="sign">
                <Image
                  src={rabbani}
                  alt="Rabbani's sign"
                  width={150}
                  height={56.26}
                  placeholder="blur"
                />
                <p className="name">Golam Rabbani</p>
                <p className="position">Founder</p>
              </div>
              <div className="sign">
                <Image
                  src={kaushik}
                  alt="Kaushik's sign"
                  width={150}
                  height={56.26}
                  placeholder="blur"
                />
                <p className="name">Kaushik Das</p>
                <p className="position">Co-Founder</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
