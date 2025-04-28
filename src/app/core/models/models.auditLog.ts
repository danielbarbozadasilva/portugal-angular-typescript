export interface IAuditLog {
  _id: string;
  userId: string; // ID of the user who performed the action
  action: string; // e.g., 'CREATE_ACTIVITY', 'UPDATE_USER', 'LOGIN'
  entity: string; // e.g., 'Activity', 'User', 'Auth'
  entityId?: string; // ID of the entity affected (if applicable)
  timestamp: Date;
  details?: any; // Optional field for extra details
  // Add other relevant fields based on your backend model
}
