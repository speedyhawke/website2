export type ResourceCategory =
  | 'FOOD'
  | 'HOUSING'
  | 'EMPLOYMENT'
  | 'ADDICTION & RECOVERY'
  | 'FAMILY & CHILDREN'
  | 'BASIC NEEDS'
  | 'TRANSPORTATION'
  | 'GOVERNMENT SERVICES'
  | 'COMMUNITY SERVICES'
  | 'OTHER SUPPORT';

export interface CommunityResource {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  phone?: string;
  website?: string;
  address?: string;
  hours?: string;
  isCustom?: boolean;
}

export interface SurveySubmission {
  id: string;
  submittedAt: string;
  respondentType: 'myself' | 'family_friend' | 'community_worker' | 'observer';
  locationArea: string;
  gapCategories: string[];
  description: string;
  whatWouldHelp: string;
  contactName?: string;
  contactEmailOrPhone?: string;
  allowFollowup: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
}
