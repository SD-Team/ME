export class ScoreRecordQuestion {
    auditTypeID: string;
    auditItem: string;
    quesion: string;
    rating_0: number = 0;
    rating_1: number = 1;
    rating_2: number = 0;
    rating_Na: number = 0;
    remark: string;
}

export interface AuditRateM {
    record_Id: string;
    audit_Type_Id: string;
    pdc: string;
    building: string;
    line: string;
    audit_Type1: string;
    audit_Type2: string;
    me_Pic: string;
    pd_Resp: string;
    updated_By: string;
    update_Time: string;
    record_Date: string;
}

export interface AuditRateModel {
    auditRateM: AuditRateM;
    auditRateD: ScoreRecordQuestion[];
}
