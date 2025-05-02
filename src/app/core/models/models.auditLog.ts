// Alinhado com o schema backend models.auditLog.ts
export interface IAuditLog {
  _id: string;
  event: string; // Nome do evento registrado
  user?: string; // ID do usuário que disparou o evento (opcional se for ação do sistema)
  data?: any; // Dados adicionais relacionados ao evento
  createdAt: Date | string; // Timestamp do evento
  // Campos do frontend original removidos: userId, action, entity, entityId, timestamp, details
}
