export interface RoiHistory {
  _id: string;

  roiAmount: number;

  date: string;

  status: string;

  investment?: {
    _id: string;

    planDetails?: string;
  };
}