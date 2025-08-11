import { BusinessProfile, BuyerProfile, MatchData, DealData } from '@/types/business';

// Sample data for demonstration - In production, this would come from API
export const sampleBusinesses: BusinessProfile[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    industry: 'Technology',
    description: 'SaaS platform providing workflow automation tools for small to medium businesses. Established customer base with 500+ active clients.',
    location: 'San Francisco, CA',
    annualRevenue: 2500000,
    employeeCount: 12,
    yearsInBusiness: 5,
    askingPrice: 4200000,
    profitMargin: 22,
    growthRate: 35,
    isVerified: true,
    owner: {
      name: 'Sarah Chen',
      title: 'Founder & CEO',
    },
    images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'],
    financials: {
      revenue: 2500000,
      ebitda: 680000,
      netProfitMargin: 22,
      monthlyRecurringRevenue: 208333,
      customerAcquisitionCost: 150,
      lifetimeValue: 4500,
      cashFlow: 'Positive'
    },
    operations: {
      technologyStack: 'React, Node.js, PostgreSQL, AWS infrastructure',
      teamStructure: '12 remote team members including 6 developers, 2 customer success specialists, 2 sales reps, and 2 management roles',
      growthOpportunities: 'Expansion into enterprise market, international markets, and additional product verticals'
    },
    keyMetrics: {
      activeClients: 500,
      retentionRate: 95,
      marketSize: 'Growing',
      competition: 'Moderate',
      scalability: 'High'
    }
  },
  {
    id: '2',
    name: 'Bella Vista Bistro',
    industry: 'Restaurant',
    description: 'Popular neighborhood bistro with excellent reputation and loyal customer base. Prime location with outdoor seating.',
    location: 'Portland, OR',
    annualRevenue: 800000,
    employeeCount: 15,
    yearsInBusiness: 8,
    askingPrice: 1200000,
    profitMargin: 18,
    growthRate: 12,
    isVerified: true,
    owner: {
      name: 'Marco Rodriguez',
      title: 'Owner & Head Chef',
    },
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'],
    financials: {
      revenue: 800000,
      ebitda: 144000,
      netProfitMargin: 18,
      cashFlow: 'Positive'
    },
    operations: {
      teamStructure: '15 staff including kitchen crew, servers, and management',
      growthOpportunities: 'Catering expansion, delivery services, additional locations'
    },
    keyMetrics: {
      marketSize: 'Stable',
      competition: 'High',
      scalability: 'Medium'
    }
  },
  {
    id: '3',
    name: 'HealthFirst Clinic',
    industry: 'Healthcare',
    description: 'Family medicine practice with established patient base and excellent insurance contracts. Modern facility and equipment.',
    location: 'Austin, TX',
    annualRevenue: 1200000,
    employeeCount: 8,
    yearsInBusiness: 12,
    askingPrice: 2100000,
    profitMargin: 25,
    growthRate: 8,
    isVerified: true,
    owner: {
      name: 'Dr. Jennifer Walsh',
      title: 'Medical Director',
    },
    images: ['https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'],
    financials: {
      revenue: 1200000,
      ebitda: 300000,
      netProfitMargin: 25,
      cashFlow: 'Strong'
    },
    operations: {
      teamStructure: '8 staff including physicians, nurses, and administrative personnel',
      growthOpportunities: 'Telemedicine services, specialized care programs, additional locations'
    },
    keyMetrics: {
      marketSize: 'Growing',
      competition: 'Moderate',
      scalability: 'High'
    }
  }
];

export const sampleBuyers: BuyerProfile[] = [
  {
    id: '1',
    name: 'Michael Chen',
    title: 'Strategic Investor',
    location: 'San Francisco, CA',
    investmentRange: {
      min: 2000000,
      max: 5000000
    },
    targetIndustries: ['Technology', 'SaaS', 'E-commerce', 'Fintech'],
    experience: '12 acquisitions completed',
    companySize: '10-100 employees',
    geography: 'North America & Europe',
    responseRate: 92,
    responseTime: '2 hours',
    successRate: 78,
    recentAcquisitions: [
      {
        company: 'CloudSync Technologies',
        industry: 'SaaS Platform',
        value: '$3.2M',
        year: '2023'
      },
      {
        company: 'DataFlow Analytics',
        industry: 'Business Intelligence',
        value: '$5.1M',
        year: '2022'
      }
    ],
    approach: 'I focus on acquiring profitable technology companies with strong growth potential and proven business models. My approach is hands-on, providing operational expertise and strategic guidance to help scale businesses effectively.',
    focusAreas: ['Revenue growth acceleration', 'Operational efficiency', 'Market expansion', 'Technology optimization'],
    postAcquisitionSupport: ['Strategic planning', 'Team development', 'Network connections', 'Exit strategy planning'],
    testimonials: [
      {
        content: 'Michael was exceptional throughout the entire acquisition process. His transparency and expertise made what could have been a stressful experience smooth and successful.',
        author: 'Jennifer Walsh',
        company: 'TechFlow Solutions'
      },
      {
        content: 'Not only did Michael provide fair valuation, but his post-acquisition support helped our team transition seamlessly. Highly recommend working with him.',
        author: 'Mark Thompson',
        company: 'DataSync Inc.'
      }
    ]
  }
];

export const sampleMatches: MatchData[] = [
  {
    id: '1',
    buyer: sampleBuyers[0],
    business: sampleBusinesses[0],
    matchScore: 97,
    status: 'new',
    timeAgo: '2 hours ago'
  }
];

export const sampleDeals: DealData[] = [
  {
    id: '1',
    company: 'TechStart Solutions',
    buyer: 'Michael Chen',
    value: '$2.5M',
    stage: 'Due Diligence',
    progress: 45,
    lastUpdated: '2 hours ago',
    nextSteps: [
      {
        id: '1',
        title: 'Schedule Discovery Call',
        description: 'Set up initial conversation with buyer',
        status: 'pending',
        dueDate: 'Tomorrow'
      },
      {
        id: '2',
        title: 'Prepare Information Package',
        description: 'Compile financial documents and business overview',
        status: 'in_progress',
        dueDate: 'This week'
      }
    ],
    documents: [
      {
        name: 'Financial_Statement_2023.pdf',
        type: 'PDF',
        size: '2.3 MB',
        uploadedDate: 'Today',
        status: 'verified'
      },
      {
        name: 'Revenue_Analysis_Q4.xlsx',
        type: 'Excel',
        size: '1.8 MB',
        uploadedDate: 'Today',
        status: 'processing'
      }
    ],
    communication: [
      {
        sender: 'Michael Chen',
        message: 'Interested in learning more about your growth strategy and customer acquisition costs.',
        timestamp: '2 hours ago',
        isUser: false
      },
      {
        sender: 'You',
        message: 'Happy to share those details. When would be a good time for a call this week?',
        timestamp: '1 hour ago',
        isUser: true
      }
    ]
  }
];
