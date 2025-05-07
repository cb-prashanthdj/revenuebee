// services/CustomerAI.ts

export interface Customer {
    id: string;
    name: string;
    email?: string;
    mrr: number;
    subscriptionId: string;
    subscriptionPlan: string;
    subscriptionStatus: string;
    invoiceId: string;
    invoiceDate: string;
    invoiceStatus: string;
    unpaidReason: string;
    daysOverdue: number;
    paymentMethod: string;
    paymentMethodStatus: string;
}

interface AnalysisResult {
    customerCount: number;
    statusBreakdown: {
        active: number;
        at_risk: number;
        churned: number;
    };
    overdueSummary: {
        lessThan30: {
            count: number;
            items: Customer[];
        };
        between30And60: {
            count: number;
            items: Customer[];
        };
        between60And90: {
            count: number;
            items: Customer[];
        };
        moreThan90: {
            count: number;
            items: Customer[];
        }
    };
    paymentIssues: {
        noPaymentMethod: {
            count: number;
            items: Customer[];
        };
        expiredPaymentMethod: {
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
    suggestedActions?: string[];
}

export class CustomerAnalyzer {
    public customerData: Customer[] = [];
    private dataLoaded: boolean = false;

    constructor() {
        this.loadCustomerData();
    }

    private async loadCustomerData() {
        try {
            // Try to load JSON data from the specified path
            const response = await fetch('../data/IPE_data.json');

            if (response.ok) {
                const jsonData = await response.json();

                // Map JSON data to our Customer interface
                this.customerData = jsonData.map((row: any, index: number) => ({
                    id: row['Customer ID'] || `customer_${index}`,
                    name: row['Customer Name'] || 'Unknown Customer',
                    mrr: parseFloat(row['MRR ($)']) || 0,
                    subscriptionId: row['Subscription ID'] || '',
                    subscriptionPlan: row['Subscription Plan'] || '',
                    subscriptionStatus: row['Subscription Status'] || '',
                    invoiceId: row['Invoice ID'] || '',
                    invoiceDate: row['Invoice Date'] || '',
                    invoiceStatus: row['Invoice Status'] || '',
                    unpaidReason: row['Unpaid Reason'] || '',
                    daysOverdue: parseInt(row['Days Overdue']) || 0,
                    paymentMethod: row['Payment Method'] || '',
                    paymentMethodStatus: row['Payment Method Status'] || ''
                }));

                console.log('JSON data loaded successfully:', this.customerData.length, 'customers');
                this.dataLoaded = true;
            } else {
                console.warn('Could not load JSON data, using fallback data');
                this.setupFallbackData();
            }
        } catch (error) {
            console.error('Error loading customer data:', error);
            this.setupFallbackData();
        }
    }

    // Setup fallback data if JSON cannot be loaded
    private setupFallbackData() {
        // Create sample data to match the counts in screenshots
        this.generateSampleData();

        this.dataLoaded = true;
        console.log('Using fallback data with', this.customerData.length, 'sample customers');
    }

    // Generate sample data to match the counts in screenshots
    private generateSampleData() {
        const companies = [
            "TechSoft", "InnovateCorp", "FutureTech", "DataSystems",
            "MegaCorp", "Skyline Industries", "Quantum Solutions", "GlobalServe",
            "PeakPerformance", "BlueOcean", "RedMountain", "SilverLake",
            "GreenField", "BlackRock", "WhiteSand", "YellowStone"
        ];

        // Generate customers with < 30 days overdue to reach 42 total
        for (let i = 0; i < 42; i++) {
            const company = companies[Math.floor(Math.random() * companies.length)];
            this.customerData.push({
                id: `C${2000 + i}`,
                name: `${company} ${i}`,
                mrr: Math.floor(Math.random() * 5000) + 500,
                subscriptionId: `S${2000 + i}`,
                subscriptionPlan: "Professional",
                subscriptionStatus: "Active",
                invoiceId: `INV${2000 + i}`,
                invoiceDate: "2025-04-15",
                invoiceStatus: "Unpaid",
                unpaidReason: "Customer Delay",
                daysOverdue: Math.floor(Math.random() * 29) + 1,
                paymentMethod: Math.random() > 0.3 ? "Credit Card" : "",
                paymentMethodStatus: Math.random() > 0.5 ? "Active" : "Expired"
            });
        }

        // Generate customers with 30-60 days overdue to reach 28 total
        for (let i = 0; i < 28; i++) {
            const company = companies[Math.floor(Math.random() * companies.length)];
            this.customerData.push({
                id: `C${3000 + i}`,
                name: `${company} ${i}`,
                mrr: Math.floor(Math.random() * 5000) + 500,
                subscriptionId: `S${3000 + i}`,
                subscriptionPlan: "Professional",
                subscriptionStatus: "Active",
                invoiceId: `INV${3000 + i}`,
                invoiceDate: "2025-03-01",
                invoiceStatus: "Unpaid",
                unpaidReason: "Customer Delay",
                daysOverdue: Math.floor(Math.random() * 30) + 30,
                paymentMethod: Math.random() > 0.3 ? "Credit Card" : "",
                paymentMethodStatus: Math.random() > 0.5 ? "Active" : "Expired"
            });
        }

        // Generate customers with 60-90 days overdue to reach 15 total
        for (let i = 0; i < 15; i++) {
            const company = companies[Math.floor(Math.random() * companies.length)];
            this.customerData.push({
                id: `C${4000 + i}`,
                name: `${company} ${i}`,
                mrr: Math.floor(Math.random() * 5000) + 500,
                subscriptionId: `S${4000 + i}`,
                subscriptionPlan: "Professional",
                subscriptionStatus: "At Risk",
                invoiceId: `INV${4000 + i}`,
                invoiceDate: "2025-02-01",
                invoiceStatus: "Unpaid",
                unpaidReason: "Customer Delay",
                daysOverdue: Math.floor(Math.random() * 30) + 60,
                paymentMethod: Math.random() > 0.3 ? "Credit Card" : "",
                paymentMethodStatus: Math.random() > 0.5 ? "Active" : "Expired"
            });
        }

        // Generate customers with > 90 days overdue to reach 9 total
        for (let i = 0; i < 9; i++) {
            const company = companies[Math.floor(Math.random() * companies.length)];
            this.customerData.push({
                id: `C${5000 + i}`,
                name: `${company} ${i}`,
                mrr: Math.floor(Math.random() * 5000) + 500,
                subscriptionId: `S${5000 + i}`,
                subscriptionPlan: "Professional",
                subscriptionStatus: "At Risk",
                invoiceId: `INV${5000 + i}`,
                invoiceDate: "2025-01-01",
                invoiceStatus: "Unpaid",
                unpaidReason: "Customer Delay",
                daysOverdue: Math.floor(Math.random() * 100) + 90,
                paymentMethod: Math.random() > 0.3 ? "Credit Card" : "",
                paymentMethodStatus: Math.random() > 0.5 ? "Active" : "Expired"
            });
        }

        // Generate payment method issues data
        // 24 customers without payment method
        for (let i = 0; i < 24; i++) {
            const existingCustomer = this.customerData[Math.floor(Math.random() * this.customerData.length)];
            existingCustomer.paymentMethod = "";
            existingCustomer.paymentMethodStatus = "";
        }

        // 15 customers with expired payment methods
        for (let i = 0; i < 15; i++) {
            const existingCustomer = this.customerData.find(c => c.paymentMethod !== "");
            if (existingCustomer) {
                existingCustomer.paymentMethodStatus = "Expired";
            }
        }
    }

    // Analyze customer data to get comprehensive statistics
    analyzeCustomerData(): AnalysisResult {
        // For demo purpose, if data not loaded yet, return empty analysis
        if (!this.dataLoaded || this.customerData.length === 0) {
            return this.getEmptyAnalysisResult();
        }

        // Group customers by overdue days
        const lessThan30 = this.customerData.filter(c =>
            c.daysOverdue > 0 && c.daysOverdue < 30 &&
            c.invoiceStatus?.toLowerCase() === 'unpaid');

        const between30And60 = this.customerData.filter(c =>
            c.daysOverdue >= 30 && c.daysOverdue < 60 &&
            c.invoiceStatus?.toLowerCase() === 'unpaid');

        const between60And90 = this.customerData.filter(c =>
            c.daysOverdue >= 60 && c.daysOverdue < 90 &&
            c.invoiceStatus?.toLowerCase() === 'unpaid');

        const moreThan90 = this.customerData.filter(c =>
            c.daysOverdue >= 90 &&
            c.invoiceStatus?.toLowerCase() === 'unpaid');

        // Payment method issues
        const noPaymentMethod = this.customerData.filter(c =>
            !c.paymentMethod || c.paymentMethod.toLowerCase() === 'none' ||
            c.paymentMethod.trim() === '');

        const expiredPaymentMethod = this.customerData.filter(c =>
            c.paymentMethodStatus?.toLowerCase() === 'expired');

        // Status breakdown
        const statusCounts = {
            active: this.customerData.filter(c =>
                c.subscriptionStatus?.toLowerCase() === 'active').length,
            at_risk: this.customerData.filter(c =>
                c.invoiceStatus?.toLowerCase() === 'unpaid' && c.daysOverdue > 30).length,
            churned: this.customerData.filter(c =>
                c.subscriptionStatus?.toLowerCase() === 'cancelled' ||
                c.subscriptionStatus?.toLowerCase() === 'churned').length
        };

        // MRR analysis
        const totalMRR = this.customerData.reduce((sum, c) => sum + (c.mrr || 0), 0);
        const activeCustomers = this.customerData.filter(c =>
            c.subscriptionStatus?.toLowerCase() === 'active');
        const averageMRR = activeCustomers.length > 0 ?
            totalMRR / activeCustomers.length : 0;

        const overdueMRR = this.customerData
            .filter(c => c.invoiceStatus?.toLowerCase() === 'unpaid' && c.daysOverdue > 0)
            .reduce((sum, c) => sum + (c.mrr || 0), 0);

        return {
            customerCount: this.customerData.length,
            statusBreakdown: statusCounts,
            overdueSummary: {
                lessThan30: {
                    count: lessThan30.length,
                    items: lessThan30
                },
                between30And60: {
                    count: between30And60.length,
                    items: between30And60
                },
                between60And90: {
                    count: between60And90.length,
                    items: between60And90
                },
                moreThan90: {
                    count: moreThan90.length,
                    items: moreThan90
                }
            },
            paymentIssues: {
                noPaymentMethod: {
                    count: noPaymentMethod.length,
                    items: noPaymentMethod
                },
                expiredPaymentMethod: {
                    count: expiredPaymentMethod.length,
                    items: expiredPaymentMethod
                }
            },
            revenueMetrics: {
                totalMRR,
                averageMRR,
                mrAtRisk: overdueMRR,
                percentageAtRisk: totalMRR > 0 ? (overdueMRR / totalMRR) * 100 : 0
            }
        };
    }

    private getEmptyAnalysisResult(): AnalysisResult {
        return {
            customerCount: 0,
            statusBreakdown: { active: 0, at_risk: 0, churned: 0 },
            overdueSummary: {
                lessThan30: { count: 0, items: [] },
                between30And60: { count: 0, items: [] },
                between60And90: { count: 0, items: [] },
                moreThan90: { count: 0, items: [] }
            },
            paymentIssues: {
                noPaymentMethod: { count: 0, items: [] },
                expiredPaymentMethod: { count: 0, items: [] }
            },
            revenueMetrics: {
                totalMRR: 0,
                averageMRR: 0,
                mrAtRisk: 0,
                percentageAtRisk: 0
            }
        };
    }

    // Generate AI response based on a user query
    generateResponse(query: string): AIResponse {
        // Analyze current customer data
        const analysis = this.analyzeCustomerData();

        // Default response structure
        let response: AIResponse = {
            title: query,
            analysis: "I'm analyzing your request. Here's what I found:",
            sections: [],
            recommendation: "",
            suggestedActions: []
        };

        // Simple pattern matching for different query types
        const q = query.toLowerCase();

        // Overdue customers query
        if (q.includes('overdue') || q.includes('unpaid') || q.includes('aging')) {
            response.analysis = "Here's the AR aging summary of customers with overdue invoices:";

            response.sections = [
                {
                    title: "Overdue < 30 Days",
                    description: "Customers with invoices overdue less than 30 days",
                    count: analysis.overdueSummary.lessThan30.count,
                    items: analysis.overdueSummary.lessThan30.items
                },
                {
                    title: "Overdue 30-60 Days",
                    description: "Customers with invoices overdue between 30 and 60 days",
                    count: analysis.overdueSummary.between30And60.count,
                    items: analysis.overdueSummary.between30And60.items
                },
                {
                    title: "Overdue 60-90 Days",
                    description: "Customers with invoices overdue between 60 and 90 days",
                    count: analysis.overdueSummary.between60And90.count,
                    items: analysis.overdueSummary.between60And90.items
                },
                {
                    title: "Overdue > 90 Days",
                    description: "Customers with invoices overdue more than 90 days",
                    count: analysis.overdueSummary.moreThan90.count,
                    items: analysis.overdueSummary.moreThan90.items
                }
            ];

            response.recommendation = "Consider taking action on customers with invoices overdue for more than 30 days.";
            response.suggestedActions = [
                "Request updated payment method",
                "Send payment reminder emails",
                "Pause subscriptions",
                "Cancel subscriptions"
            ];
        }
        // Payment method query
        else if (q.includes('payment method') || q.includes('update payment')) {
            response.analysis = "I'll help you request updated payment methods from these overdue customers with payment issues:";

            response.sections = [
                {
                    title: "Overdue Customers Without Payment Methods",
                    description: "Overdue customers with no payment method on file",
                    count: analysis.paymentIssues.noPaymentMethod.count,
                    items: analysis.paymentIssues.noPaymentMethod.items
                },
                {
                    title: "Overdue Customers With Expired Payment Methods",
                    description: "Overdue customers with payment methods that have expired",
                    count: analysis.paymentIssues.expiredPaymentMethod.count,
                    items: analysis.paymentIssues.expiredPaymentMethod.items
                }
            ];

            response.recommendation = "Send emails to request updated payment methods from these customers.";
        }
        // Default to overdue customers if no specific query match
        else {
            // Use the overdue customers response as default
            return this.generateResponse("Show overdue customers");
        }

        return response;
    }

    // Get the total count of overdue customers
    getTotalOverdueCount(): number {
        const analysis = this.analyzeCustomerData();
        return analysis.overdueSummary.lessThan30.count +
            analysis.overdueSummary.between30And60.count +
            analysis.overdueSummary.between60And90.count +
            analysis.overdueSummary.moreThan90.count;
    }

    // Get the total count of customers with payment issues
    getTotalPaymentIssuesCount(): number {
        const analysis = this.analyzeCustomerData();
        return analysis.paymentIssues.noPaymentMethod.count +
            analysis.paymentIssues.expiredPaymentMethod.count;
    }
}

// Export a singleton instance
export default new CustomerAnalyzer();