import { FadeLoader } from 'react-spinners'

export default function Spinner() {
  const override = {
    display: 'flex',
    margin: 'auto'
  }
  return (
    <div>
      <FadeLoader cssOverride={override} size={150} />
    </div>
  )
}
