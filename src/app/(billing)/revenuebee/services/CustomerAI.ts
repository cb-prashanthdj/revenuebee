// services/CustomerAI.ts

// Type definitions
export interface Customer {
    id: number;
    name: string;
    email: string;
    mrr: number;
    status: 'active' | 'at_risk' | 'churned';
    paymentMethod?: {
        type: string;
        isExpired: boolean;
        expiresIn: number;
    } | null;
    lastActivity: number; // days since last activity
}

interface AnalysisResult {
    customerCount: number;
    statusBreakdown: {
        active: number;
        at_risk: number;
        churned: number;
    };
    paymentIssues: {
        missing: {
            count: number;
            items: Customer[];
        };
        expired: {
            count: number;
            items: Customer[];
        };
        expiring: {
            count: number;
            items: Customer[];
        };
    };
    revenueMetrics: {
        totalMRR: number;
        averageMRR: number;
        mrAtRisk: number;
        percentageAtRisk: number;
    };
}

interface AIResponse {
    title: string;
    analysis: string;
    sections: Array<{
        title: string;
        description: string;
        count: number;
        items: Customer[];
    }>;
    recommendation: string;
}

export class CustomerAnalyzer {
    // Make the customerData property public for direct access
    public customerData: Customer[] = [
        {
            id: 1,
            name: 'Acme Corp',
            email: 'billing@acmecorp.com',
            mrr: 1200,
            status: 'active',
            paymentMethod: { type: 'credit_card', isExpired: false, expiresIn: 45 },
            lastActivity: 5
        },
        {
            id: 2,
            name: 'Global Tech',
            email: 'accounts@globaltech.com',
            mrr: 2500,
            status: 'at_risk',
            paymentMethod: { type: 'credit_card', isExpired: true, expiresIn: -10 },
            lastActivity: 15
        },
        {
            id: 3,
            name: 'Initech LLC',
            email: 'finance@initech.com',
            mrr: 980,
            status: 'active',
            paymentMethod: null,
            lastActivity: 8
        },
        {
            id: 4,
            name: 'Massive Dynamic',
            email: 'billing@massivedynamic.com',
            mrr: 5400,
            status: 'active',
            paymentMethod: { type: 'bank_transfer', isExpired: false, expiresIn: 180 },
            lastActivity: 2
        },
        {
            id: 5,
            name: 'Cyberdyne Systems',
            email: 'ar@cyberdyne.com',
            mrr: 3200,
            status: 'active',
            paymentMethod: { type: 'credit_card', isExpired: false, expiresIn: 12 },
            lastActivity: 4
        },
        {
            id: 6,
            name: 'Umbrella Corp',
            email: 'payments@umbrella.com',
            mrr: 1800,
            status: 'churned',
            paymentMethod: { type: 'credit_card', isExpired: true, expiresIn: -45 },
            lastActivity: 60
        },
        {
            id: 7,
            name: 'Stark Industries',
            email: 'accounting@stark.com',
            mrr: 8900,
            status: 'active',
            paymentMethod: { type: 'bank_transfer', isExpired: false, expiresIn: 90 },
            lastActivity: 1
        },
        {
            id: 8,
            name: 'Wayne Enterprises',
            email: 'ap@wayne.com',
            mrr: 7500,
            status: 'at_risk',
            paymentMethod: null,
            lastActivity: 30
        },
        {
            id: 9,
            name: 'Hooli',
            email: 'billing@hooli.com',
            mrr: 4200,
            status: 'active',
            paymentMethod: { type: 'credit_card', isExpired: false, expiresIn: 5 },
            lastActivity: 3
        },
        {
            id: 10,
            name: 'Pied Piper',
            email: 'richard@piedpiper.com',
            mrr: 950,
            status: 'churned',
            paymentMethod: { type: 'credit_card', isExpired: true, expiresIn: -5 },
            lastActivity: 45
        },
        {
            id: 11,
            name: 'Dunder Mifflin',
            email: 'accounting@dundermifflin.com',
            mrr: 1100,
            status: 'active',
            paymentMethod: { type: 'bank_transfer', isExpired: false, expiresIn: 60 },
            lastActivity: 7
        }
    ];

    constructor() {
        console.log('CustomerAnalyzer initialized with sample data');
    }

