import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'


export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-[#333332]'>
      <h1 className='text-5xl mb-20 text-[#333332] font-LVRegular'>ChatMGF</h1>
      
      {/* ICONS CONTAINER */}
      <div className='flex space-x-2 text-center px-4'>

        {/* Sun Icon Container */}
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <SunIcon className="h-8 w-8 text-pink-600"/>
            <h2 className='font-LVRegular'>Examples</h2>
          </div>
          <div className='font-LVWeb tracking-wide space-y-2'>
            <p className="infoText">{`"How do I learn to code?"`}</p>
            <p className="infoText">{`"What is the difference between Javascript and Phyton?"`}</p>
            <p className="infoText">{`"Why I should hire Nacho?"`}</p>
          </div>
        </div>

        {/* Bolt Icon Container */}
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <BoltIcon className="h-8 w-8 text-purple-700"/>
            <h2 className='font-LVRegular'>Capabilities</h2>
          </div>
          <div className='font-LVWeb tracking-wide space-y-2'>
            <p className="infoText">{`Change the ChatGPT Model to use`}</p>
            <p className="infoText">{`Messages are stored in Firebase' Firestore`}</p>
            <p className="infoText">{`Hot Toast notifications when ChatGPT is thinking!`}</p>
          </div>
        </div>

        
        {/* Exclamation Icon Container */}
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400"/>
            <h2 className='font-LVRegular'>Limitations</h2>
          </div>
          <div className='font-LVWeb tracking-wide space-y-2'>
            <p className="infoText">{`May occasionally generate incorrect information`}</p>
            <p className="infoText">{`May occasionally not know the answer for a question`}</p>
            <p className="infoText">{`Limited knowledge of world and events after 2021`}</p>
          </div>
        </div>
        
      </div>

    </div>
  )
}
