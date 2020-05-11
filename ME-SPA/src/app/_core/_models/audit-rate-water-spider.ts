export interface AuditRateWaterSpider {
    recordId: string;
    auditDate: Date;
    auditType: string;
    lineId: string;
    loss: number;
    score: number;
    total: number;
    achieving: number;
}