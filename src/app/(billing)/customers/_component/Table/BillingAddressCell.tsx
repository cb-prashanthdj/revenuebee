// Component to display billing address

interface BillingAddress {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  zip: string;
}
export const BillingAddressCell = ({
  addresses,
}: {
  addresses: BillingAddress[];
}) => {
  if (!addresses || addresses.length === 0) {
    return <span className="text-gray-400">-</span>;
  }

  return (
    <div className="flex">
      {addresses.map((address, index) => {
        // Filter out empty address lines
        const addressLines = [
          address.addressLine1,
          address.addressLine2,
          address.addressLine3,
        ].filter((line) => line.trim() !== "");

        return (
          <div key={index} className="flex gap-1 text-neutral-600">
            {address.company && <div className="">{address.company},</div>}
            {addressLines.map((line, lineIndex) => (
              <div key={lineIndex} className="">
                {line},
              </div>
            ))}
            <div className="">
              {address.city}, {address.zip},
            </div>
            <div className="">{address.country}.</div>
          </div>
        );
      })}
    </div>
  );
};
