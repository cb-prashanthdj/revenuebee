import React, {useState} from 'react'
import {SModal, Button, Card, CStackedList, CStackedItem} from 'cb-sting-react-ts'
import {CardHeader} from "@/app/(billing)/subscriptions/_component/Header";

interface AccessRequestProps{
    setAccessRequested?: (requested: boolean) => void
    AccessRequested:boolean
    handleAccessSent?: (requested: boolean) => void
}
const AccessRequest: React.FC<AccessRequestProps>= ({setAccessRequested,AccessRequested,handleAccessSent}) => {

    return (
        <SModal.Root open={AccessRequested}>
            <SModal.Content size={'xsmall'} className={'space-y-6'}>
                <SModal.Header>
                    <h4>Request access from the site owner?</h4>
                </SModal.Header>
                <SModal.Body className="flex flex-col space-y-4">
                    <h6 className={'font-[400]'}>Card Title</h6>
                    <Card padding={"none"}>
                        <CStackedList>
                            <CStackedItem
                                id="p1"
                                leftAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                subTitle="Site Owner"
                                title="carli@chargebee.com"
                                variant="default"
                            />
                        </CStackedList>
                    </Card>
                    <div className={'space-y-4'}>
                        <h6 className={'font-[400]'}>Message</h6>
                        <textarea
                            rows={2}
                            placeholder="Let them know why you need access to site."
                            className={`w-full py-1 px-2 rounded border border-gray-400/70 text-inherit font-[inherit] placeholder:text-gray-400`}
                        ></textarea>
                    </div>
                </SModal.Body>
                <SModal.Footer>
                    <SModal.Close asChild>
                        <Button variant="neutral" onClick={() => setAccessRequested(false)}>
                            Dismiss
                        </Button>
                    </SModal.Close>
                    <Button onClick={() => handleAccessSent(true)}>
                        Request Support
                    </Button>
                </SModal.Footer>
            </SModal.Content>
        </SModal.Root>
    )
}

export  {AccessRequest}
