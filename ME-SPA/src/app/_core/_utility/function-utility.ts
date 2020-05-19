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
    returnDayNotTime(date: Date) {
        debugger
        const tmp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        return new Date(tmp);
    }

    /**
     * Nhận vào DateTime
     * Trả ra chuỗi chỉ có ngày tháng
     */
    returnStringDay(date: Date) {
        const tmp = String(date).substr(0, 15);
        return tmp;
    }

    /**
     * Nhận vào DateTime
     * Trả ra chuỗi có ngày tháng giờ phút mà ko lấy múi giờ
     */
    returnStringDateTime(date: Date) {
        const tmp = String(date).substr(0, 24);
        return tmp;
    }

    /**
     *Trả ra ngày với tham số truyền vào là ngày muốn format, chỉ lấy năm tháng ngày: yyyy/MM/dd
     */
    getDateFormat(day: Date) {
        const dateFormat = day.getFullYear().toString() +
            '/' + (day.getMonth() + 1).toString() +
            '/' + day.getDate().toString();
        return dateFormat;
    }

}
