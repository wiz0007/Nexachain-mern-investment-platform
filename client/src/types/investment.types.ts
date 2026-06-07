export interface Investment {
  _id: string;

  investmentAmount: number;

  planDetails: string;

  startDate: string;

  endDate: string;

  dailyROIPercentage: number;

  status:
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED";
}