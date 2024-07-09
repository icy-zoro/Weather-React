import {ClipLoader} from 'react-spinners'

export default function DefaultSpinner() {
    return (
        <div className='flex min-h-lvh flex-col items-center justify-center align-middle'>
            <ClipLoader color='blue'/>
        </div>
    )
}
