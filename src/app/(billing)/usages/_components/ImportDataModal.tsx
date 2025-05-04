'use client'

import { InformationCircleIcon,PlusIcon } from '@heroicons/react/24/outline'
import { Button, Card, Link, Modal, ModalClose, ModalContent, ModalTrigger } from 'cb-sting-react-ts'

export const ImportDataModal = () => {
  // const 
  const ProgressBar = () => {
    return(<>
    <div className="w-full  bg-gray-200 rounded-full h-1 relative overflow-hidden">
            <div className="bg-blue-500 h-1 rounded-full w-1/2 animate-slide"></div>
          </div>
    </>)
  }
   const FileUploadComponent = ({onFileChange, state}) => {
    return (
      <>
        <div className="w-full">
          <div className="p-4 pb-6 bg-neutral-25 border border-dashed border-neutral-200 rounded h-full flex items-stretch">
            <div className="self-center text-center w-full" >
            <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={onFileChange}
      /><label
      htmlFor="file-upload"
      // className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
    >
              <Button variant={"neutral"} styleType={"text"} >
                <PlusIcon /> Drop your file here or click to upload Drop your 
              </Button>
              <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
                .csv
              </div>
            { state == 'uploading' && <ProgressBar />}
              
              <div className="max-w-md mx-auto text-neutral-600 leading-5 px-12 pt-2 text-center">
                Max ## MB
              </div></label>
            </div>
            
          </div>
        </div>
      </>
    );
  };
  return (
    <Modal onOpenChange={() => {}}>
    <ModalTrigger>
      <Button
        onClick={() => {}}
        size="regular"
        styleType="default"
        variant="primary"
      >
        Open
      </Button>
    </ModalTrigger>
    <ModalContent
      
      hasCloseIcon
      onOpenChange={() => {}}
      size="small"
      space="large"
      title="Import events data"
      variant="default"
    >
      

       <div className='w-full space-y-large'>
       <div className=' flex gap-regular'>
            <InformationCircleIcon className='size-5 ' />
            <div className=' text-lg items-center'>
            Ensure your data includes Subscription ID, Event ID, and Timestamp as attributes
            </div>
        </div>

        <FileUploadComponent onFileChange={console.log()} state="uploading"/>
        <p className='text-neutral-400 leading-none text-right text-sm'>Your data is secure.</p>

        <div className='  w-full'><Button fullWidth>Upload</Button></div>

        <div className='flex justify-center'><Link href='#' className='font-semibold text-lg'>Send events via API</Link></div>
       </div>

       <ModalClose>
        
      </ModalClose>
    </ModalContent>
  </Modal>
  )
}


