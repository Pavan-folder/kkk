export interface BusinessProfile {
  id: string;
  name: string;
  industry: string;
  description: string;
  location: string;
  annualRevenue: number;
  employeeCount: number;
  yearsInBusiness: number;
  askingPrice: number;
  profitMargin: number;
  growthRate: number;
  isVerified: boolean;
  owner: {
    name: string;
    title: string;
    photo?: string;
  };
  images: string[];
  financials: {
    revenue: number;
    ebitda: number;
    netProfitMargin: number;
    monthlyRecurringRevenue?: number;
    customerAcquisitionCost?: number;
    lifetimeValue?: number;
    cashFlow: string;
  };
  operations: {
    technologyStack?: string;
    teamStructure: string;
    growthOpportunities: string;
  };
  keyMetrics: {
    activeClients?: number;
    retentionRate?: number;
    marketSize: string;
    competition: string;
    scalability: string;
  };
}

export interface BuyerProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  photo?: string;
  investmentRange: {
    min: number;
    max: number;
  };
  targetIndustries: string[];
  experience: string;
  companySize: string;
  geography: string;
  responseRate: number;
  responseTime: string;
  successRate: number;
  recentAcquisitions: Array<{
    company: string;
    industry: string;
    value: string;
    year: string;
  }>;
  approach: string;
  focusAreas: string[];
  postAcquisitionSupport: string[];
  testimonials: Array<{
    content: string;
    author: string;
    company: string;
  }>;
}

export interface MatchData {
  id: string;
  buyer: BuyerProfile;
  business: BusinessProfile;
  matchScore: number;
  status: 'new' | 'in_review' | 'matched' | 'rejected';
  timeAgo: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  dueDate?: string;
}

export interface DealData {
  id: string;
  company: string;
  buyer: string;
  value: string;
  stage: string;
  progress: number;
  lastUpdated: string;
  nextSteps: WorkflowStep[];
  documents: Array<{
    name: string;
    type: string;
    size: string;
    uploadedDate: string;
    status: 'verified' | 'pending' | 'processing';
  }>;
  communication: Array<{
    sender: string;
    message: string;
    timestamp: string;
    isUser: boolean;
  }>;
}
