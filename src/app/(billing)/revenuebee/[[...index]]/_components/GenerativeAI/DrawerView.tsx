import { Button, SDrawer } from "cb-sting-react-ts";
import React from "react";

const DrawerView: React.FC = () => {
    const results = {
        title: "hello",
        analysis: "I'm analyzing your request. Here's what I found:",
        sections: [
            {
                title: "Customers Without Payment Methods",
                description: "These customers have no payment method on file",
                count: 58,
                items: []
            },
            {
                title: "Customers With Expired Payment Methods",
                description: "These customers have payment methods that have expired",
                count: 24,
                items: []
            },
            {
                title: "Customers With Soon-to-Expire Payment Methods",
                description: "These customers have payment methods that will expire in the next 30 days",
                count: 37,
                items: []
            }
        ]
    };

    return (
        <div className="s-space-y-4">
            <SDrawer
                onOpenChange={function Ma(){}}
            >
                <SDrawer.Trigger asChild>
                    <Button>
                        Open Drawer
                    </Button>
                </SDrawer.Trigger>
                <SDrawer.Content
                    className=""
                    height="full"
                    placement="right"
                    showCloseIcon
                    size="wide"
                >
                    <SDrawer.Header
                        showCloseIcon
                    >
                        <SDrawer.Title>
                            Drawer Title
                        </SDrawer.Title>
                        <SDrawer.Description>
                            Drawer description goes here.
                        </SDrawer.Description>
                    </SDrawer.Header>
                    <div className="s-p-6">
                        <div className="s-space-y-4">
                            <div className="s-p-4 s-bg-slate-100 s-rounded-lg">
                                <h3 className="s-font-medium s-mb-2">
                                    Current Configuration:
                                </h3>
                                <ul className="s-text-sm s-space-y-1">
                                    <li>
                                        Open State: Closed
                                    </li>
                                    <li>
                                        Placement: right
                                    </li>
                                    <li>
                                        Size: regular
                                    </li>
                                    <li>
                                        Height: full
                                    </li>
                                </ul>
                            </div>
                            <div className="s-p-4 s-bg-slate-100 s-rounded-lg">
                                <h3 className="s-font-medium s-mb-2">
                                    Implementation Code:
                                </h3>
                                <pre className="s-text-sm s-bg-slate-800 s-text-slate-50 s-p-4 s-rounded-md s-overflow-x-auto">
              {`
              const [open, setOpen] = useState(false);
              
              <SDrawer open={open} onOpenChange={setOpen}>
                <SDrawer.Trigger asChild>
                  <Button>Open Drawer</Button>
                </SDrawer.Trigger>
                <SDrawer.Content 
                  placement="right"
                  size="regular"
                  height="full"
                  showCloseIcon={true}
                  
                >
                  <SDrawer.Header>
                    <SDrawer.Title>Drawer Title</SDrawer.Title>
                    <SDrawer.Description>Drawer description goes here.</SDrawer.Description>
                  </SDrawer.Header>
                  <div className="s-p-6">
                    {/* Your content here */}
                  </div>
                  <SDrawer.Footer>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </SDrawer.Footer>
                </SDrawer.Content>
              </SDrawer>`}
            </pre>
                            </div>
                        </div>
                    </div>
                    <SDrawer.Footer>
                        <Button onClick={function Ma(){}}>
                            Cancel
                        </Button>
                        <Button onClick={function Ma(){}}>
                            Confirm
                        </Button>
                    </SDrawer.Footer>
                </SDrawer.Content>
            </SDrawer>
        </div>
    );
};

export default DrawerView;