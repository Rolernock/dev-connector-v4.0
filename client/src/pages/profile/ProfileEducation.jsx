import { format } from 'date-fns'

export default function ProfileEducation({
  education: { school, degree, fieldofstudy, to, from, description }
}) {
  const toDate = to ? format(new Date(to), 'yyyy/MM/dd') : 'Now'
  const fromDate = format(new Date(from), 'yyyy/MM/dd')
  return (
    <>
      <h3 className='text-dark'>{school}</h3>
      <p>
        {fromDate} - {toDate}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  )
}