    // Analyze customer data to get comprehensive statistics
    analyzeCustomerData(customers: Customer[]): AnalysisResult {
        // Count customers by status
        const statusCounts = {
            active: customers.filter(c => c.status === 'active').length,
            at_risk: customers.filter(c => c.status === 'at_risk').length,
            churned: customers.filter(c => c.status === 'churned').length
        };

        // Payment method issues
        const missingPaymentMethod = customers.filter(c => !c.paymentMethod);
        const expiredPaymentMethods = customers.filter(c => c.paymentMethod?.isExpired);
        const soonToExpirePaymentMethods = customers.filter(c =>
            c.paymentMethod && !c.paymentMethod.isExpired && c.paymentMethod.expiresIn < 30
        );

        // MRR analysis
        const totalMRR = customers.reduce((sum, c) => sum + c.mrr, 0);
        const activeCustomerCount = customers.filter(c => c.status === 'active').length;
        const averageMRR = activeCustomerCount > 0 ?
            totalMRR / activeCustomerCount :
            0;

        const mrAtRisk = customers
            .filter(c => c.status === 'at_risk')
            .reduce((sum, c) => sum + c.mrr, 0);

        return {
            customerCount: customers.length,
            statusBreakdown: statusCounts,
            paymentIssues: {
                missing: {
                    count: missingPaymentMethod.length,
                    items: missingPaymentMethod
                },
                expired: {
                    count: expiredPaymentMethods.length,
                    items: expiredPaymentMethods
                },
                expiring: {
                    count: soonToExpirePaymentMethods.length,
                    items: soonToExpirePaymentMethods
                }
            },
            revenueMetrics: {
                totalMRR,
                averageMRR,
                mrAtRisk,
                percentageAtRisk: totalMRR > 0 ? (mrAtRisk / totalMRR) * 100 : 0
            }
        };
    }

