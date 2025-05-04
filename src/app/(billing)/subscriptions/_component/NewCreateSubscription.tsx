import React, { useState } from "react";
import {
  Button,
  Input as InputField,
  RadioGroup,
  CheckList,
  Toggle,
  Card,
  ContainedList,
} from "cb-sting-react-ts";
// import { DropdownMenu } from 'cb-sting-react-ts/';
import { PlusIcon } from "@heroicons/react/24/outline";

interface BillingAddress {
  country: string;
  firstName: string;
  lastName: string;
  emailId: string;
  company: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  postalZipCode: string;
}

interface TaxDetails {
  taxRegNumber: string;
  isTaxExempt: boolean;
}

const NewCustomerSections = [
  "Customer Info",
  "Additional contacts",
  "Essentials",
  "Payment Options",
  "Billing Address",
  "Tax Details",
  "",
].map((section) => ({ label: section, value: section }));

function NewSubscriptionForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const [customerId, setCustomerId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const [language, setLanguage] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [autoCollection, setAutoCollection] = useState<string[]>([]);

  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    country: "",
    firstName: "",
    lastName: "",
    emailId: "",
    company: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    postalZipCode: "",
  });

  const [taxDetails, setTaxDetails] = useState<TaxDetails>({
    taxRegNumber: "",
    isTaxExempt: false,
  });

  const handlePaymentOptionToggle = (value: string) => {
    if (paymentOptions.includes(value)) {
      setPaymentOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    } else {
      setPaymentOptions((prevOptions) => [...prevOptions, value]);
    }
  };

  const handleBillingInputChange = (field: string, value: string) => {
    setBillingAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleTaxInputChange = (field: string, value: string) => {
    setTaxDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleTaxExemptToggle = (value: boolean) => {
    setTaxDetails((prevState) => ({
      ...prevState,
      isTaxExempt: !prevState.isTaxExempt,
    }));
  };

  const handleSave = () => {
    console.log("Customer saved!");
    onCloseModal && onCloseModal();
  };

  const handleDismiss = () => {
    console.log("Dismissed!");
    onCloseModal && onCloseModal();
  };

  const customerInfoForm = (
    <div className="space-y-2 w-full">
      <div className="flex gap-4 w-full">
        {/* <InputField
                    label="Customer ID"
                    size="large"
                    value={customerId}
                    onChange={e => setCustomerId(e.target.value)}
                    placeholder="Enter Customer ID"
                    message="You can change the auto generated id" /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          className="w-full"
          label="default"
          labelText="Customer ID"
          messageText="You can change the auto generated id"
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter Customer ID"
          type="text"
          variant="input"
        />
      </div>
      <div className="flex gap-4 ">
        {/* <InputField
                    label="First Name"
                    size="large"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Enter First Name" />
                <InputField
                    label="Last Name"
                    size="large"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Enter Last Name" /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          className="w-1/2"
          labelText="First Name"
          onChangeLogic={() => {}}
          placeholder="Enter First Name"
          type="text"
          variant="input"
        />
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          className="w-1/2"
          labelText="First Name"
          onChangeLogic={() => {}}
          placeholder="Enter Last Name"
          type="text"
          variant="input"
        />
      </div>
      <div className="flex gap-4 ">
        {/* <InputField
                    label="Email"
                    size="large"
                    value={emailId}
                    onChange={e => setEmailId(e.target.value)}
                    placeholder="Enter Email" /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          className="w-full"
          labelText="Label"
          onChangeLogic={() => {}}
          placeholder="Enter First Name"
          type="text"
          variant="input"
        />
      </div>
      <div className="flex gap-4 w-96">
        {/* <InputField
                    label="Company"
                    size="large"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Enter Company Name" /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Company"
          onChangeLogic={() => {}}
          placeholder="Enter Company Name"
          type="text"
          variant="input"
        />
      </div>
      <div className="flex gap-4 w-56">
        {/* <InputField
                    label="Phone"
                    size="large"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter Phone Number" /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Phone"
          onChangeLogic={() => {}}
          placeholder="Enter Last Name"
          type="number"
          variant="input"
        />
      </div>
    </div>
  );

  const additionalContactsContent = (
    <div className="space-y-2">
      <p>
        Add team members to whom you’d like to send invoice, payment, and
        subscription-related emails.
      </p>
      <Button
        variant="neutral"
        size="regular"
        // showIcon={true}

        // label="Add Contact"
      >
        <PlusIcon /> Add Contact
      </Button>
    </div>
  );

  const essentialsContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="w-96 space-y-1">
          <h4 className="h6 text-regular">Auto-collection</h4>
          <p className="text-lightest">
            Auto-collection lets you automatically attempt to charge a
            customer’s payment method whenever an invoice is created.
          </p>
        </div>
        <Toggle size="regular" addons={["action-text"]} state="enabled" />
      </div>
    </div>
  );

  const paymentOptionsContent = (
    <div className="space-y-2 max-w-lg">
      <CheckList
        align="horizontal"
        listDescription=""
        onChangeLogic={() => {}}
        title=""
        variant="contained"
        width="full"
      >
          <CheckList.Item value="option1"><div>Allow customers to pay via their bank account</div></CheckList.Item>
      </CheckList>
    </div>
  );

  const countries = ["USA", "Canada", "UK"];

  const billingAddressContent = (
    <div className="space-y-2">
      <div className="flex gap-4 w-56">
        {/* <Dropdown
                    label="Country"
                    size="large"
                    options={countries}
                    selectedOption={billingAddress.country}
                    onOptionSelect={value => handleBillingInputChange('country', value)}
                /> */}
        {/* <DropdownMenu
                    label="default"
                    // onChangeLogic={() => { }}
                    options={[
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]}
                    placeholder="Select an option"
                    size="regular"
                    withIcon
                /> */}
      </div>
      <div className="flex gap-4 w-1/2">
        {/* <InputField label="First Name" size="large" value={billingAddress.firstName} onChange={e => handleBillingInputChange('firstName', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="First Name"
          onChangeLogic={() => {}}
          placeholder="Enter First Name"
          type="text"
          variant="input"
        />
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Last Name"
          onChangeLogic={() => {}}
          placeholder="Enter Last Name"
          type="text"
          variant="input"
        />
        {/* <InputField label="Last Name" size="large" value={billingAddress.lastName} onChange={e => handleBillingInputChange('lastName', e.target.value)} /> */}
      </div>
      <div className="flex gap-4 w-96">
        {/* <InputField label="Email" size="large" value={billingAddress.emailId} onChange={e => handleBillingInputChange('email', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Email"
          onChangeLogic={() => {}}
          placeholder="Enter Email"
          type="text"
          variant="input"
        />
      </div>
      <div className="flex gap-4 w-96">
        {/* <InputField label="Company" size="large" value={billingAddress.company} onChange={e => handleBillingInputChange('company', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Company"
          onChangeLogic={() => {}}
          placeholder="Enter Company Name"
          type="text"
          variant="input"
        />
      </div>

      <div className="flex gap-4 w-56">
        {/* <InputField label="Phone" size="large" value={billingAddress.phone} onChange={e => handleBillingInputChange('phone', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Phone"
          onChangeLogic={() => {}}
          placeholder="Enter Phone"
          type="number"
          variant="input"
        />
      </div>
      <div className="w-2/3 space-y-2">
        {/* <InputField label="Address line 1" size="large" value={billingAddress.addressLine1} onChange={e => handleBillingInputChange('addressLine1', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Address line 1"
          onChangeLogic={() => {}}
          placeholder="Enter Address line 1"
          type="text"
          variant="input"
        />
        {/* <InputField label="Address line 2" size="large" value={billingAddress.addressLine2} onChange={e => handleBillingInputChange('addressLine2', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Address line 2"
          onChangeLogic={() => {}}
          placeholder="Enter Address line 2"
          type="text"
          variant="input"
        />
        {/* <InputField label="Address line 3" size="large" value={billingAddress.addressLine3} onChange={e => handleBillingInputChange('addressLine3', e.target.value)} /> */}
        <InputField
          inputSize="large"
          inputWidth="inline"
          label="default"
          labelText="Address line 3"
          onChangeLogic={() => {}}
          placeholder="Enter Address line 3"
          type="text"
          variant="input"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex gap-4 w-64">
          {/* <InputField label="City" size="large" value={billingAddress.city} onChange={e => handleBillingInputChange('city', e.target.value)} /> */}
          <InputField
            inputSize="large"
            inputWidth="inline"
            label="default"
            labelText="City"
            onChangeLogic={() => {}}
            placeholder="Enter City"
            type="text"
            variant="input"
          />
        </div>
        <div className="flex gap-4 w-40">
          {/* <InputField label="Postal/Zip code" size="large" value={billingAddress.postalZipCode} onChange={e => handleBillingInputChange('postalZipCode', e.target.value)} /> */}
          <InputField
            inputSize="large"
            inputWidth="inline"
            label="default"
            labelText="Postal/Zip code"
            onChangeLogic={() => {}}
            placeholder="Enter Postal/Zip code"
            type="number"
            variant="input"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-grid ">
      <div className="col-lg-sm ">
        <div className="large">
          <div className="customer-info ">
            <Card background="white" depth="flat" padding="regular">
              <h5>Create Subscription</h5>
              {customerInfoForm}
            </Card>
          </div>

          <Card
            background="white"
            depth="flat"
            padding="regular"
            className="w-full"
          >
            <div className="flex gap-2 flex-col">
              <h5>Additional contacts</h5>
              {additionalContactsContent}
            </div>
          </Card>

          <Card background="white" depth="flat" padding="regular">
            <div className="flex gap-2 flex-col">
              <h5>Essentials</h5>
              {essentialsContent}
            </div>
          </Card>

          <Card background="white" depth="flat" padding="regular">
            <div className="flex gap-2 flex-col">
              <h5>Payment Options</h5>
              {paymentOptionsContent}
            </div>
          </Card>

          <Card background="white" depth="flat" padding="regular">
            <div className="flex gap-2 flex-col">
              <h5>Billing Address</h5>
              {billingAddressContent}
            </div>
          </Card>
        </div>
        <div className="small"></div>
      </div>
    </div>
  );
}

export default NewSubscriptionForm;
