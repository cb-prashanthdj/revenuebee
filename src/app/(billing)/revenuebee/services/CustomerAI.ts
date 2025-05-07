// services/CustomerAI.ts

export interface Customer {
  id: string | number;
  name: string;
  email?: string;
  mrr: number;
  status?: "active" | "at_risk" | "churned";
  subscriptionId?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
  invoiceId?: string;
  invoiceDate?: string;
  invoiceStatus?: string;
  unpaidReason?: string;
  daysOverdue?: number;
  paymentMethod?:
    | string
    | {
        type: string;
        isExpired: boolean;
        expiresIn: number;
      }
    | null;
  paymentMethodStatus?: string;
  lastActivity?: number; // days since last activity
}

interface AnalysisResult {
  customerCount: number;
  statusBreakdown: {
    active: number;
    at_risk: number;
    churned: number;
  };
  overdueSummary?: {
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
    };
  };
  paymentIssues: {
    noPaymentMethod?: {
      count: number;
      items: Customer[];
    };
    expiredPaymentMethod?: {
      count: number;
      items: Customer[];
    };
    missing?: {
      count: number;
      items: Customer[];
    };
    expired?: {
      count: number;
      items: Customer[];
    };
    expiring?: {
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
      const response = await fetch("../data/IPE_data.json");

      if (response.ok) {
        const jsonData = await response.json();

        // Map JSON data to our Customer interface
        this.customerData = jsonData.map((row: any, index: number) => ({
          id: row["Customer ID"] || `customer_${index}`,
          name: row["Customer Name"] || "Unknown Customer",
          email: row["Customer Email"] || `customer${index}@example.com`,
          mrr: parseFloat(row["MRR ($)"]) || 0,
          status: this.getStatusFromData(row),
          subscriptionId: row["Subscription ID"] || "",
          subscriptionPlan: row["Subscription Plan"] || "",
          subscriptionStatus: row["Subscription Status"] || "",
          invoiceId: row["Invoice ID"] || "",
          invoiceDate: row["Invoice Date"] || "",
          invoiceStatus: row["Invoice Status"] || "",
          unpaidReason: row["Unpaid Reason"] || "",
          daysOverdue: parseInt(row["Days Overdue"]) || 0,
          paymentMethod: this.getPaymentMethodFromData(row),
          paymentMethodStatus: row["Payment Method Status"] || "",
          lastActivity: Math.floor(Math.random() * 30) + 1, // Random value for lastActivity
        }));

        console.log(
          "JSON data loaded successfully:",
          this.customerData.length,
          "customers"
        );
        this.dataLoaded = true;
      } else {
        console.warn("Could not load JSON data, using fallback data");
        this.setupFallbackData();
      }
    } catch (error) {
      console.error("Error loading customer data:", error);
      this.setupFallbackData();
    }
  }

  private getStatusFromData(row: any): "active" | "at_risk" | "churned" {
    const status = row["Subscription Status"]?.toLowerCase() || "";
    const daysOverdue = parseInt(row["Days Overdue"]) || 0;

    if (status === "cancelled" || status === "churned") {
      return "churned";
    } else if (daysOverdue > 30 || status === "at risk") {
      return "at_risk";
    } else {
      return "active";
    }
  }

  private getPaymentMethodFromData(
    row: any
  ): string | { type: string; isExpired: boolean; expiresIn: number } | null {
    const paymentMethod = row["Payment Method"] || "";
    const paymentMethodStatus =
      row["Payment Method Status"]?.toLowerCase() || "";

    if (
      !paymentMethod ||
      paymentMethod.toLowerCase() === "none" ||
      paymentMethod.trim() === ""
    ) {
      return null;
    }

    // Convert to object format for compatibility with both versions
    return {
      type: paymentMethod.toLowerCase().includes("card")
        ? "credit_card"
        : "bank_transfer",
      isExpired: paymentMethodStatus === "expired",
      expiresIn:
        paymentMethodStatus === "expired"
          ? -30
          : Math.floor(Math.random() * 180) + 1,
    };
  }

  // Setup fallback data if JSON cannot be loaded
  private setupFallbackData() {
    // Combine the data patterns from both versions
    this.customerData = [
      {
        id: 1,
        name: "Acme Corp",
        email: "billing@acmecorp.com",
        mrr: 1200,
        status: "active",
        paymentMethod: { type: "credit_card", isExpired: false, expiresIn: 45 },
        lastActivity: 5,
      },
      {
        id: 2,
        name: "Global Tech",
        email: "accounts@globaltech.com",
        mrr: 2500,
        status: "at_risk",
        paymentMethod: { type: "credit_card", isExpired: true, expiresIn: -10 },
        lastActivity: 15,
      },
      {
        id: 3,
        name: "Initech LLC",
        email: "finance@initech.com",
        mrr: 980,
        status: "active",
        paymentMethod: null,
        lastActivity: 8,
      },
      {
        id: 4,
        name: "Massive Dynamic",
        email: "billing@massivedynamic.com",
        mrr: 5400,
        status: "active",
        paymentMethod: {
          type: "bank_transfer",
          isExpired: false,
          expiresIn: 180,
        },
        lastActivity: 2,
      },
      {
        id: 5,
        name: "Cyberdyne Systems",
        email: "ar@cyberdyne.com",
        mrr: 3200,
        status: "active",
        paymentMethod: { type: "credit_card", isExpired: false, expiresIn: 12 },
        lastActivity: 4,
      },
      {
        id: 6,
        name: "Umbrella Corp",
        email: "payments@umbrella.com",
        mrr: 1800,
        status: "churned",
        paymentMethod: { type: "credit_card", isExpired: true, expiresIn: -45 },
        lastActivity: 60,
      },
      {
        id: 7,
        name: "Stark Industries",
        email: "accounting@stark.com",
        mrr: 8900,
        status: "active",
        paymentMethod: {
          type: "bank_transfer",
          isExpired: false,
          expiresIn: 90,
        },
        lastActivity: 1,
      },
      {
        id: 8,
        name: "Wayne Enterprises",
        email: "ap@wayne.com",
        mrr: 7500,
        status: "at_risk",
        paymentMethod: null,
        lastActivity: 30,
      },
      {
        id: 9,
        name: "Hooli",
        email: "billing@hooli.com",
        mrr: 4200,
        status: "active",
        paymentMethod: { type: "credit_card", isExpired: false, expiresIn: 5 },
        lastActivity: 3,
      },
      {
        id: 10,
        name: "Pied Piper",
        email: "richard@piedpiper.com",
        mrr: 950,
        status: "churned",
        paymentMethod: { type: "credit_card", isExpired: true, expiresIn: -5 },
        lastActivity: 45,
      },
      {
        id: 11,
        name: "Dunder Mifflin",
        email: "accounting@dundermifflin.com",
        mrr: 1100,
        status: "active",
        paymentMethod: {
          type: "bank_transfer",
          isExpired: false,
          expiresIn: 60,
        },
        lastActivity: 7,
      },
    ];

    // Generate additional data for the overdue categories
    this.generateAdditionalSampleData();

    this.dataLoaded = true;
    console.log(
      "Using fallback data with",
      this.customerData.length,
      "sample customers"
    );
  }

  // Generate additional sample data to match the counts in screenshots
  private generateAdditionalSampleData() {
    const companies = [
      "TechSoft",
      "InnovateCorp",
      "FutureTech",
      "DataSystems",
      "MegaCorp",
      "Skyline Industries",
      "Quantum Solutions",
      "GlobalServe",
      "PeakPerformance",
      "BlueOcean",
      "RedMountain",
      "SilverLake",
      "GreenField",
      "BlackRock",
      "WhiteSand",
      "YellowStone",
    ];

    // Generate customers with < 30 days overdue to reach 42 total
    for (let i = 0; i < 30; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      this.customerData.push({
        id: `C${2000 + i}`,
        name: `${company} ${i}`,
        email: `billing@${company.toLowerCase()}.com`,
        mrr: Math.floor(Math.random() * 5000) + 500,
        status: "active",
        subscriptionId: `S${2000 + i}`,
        subscriptionPlan: "Professional",
        subscriptionStatus: "Active",
        invoiceId: `INV${2000 + i}`,
        invoiceDate: "2025-04-15",
        invoiceStatus: "Unpaid",
        unpaidReason: "Customer Delay",
        daysOverdue: Math.floor(Math.random() * 29) + 1,
        paymentMethod:
          Math.random() > 0.3
            ? {
                type: "credit_card",
                isExpired: false,
                expiresIn: Math.floor(Math.random() * 180) + 30,
              }
            : null,
        lastActivity: Math.floor(Math.random() * 10) + 1,
      });
    }

    // Generate customers with 30-60 days overdue
    for (let i = 0; i < 20; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      this.customerData.push({
        id: `C${3000 + i}`,
        name: `${company} ${i}`,
        email: `billing@${company.toLowerCase()}.com`,
        mrr: Math.floor(Math.random() * 5000) + 500,
        status: "at_risk",
        subscriptionId: `S${3000 + i}`,
        subscriptionPlan: "Professional",
        subscriptionStatus: "Active",
        invoiceId: `INV${3000 + i}`,
        invoiceDate: "2025-03-01",
        invoiceStatus: "Unpaid",
        unpaidReason: "Customer Delay",
        daysOverdue: Math.floor(Math.random() * 30) + 30,
        paymentMethod:
          Math.random() > 0.3
            ? {
                type: "credit_card",
                isExpired: Math.random() > 0.5,
                expiresIn: Math.random() > 0.5 ? -10 : 45,
              }
            : null,
        lastActivity: Math.floor(Math.random() * 20) + 10,
      });
    }

    // Generate customers with 60-90 days overdue
    for (let i = 0; i < 12; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      this.customerData.push({
        id: `C${4000 + i}`,
        name: `${company} ${i}`,
        email: `billing@${company.toLowerCase()}.com`,
        mrr: Math.floor(Math.random() * 5000) + 500,
        status: "at_risk",
        subscriptionId: `S${4000 + i}`,
        subscriptionPlan: "Professional",
        subscriptionStatus: "At Risk",
        invoiceId: `INV${4000 + i}`,
        invoiceDate: "2025-02-01",
        invoiceStatus: "Unpaid",
        unpaidReason: "Customer Delay",
        daysOverdue: Math.floor(Math.random() * 30) + 60,
        paymentMethod:
          Math.random() > 0.3
            ? {
                type: "credit_card",
                isExpired: Math.random() > 0.3,
                expiresIn: Math.random() > 0.5 ? -30 : 20,
              }
            : null,
        lastActivity: Math.floor(Math.random() * 30) + 20,
      });
    }

    // Generate customers with > 90 days overdue
    for (let i = 0; i < 9; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      this.customerData.push({
        id: `C${5000 + i}`,
        name: `${company} ${i}`,
        email: `billing@${company.toLowerCase()}.com`,
        mrr: Math.floor(Math.random() * 5000) + 500,
        status: "at_risk",
        subscriptionId: `S${5000 + i}`,
        subscriptionPlan: "Professional",
        subscriptionStatus: "At Risk",
        invoiceId: `INV${5000 + i}`,
        invoiceDate: "2025-01-01",
        invoiceStatus: "Unpaid",
        unpaidReason: "Customer Delay",
        daysOverdue: Math.floor(Math.random() * 100) + 90,
        paymentMethod:
          Math.random() > 0.3
            ? {
                type: "credit_card",
                isExpired: Math.random() > 0.2,
                expiresIn: Math.random() > 0.7 ? -60 : 10,
              }
            : null,
        lastActivity: Math.floor(Math.random() * 40) + 30,
      });
    }
  }

  // Analyze customer data to get comprehensive statistics
  analyzeCustomerData(customers?: Customer[]): AnalysisResult {
    // Use provided customers or fall back to this.customerData
    const data = customers || this.customerData;

    // For demo purpose, if data not loaded yet, return empty analysis
    if (!this.dataLoaded || data.length === 0) {
      return this.getEmptyAnalysisResult();
    }

    // Count customers by status
    const statusCounts = {
      active: data.filter(
        (c) =>
          c.status === "active" ||
          c.subscriptionStatus?.toLowerCase() === "active"
      ).length,
      at_risk: data.filter(
        (c) =>
          c.status === "at_risk" ||
          (c.invoiceStatus?.toLowerCase() === "unpaid" &&
            (c.daysOverdue || 0) > 30)
      ).length,
      churned: data.filter(
        (c) =>
          c.status === "churned" ||
          c.subscriptionStatus?.toLowerCase() === "cancelled" ||
          c.subscriptionStatus?.toLowerCase() === "churned"
      ).length,
    };

    // Group customers by overdue days
    const lessThan30 = data.filter(
      (c) =>
        (c.daysOverdue || 0) > 0 &&
        (c.daysOverdue || 0) < 30 &&
        c.invoiceStatus?.toLowerCase() === "unpaid"
    );

    const between30And60 = data.filter(
      (c) =>
        (c.daysOverdue || 0) >= 30 &&
        (c.daysOverdue || 0) < 60 &&
        c.invoiceStatus?.toLowerCase() === "unpaid"
    );

    const between60And90 = data.filter(
      (c) =>
        (c.daysOverdue || 0) >= 60 &&
        (c.daysOverdue || 0) < 90 &&
        c.invoiceStatus?.toLowerCase() === "unpaid"
    );

    const moreThan90 = data.filter(
      (c) =>
        (c.daysOverdue || 0) >= 90 &&
        c.invoiceStatus?.toLowerCase() === "unpaid"
    );

    // Payment method issues
    // Handle both string and object payment methods
    const getMissingPaymentMethods = () => {
      return data.filter((c) => {
        if (typeof c.paymentMethod === "string") {
          return (
            !c.paymentMethod ||
            c.paymentMethod.toLowerCase() === "none" ||
            c.paymentMethod.trim() === ""
          );
        } else {
          return c.paymentMethod === null;
        }
      });
    };

    const getExpiredPaymentMethods = () => {
      return data.filter((c) => {
        if (typeof c.paymentMethod === "string") {
          return c.paymentMethodStatus?.toLowerCase() === "expired";
        } else if (c.paymentMethod && typeof c.paymentMethod === "object") {
          return c.paymentMethod.isExpired;
        }
        return false;
      });
    };

    const getSoonToExpirePaymentMethods = () => {
      return data.filter((c) => {
        if (typeof c.paymentMethod === "object" && c.paymentMethod) {
          return !c.paymentMethod.isExpired && c.paymentMethod.expiresIn < 30;
        }
        return false;
      });
    };

    const noPaymentMethod = getMissingPaymentMethods();
    const expiredPaymentMethod = getExpiredPaymentMethods();
    const soonToExpirePaymentMethod = getSoonToExpirePaymentMethods();

    // MRR analysis
    const totalMRR = data.reduce((sum, c) => sum + (c.mrr || 0), 0);
    const activeCustomers = data.filter(
      (c) =>
        c.status === "active" ||
        c.subscriptionStatus?.toLowerCase() === "active"
    );
    const averageMRR =
      activeCustomers.length > 0 ? totalMRR / activeCustomers.length : 0;

    const overdueMRR = data
      .filter(
        (c) =>
          c.status === "at_risk" ||
          (c.invoiceStatus?.toLowerCase() === "unpaid" &&
            (c.daysOverdue || 0) > 0)
      )
      .reduce((sum, c) => sum + (c.mrr || 0), 0);

    return {
      customerCount: data.length,
      statusBreakdown: statusCounts,
      overdueSummary: {
        lessThan30: {
          count: lessThan30.length,
          items: lessThan30,
        },
        between30And60: {
          count: between30And60.length,
          items: between30And60,
        },
        between60And90: {
          count: between60And90.length,
          items: between60And90,
        },
        moreThan90: {
          count: moreThan90.length,
          items: moreThan90,
        },
      },
      paymentIssues: {
        noPaymentMethod: {
          count: noPaymentMethod.length,
          items: noPaymentMethod,
        },
        expiredPaymentMethod: {
          count: expiredPaymentMethod.length,
          items: expiredPaymentMethod,
        },
        missing: {
          count: noPaymentMethod.length,
          items: noPaymentMethod,
        },
        expired: {
          count: expiredPaymentMethod.length,
          items: expiredPaymentMethod,
        },
        expiring: {
          count: soonToExpirePaymentMethod.length,
          items: soonToExpirePaymentMethod,
        },
      },
      revenueMetrics: {
        totalMRR,
        averageMRR,
        mrAtRisk: overdueMRR,
        percentageAtRisk: totalMRR > 0 ? (overdueMRR / totalMRR) * 100 : 0,
      },
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
        moreThan90: { count: 0, items: [] },
      },
      paymentIssues: {
        noPaymentMethod: { count: 0, items: [] },
        expiredPaymentMethod: { count: 0, items: [] },
        missing: { count: 0, items: [] },
        expired: { count: 0, items: [] },
        expiring: { count: 0, items: [] },
      },
      revenueMetrics: {
        totalMRR: 0,
        averageMRR: 0,
        mrAtRisk: 0,
        percentageAtRisk: 0,
      },
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
    };

    // Simple pattern matching for different query types
    const q = query.toLowerCase();

    // Overdue customers query
    if (q.includes("overdue") || q.includes("unpaid") || q.includes("aging")) {
      response.analysis =
        "Here's the AR aging summary of customers with overdue invoices:";

      response.sections = [
        {
          title: "Overdue < 30 Days",
          description: "Customers with invoices overdue less than 30 days",
          count: analysis.overdueSummary?.lessThan30.count || 0,
          items: analysis.overdueSummary?.lessThan30.items || [],
        },
        {
          title: "Overdue 30-60 Days",
          description: "Customers with invoices overdue between 30 and 60 days",
          count: analysis.overdueSummary?.between30And60.count || 0,
          items: analysis.overdueSummary?.between30And60.items || [],
        },
        {
          title: "Overdue 60-90 Days",
          description: "Customers with invoices overdue between 60 and 90 days",
          count: analysis.overdueSummary?.between60And90.count || 0,
          items: analysis.overdueSummary?.between60And90.items || [],
        },
        {
          title: "Overdue > 90 Days",
          description: "Customers with invoices overdue more than 90 days",
          count: analysis.overdueSummary?.moreThan90.count || 0,
          items: analysis.overdueSummary?.moreThan90.items || [],
        },
      ];

      response.recommendation =
        "Consider taking action on customers with invoices overdue for more than 30 days.";
      response.suggestedActions = [
        "Request updated payment method",
        "Send payment reminder emails",
        "Pause subscriptions",
        "Cancel subscriptions",
      ];
    }
    // Payment method query
    else if (q.includes("payment method") || q.includes("update payment")) {
      response.analysis =
        "I'll help you request updated payment methods from these customers with payment issues:";

      response.sections = [
        {
          title: "Customers Without Payment Methods",
          description: "These customers have no payment method on file",
          count:
            analysis.paymentIssues.noPaymentMethod?.count ||
            analysis.paymentIssues.missing?.count ||
            0,
          items:
            analysis.paymentIssues.noPaymentMethod?.items ||
            analysis.paymentIssues.missing?.items ||
            [],
        },
        {
          title: "Customers With Expired Payment Methods",
          description: "These customers have payment methods that have expired",
          count:
            analysis.paymentIssues.expiredPaymentMethod?.count ||
            analysis.paymentIssues.expired?.count ||
            0,
          items:
            analysis.paymentIssues.expiredPaymentMethod?.items ||
            analysis.paymentIssues.expired?.items ||
            [],
        },
        {
          title: "Customers With Soon-to-Expire Payment Methods",
          description:
            "These customers have payment methods that will expire in the next 30 days",
          count: analysis.paymentIssues.expiring?.count || 0,
          items: analysis.paymentIssues.expiring?.items || [],
        },
      ];

      response.recommendation =
        "Consider automating payment method update reminders to reduce revenue at risk.";
    }
    // Risk or churn query
    else if (
      q.includes("risk") ||
      q.includes("churn") ||
      q.includes("at risk")
    ) {
      const atRiskCustomers = this.customerData.filter(
        (c) =>
          c.status === "at_risk" ||
          (c.invoiceStatus?.toLowerCase() === "unpaid" &&
            (c.daysOverdue || 0) > 30)
      );
      const highMRRAtRisk = [...atRiskCustomers].sort((a, b) => b.mrr - a.mrr);

      response.sections = [
        {
          title: "At-Risk Customers Summary",
          description: `You have ${atRiskCustomers.length} customers at risk of churning`,
          count: atRiskCustomers.length,
          items: atRiskCustomers,
        },
        {
          title: "MRR at Risk",
          description: `$${analysis.revenueMetrics.mrAtRisk.toLocaleString()} in monthly recurring revenue is at risk`,
          count: Math.round(analysis.revenueMetrics.mrAtRisk),
          items: [],
        },
        {
          title: "High-Value At-Risk Customers",
          description:
            "These are your highest MRR customers at risk of churning",
          count: highMRRAtRisk.length,
          items: highMRRAtRisk.slice(0, 5), // Top 5
        },
      ];

      response.recommendation =
        "Schedule account reviews with high-value at-risk customers within the next 7 days.";
    }
    // Customer-related query
    else if (
      q.includes("customer") ||
      q.includes("client") ||
      q.includes("account")
    ) {
      const activeCustomers = this.customerData.filter(
        (c) =>
          c.status === "active" ||
          c.subscriptionStatus?.toLowerCase() === "active"
      );
      const recentlyActiveCustomers = [...this.customerData]
        .sort((a, b) => (a.lastActivity || 100) - (b.lastActivity || 100))
        .slice(0, 5);

      response.sections = [
        {
          title: "Customer Status Overview",
          description: `Active: ${analysis.statusBreakdown.active}, At Risk: ${analysis.statusBreakdown.at_risk}, Churned: ${analysis.statusBreakdown.churned}`,
          count: analysis.customerCount,
          items: [],
        },
        {
          title: "Active Customers",
          description: `${activeCustomers.length} customers are currently active`,
          count: activeCustomers.length,
          items: activeCustomers,
        },
        {
          title: "Recently Active Customers",
          description: "These customers have been active in the last few days",
          count: recentlyActiveCustomers.length,
          items: recentlyActiveCustomers,
        },
      ];

      response.recommendation =
        "Consider implementing a customer health score system to proactively identify at-risk customers.";
    }
    // Default/general query
    else {
      const paymentIssueItems = [
        ...(analysis.paymentIssues.noPaymentMethod?.items || []),
        ...(analysis.paymentIssues.expiredPaymentMethod?.items || []),
        ...(analysis.paymentIssues.missing?.items || []),
        ...(analysis.paymentIssues.expired?.items || []),
        ...(analysis.paymentIssues.expiring?.items || []),
      ];

      const paymentIssueCount =
        (analysis.paymentIssues.noPaymentMethod?.count || 0) +
        (analysis.paymentIssues.expiredPaymentMethod?.count || 0) +
        (analysis.paymentIssues.expiring?.count || 0);

      response.sections = [
        {
          title: "Customer Status Overview",
          description: `Active: ${analysis.statusBreakdown.active}, At Risk: ${analysis.statusBreakdown.at_risk}, Churned: ${analysis.statusBreakdown.churned}`,
          count: analysis.customerCount,
          items: [],
        },
        {
          title: "Payment Method Issues",
          description: `${paymentIssueCount} customers have payment method issues`,
          count: paymentIssueCount,
          items: paymentIssueItems,
        },
        {
          title: "Revenue Summary",
          description: `Total MRR: $${analysis.revenueMetrics.totalMRR.toLocaleString()}, with ${analysis.revenueMetrics.percentageAtRisk.toFixed(
            1
          )}% at risk`,
          count: Math.round(analysis.revenueMetrics.totalMRR),
          items: [],
        },
      ];

      response.recommendation =
        "Focus on resolving payment method issues to secure revenue and implement a customer health scoring system to reduce churn.";
    }

    return response;
  }

  // Get the total count of overdue customers
  getTotalOverdueCount(): number {
    const analysis = this.analyzeCustomerData();
    return (
      (analysis.overdueSummary?.lessThan30.count || 0) +
      (analysis.overdueSummary?.between30And60.count || 0) +
      (analysis.overdueSummary?.between60And90.count || 0) +
      (analysis.overdueSummary?.moreThan90.count || 0)
    );
  }

  // Get the total count of customers with payment issues
  getTotalPaymentIssuesCount(): number {
    const analysis = this.analyzeCustomerData();
    return (
      (analysis.paymentIssues.noPaymentMethod?.count ||
        analysis.paymentIssues.missing?.count ||
        0) +
      (analysis.paymentIssues.expiredPaymentMethod?.count ||
        analysis.paymentIssues.expired?.count ||
        0) +
      (analysis.paymentIssues.expiring?.count || 0)
    );
  }

  // Helper method to get filtered customers based on criteria
  getFilteredCustomers(criteria: string): Customer[] {
    if (criteria.toLowerCase().includes("without payment")) {
      return this.customerData.filter((c) => {
        if (typeof c.paymentMethod === "string") {
          return (
            !c.paymentMethod ||
            c.paymentMethod.toLowerCase() === "none" ||
            c.paymentMethod.trim() === ""
          );
        } else {
          return c.paymentMethod === null;
        }
      });
    } else if (criteria.toLowerCase().includes("expired")) {
      return this.customerData.filter((c) => {
        if (typeof c.paymentMethod === "string") {
          return c.paymentMethodStatus?.toLowerCase() === "expired";
        } else if (c.paymentMethod && typeof c.paymentMethod === "object") {
          return c.paymentMethod.isExpired;
        }
        return false;
      });
    } else if (criteria.toLowerCase().includes("soon-to-expire")) {
      return this.customerData.filter((c) => {
        if (typeof c.paymentMethod === "object" && c.paymentMethod) {
          return !c.paymentMethod.isExpired && c.paymentMethod.expiresIn < 30;
        }
        return false;
      });
    } else if (criteria.toLowerCase().includes("at risk")) {
      return this.customerData.filter(
        (c) =>
          c.status === "at_risk" ||
          (c.invoiceStatus?.toLowerCase() === "unpaid" &&
            (c.daysOverdue || 0) > 30)
      );
    } else if (criteria.toLowerCase().includes("active")) {
      return this.customerData.filter(
        (c) =>
          c.status === "active" ||
          c.subscriptionStatus?.toLowerCase() === "active"
      );
    } else if (criteria.toLowerCase().includes("churned")) {
      return this.customerData.filter(
        (c) =>
          c.status === "churned" ||
          c.subscriptionStatus?.toLowerCase() === "cancelled" ||
          c.subscriptionStatus?.toLowerCase() === "churned"
      );
    }

    // Default return all customers
    return this.customerData;
  }
}

export default new CustomerAnalyzer();
