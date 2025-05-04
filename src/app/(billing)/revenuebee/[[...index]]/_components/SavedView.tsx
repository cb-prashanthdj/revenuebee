// components/SavedView.tsx
import React from "react";

const SavedView: React.FC = () => {
    // Sample data for saved views
    const savedViews = [
        {
            id: "top-100",
            title: "Top 100 Customers",
            description: "Highest value customers by MRR",
            type: "List"
        },
        {
            id: "deferred-revenue",
            title: "Deferred Revenue",
            description: "Projected future revenue from active subscriptions",
            type: "Report"
        },
        {
            id: "retention-experiments",
            title: "Ongoing Retention Experiments",
            description: "Current retention initiatives and their performance",
            type: "Conversation"
        },
        {
            id: "revenue-dashboard",
            title: "Revenue Dashboard",
            description: "Overall revenue metrics and trends",
            type: "Dashboard"
        },
        {
            id: "overdue-customers",
            title: "Overdue Customers",
            description: "Customers with outstanding payments",
            type: "List"
        },
        {
            id: "creating-experiment",
            title: "Creating an Experiment",
            description: "Retention experiment for churn risk customers.",
            type: "Task"
        }
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Saved Views</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedViews.map((view) => (
                    <div
                        key={view.id}
                        className="border rounded-lg p-6 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer bg-white group"
                    >
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                            {view.title}
                        </h3>
                        <p className="text-gray-600 mb-6 group-hover:text-purple-500 transition-colors">
                            {view.description}
                        </p>

                        <span className="inline-flex text-sm px-3 py-1 bg-gray-100 rounded-full group-hover:bg-purple-100 transition-colors">
              {view.type}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedView;