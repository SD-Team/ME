import { AuditRateM } from './sme-record-question';


export interface SmeScoreRecordDetail {
    auditRateM: AuditRateM ;
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
