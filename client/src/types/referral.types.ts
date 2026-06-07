export interface ReferralIncome {
  _id: string;

  referralLevel: number;

  incomeAmount: number;

  date: string;

  generatedByUser: {
    _id: string;

    fullName: string;

    email: string;
  };
}

export interface ReferralTreeNode {
  _id: string;

  fullName: string;

  email: string;

  mobileNumber: string;

  referralCode: string;

  accountStatus: string;

  children: ReferralTreeNode[];
}