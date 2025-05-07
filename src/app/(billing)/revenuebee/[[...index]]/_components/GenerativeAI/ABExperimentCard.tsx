export default function ABExperimentCard() {
  return (
    <div className="bg-white shadow-sm w-full max-w-6xl overflow-y-auto">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">A/B Experiment Details</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Experiment Title */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold">
            Free to Paid – US (with offer) vs EU (no offer)
          </h2>
          <p className="text-gray-600">Started on May 6, 2025</p>
        </div>

        {/* Variants Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Variant A */}
          <div className="border rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold">
                Variant A: US Customers (with 10% discount)
              </h3>
              <p className="text-gray-600">Emails sent: 350</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Email Open Rate</span>
                  <span className="font-semibold">73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: "73%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Click-through Rate</span>
                  <span className="font-semibold">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: "42%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Conversion Rate</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Conversions: 53 customers</p>
              <p className="font-semibold">Revenue Generated: $9,540</p>
            </div>
          </div>

          {/* Variant B */}
          <div className="border rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold">
                Variant B: EU Customers (no discount)
              </h3>
              <p className="text-gray-600">Emails sent: 200</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Email Open Rate</span>
                  <span className="font-semibold">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Click-through Rate</span>
                  <span className="font-semibold">31%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: "31%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Conversion Rate</span>
                  <span className="font-semibold">8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: "8%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Conversions: 16 customers</p>
              <p className="font-semibold">Revenue Generated: $3,200</p>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold">Results Summary</h3>
            <p className="text-gray-600">Experiment duration: 14 days</p>
          </div>

          <p className="font-semibold">
            Variant A (with discount) shows a 87.5% higher conversion rate
            compared to Variant B (no discount).
          </p>

          <p>
            The 10% discount offer has resulted in significantly higher
            engagement and conversion metrics across all stages of the funnel.
            Despite the discount reducing the initial revenue per customer, the
            higher volume of conversions has led to an overall revenue increase.
          </p>

          <div>
            <span className="font-semibold">Recommendation:</span> Extend the
            discount offer to EU customers to increase overall conversion rate
            and revenue.
          </div>
        </div>
      </div>
    </div>
  );
}
