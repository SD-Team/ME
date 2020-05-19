import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FunctionUtility {

    /**
     *Hàm tiện ích
     */
    constructor() { }

    /**
     * Nhận vào DateTime
     * Trả ra ngày không lấy giờ
     */
    ReturnDayNotTime(date: Date) {
        const tmp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        return new Date(tmp);
    }

    /**
     * Nhận vào DateTime
     * Trả ra chuỗi chỉ có ngày tháng
     */
    ReturnStringDay(date: Date) {
        const tmp = String(date).substr(0, 15);
        return tmp;
    }

    /**
     * Nhận vào DateTime
     * Trả ra chuỗi có ngày tháng giờ phút mà ko lấy múi giờ
     */
    ReturnStringDateTime(date: Date) {
        const tmp = String(date).substr(0, 24);
        return tmp;
    }

}
