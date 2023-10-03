'use client'

import useSWR from 'swr'
import Select from 'react-select'


const fetchModals = () => fetch("/api/askQuestion", {
  method: "GET",
  headers:{
    "Content-type":"application/json"
  }
}).then(res => res.json())

const ModelSelection = () => {
  
  const { data: models, error, isLoading } = useSWR('/api/askQuestion', fetchModals);
  
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003"
  })
  
  return ( 
    <div>
      <Select
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        onChange={(e)=> setModel(e.value)}
        className='mt-2'
        isLoading={isLoading}
        isSearchable
        menuPosition='fixed'
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 13,
            backgroundColor: "#F8F5F1",
            outline: "none",
            border: "none",
            boxShadow:"none",
          })
        }}
        classNames={{
          control: (state) => "font-LVWeb"
        }}
      />
    </div>
   );
}
 
export default ModelSelection;