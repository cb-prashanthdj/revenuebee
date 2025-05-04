// Component to display billing address

interface NetPayment {
  amount: number;
  unpaidAmount: number;
  currency: string;
}
export const NetPaymentCell = ({ netPayment }: { netPayment: NetPayment }) => {
  if (!netPayment.amount || netPayment.amount === 0) {
    return <span className="text-gray-400">-</span>;
  }

  return (
    <div className="flex gap-1 text-neutral-600">
      {netPayment.amount && (
        <div className="font-semibold">
          {netPayment.amount}{" "}
          <span className="text-xs font-normal">{netPayment.currency}</span>
        </div>
      )}
      {netPayment.unpaidAmount > 0 && (
        <div className="text-red-400">
          - {netPayment.unpaidAmount} {netPayment.currency}
        </div>
      )}
    </div>
  );
};
