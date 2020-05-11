export class ScoreRecordQuestion {
    audit_Type_ID: string;
    audit_Item_ID: string;
    quesion: string;
    rating_0: number = 0;
    rating_1: number = 0;
    rating_2: number = 0;
    rate_Na: number = 0;
    remark: string;
}

export class AuditRateM {
    record_ID: string;
    audit_Type_ID: string;
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

export class AuditRateModel {
    auditRateM: AuditRateM;
    listAuditRateD: ScoreRecordQuestion[];
}
