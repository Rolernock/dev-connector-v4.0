import { format } from 'date-fns'

export default function ProfileExperience({
  experience: { company, title, to, from, description }
}) {
  const toDate = to ? format(new Date(to), 'yyyy/MM/dd') : 'Now'
  const fromDate = format(new Date(from), 'yyyy/MM/dd')
  return (
    <>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {fromDate} - {toDate}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  )
}