    // Generate AI response based on a user query
    generateResponse(query: string): AIResponse {
        // Analyze current sample customer data
        const analysis = this.analyzeCustomerData(this.customerData);

        // Default response structure
        let response: AIResponse = {
            title: query,
            analysis: "I'm analyzing your request. Here's what I found:",
            sections: [],
            recommendation: ""
        };

        // Simple pattern matching for different query types
        const q = query.toLowerCase();

        // Payment method query
        if (q.includes('payment') || q.includes('subscription') || q.includes('expired')) {
            response.sections = [
                {
                    title: "Customers Without Payment Methods",
                    description: "These customers have no payment method on file",
                    count: analysis.paymentIssues.missing.count,
                    items: analysis.paymentIssues.missing.items
                },
                {
                    title: "Customers With Expired Payment Methods",
                    description: "These customers have payment methods that have expired",
                    count: analysis.paymentIssues.expired.count,
                    items: analysis.paymentIssues.expired.items
                },
                {
                    title: "Customers With Soon-to-Expire Payment Methods",
                    description: "These customers have payment methods that will expire in the next 30 days",
                    count: analysis.paymentIssues.expiring.count,
                    items: analysis.paymentIssues.expiring.items
                }
            ];

            response.recommendation = "Consider automating payment method update reminders to reduce revenue at risk.";
        }
        // Risk or churn query
        else if (q.includes('risk') || q.includes('churn') || q.includes('at risk')) {
            const atRiskCustomers = this.customerData.filter(c => c.status === 'at_risk');
            const highMRRAtRisk = [...atRiskCustomers].sort((a, b) => b.mrr - a.mrr);

            response.sections = [
                {
                    title: "At-Risk Customers Summary",
                    description: `You have ${atRiskCustomers.length} customers at risk of churning`,
                    count: atRiskCustomers.length,
                    items: atRiskCustomers
                },
                {
                    title: "MRR at Risk",
                    description: `$${analysis.revenueMetrics.mrAtRisk.toLocaleString()} in monthly recurring revenue is at risk`,
                    count: Math.round(analysis.revenueMetrics.mrAtRisk),
                    items: []
                },
                {
                    title: "High-Value At-Risk Customers",
                    description: "These are your highest MRR customers at risk of churning",
                    count: highMRRAtRisk.length,
                    items: highMRRAtRisk.slice(0, 5)  // Top 5
                }
            ];

            response.recommendation = "Schedule account reviews with high-value at-risk customers within the next 7 days.";
        }
        // Revenue or MRR query
        else if (q.includes('revenue') || q.includes('mrr') || q.includes('money')) {
            const activeCustomers = this.customerData.filter(c => c.status === 'active');
            const topMRRCustomers = [...this.customerData].sort((a, b) => b.mrr - a.mrr);

            response.sections = [
                {
                    title: "Revenue Overview",
                    description: `Total MRR: $${analysis.revenueMetrics.totalMRR.toLocaleString()}`,
                    count: Math.round(analysis.revenueMetrics.totalMRR),
                    items: []
                },
                {
                    title: "Active Customers",
                    description: `You have ${activeCustomers.length} active customers with an average MRR of $${Math.round(analysis.revenueMetrics.averageMRR).toLocaleString()}`,
                    count: activeCustomers.length,
                    items: activeCustomers
                },
                {
                    title: "Top Customers by MRR",
                    description: "These are your highest value customers",
                    count: topMRRCustomers.length > 5 ? 5 : topMRRCustomers.length,
                    items: topMRRCustomers.slice(0, 5)  // Top 5
                }
            ];

            response.recommendation = "Consider implementing a tiered customer success program focusing on your top 20% of customers by MRR.";
        }
        // Customer-related query
        else if (q.includes('customer') || q.includes('client') || q.includes('account')) {
            const activeCustomers = this.customerData.filter(c => c.status === 'active');
            const recentlyActiveCustomers = [...this.customerData]
                .sort((a, b) => a.lastActivity - b.lastActivity)
                .slice(0, 5);

            response.sections = [
                {
                    title: "Customer Status Overview",
                    description: `Active: ${analysis.statusBreakdown.active}, At Risk: ${analysis.statusBreakdown.at_risk}, Churned: ${analysis.statusBreakdown.churned}`,
                    count: analysis.customerCount,
                    items: []
                },
                {
                    title: "Active Customers",
                    description: `${activeCustomers.length} customers are currently active`,
                    count: activeCustomers.length,
                    items: activeCustomers
                },
                {
                    title: "Recently Active Customers",
                    description: "These customers have been active in the last few days",
                    count: recentlyActiveCustomers.length,
                    items: recentlyActiveCustomers
                }
            ];

            response.recommendation = "Consider implementing a customer health score system to proactively identify at-risk customers.";
        }
        // Default/general query
        else {
            response.sections = [
                {
                    title: "Customer Status Overview",
                    description: `Active: ${analysis.statusBreakdown.active}, At Risk: ${analysis.statusBreakdown.at_risk}, Churned: ${analysis.statusBreakdown.churned}`,
                    count: analysis.customerCount,
                    items: []
                },
                {
                    title: "Payment Method Issues",
                    description: `${analysis.paymentIssues.missing.count + analysis.paymentIssues.expired.count + analysis.paymentIssues.expiring.count} customers have payment method issues`,
                    count: analysis.paymentIssues.missing.count + analysis.paymentIssues.expired.count + analysis.paymentIssues.expiring.count,
                    items: [
                        ...analysis.paymentIssues.missing.items,
                        ...analysis.paymentIssues.expired.items,
                        ...analysis.paymentIssues.expiring.items
                    ]
                },
                {
                    title: "Revenue Summary",
                    description: `Total MRR: $${analysis.revenueMetrics.totalMRR.toLocaleString()}, with ${analysis.revenueMetrics.percentageAtRisk.toFixed(1)}% at risk`,
                    count: Math.round(analysis.revenueMetrics.totalMRR),
                    items: []
                }
            ];

            response.recommendation = "Focus on resolving payment method issues to secure revenue and implement a customer health scoring system to reduce churn.";
        }

        return response;
    }

    // Helper method to get filtered customers based on criteria
    getFilteredCustomers(criteria: string): Customer[] {
        if (criteria.toLowerCase().includes('without payment')) {
            return this.customerData.filter(c => !c.paymentMethod);
        } else if (criteria.toLowerCase().includes('expired')) {
            return this.customerData.filter(c => c.paymentMethod?.isExpired);
        } else if (criteria.toLowerCase().includes('soon-to-expire')) {
            return this.customerData.filter(c =>
                c.paymentMethod &&
                !c.paymentMethod.isExpired &&
                c.paymentMethod.expiresIn < 30
            );
        } else if (criteria.toLowerCase().includes('at risk')) {
            return this.customerData.filter(c => c.status === 'at_risk');
        } else if (criteria.toLowerCase().includes('active')) {
            return this.customerData.filter(c => c.status === 'active');
        } else if (criteria.toLowerCase().includes('churned')) {
            return this.customerData.filter(c => c.status === 'churned');
        }

        // Default return all customers
        return this.customerData;
    }
}

// Export a singleton instance
export default new CustomerAnalyzer();