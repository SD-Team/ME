import { AuditRateM } from './score-record-question';

export interface ScoreRecordDetail {
    auditRateM: AuditRateM;
    listAuditRateD: AuditRateDDetail[];
}

export interface AuditRateDDetail {
    auditItemId: string;
    auditItemLL: string;
    auditItemZW: string;
    auditItemEN: string;
    rating0: number;
    rating1: number;
    rating2: number;
    ratingNA: number;
    remark: string;
    uplloadPicture: string;
}