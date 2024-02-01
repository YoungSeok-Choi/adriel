import { StoreApi } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';


export interface Point {
    x: number;
    y: number;
}

interface IClockState {
    time: Date;
    initialized: boolean;
}

interface IClockStore extends IClockState {
    init: () => () => void;
    calcTime: (code: CountryCode) => Date;
}

export enum CountryCode {
    US = "US",
    CA = "CA",
    DE = "DE",
    FR = "FR",
    IT = "IT",
    GB = "GB",
    TH = "TH",
    SG = "SG",
    VN = "VN",
    ID = "ID",
    KO = "KO"
}

export const timeDiffMap: Record<CountryCode, number> = {
    US: -14, // 미국 동부 표준시 기준, 태평양 표준시는 -17
    CA: -14, // 캐나다 동부 표준시 기준, 태평양 표준시는 -17
    DE: -8,  // 독일
    FR: -8,  // 프랑스
    IT: -8,  // 이탈리아
    GB: -9,  // 영국
    TH: -2,  // 태국
    SG: -1,  // 싱가포르
    VN: -2,  // 베트남
    ID: -2,   // 인도네시아, 자카르타 기준
    KO: 0
};


class ClockStoreBuilder implements IClockStore {

    initialized: boolean = false;
    time: Date = undefined!;

    constructor(
        private set: StoreApi<IClockStore>['setState'],
        private get: StoreApi<IClockStore>['getState']
    ) { }

    init = () => {
        let intervalId: number;
        (() => {
            intervalId = setInterval(() => {
                this.set({ time: new Date() });
            }, 1000);

            this.set({ initialized: true, time: new Date() });
        })();

        return () => {
            clearInterval(intervalId);
            this.set({ initialized: false });
        };
    };

    calcTime = (code: CountryCode) => {
        const currentTime = this.get().time;
        const timeDifferenceMilliseconds = timeDiffMap[code] * 60 * 60 * 1000;
        return new Date(currentTime.getTime() + timeDifferenceMilliseconds);
    };


}


export default class ClockStore {
    public static use = createWithEqualityFn<IClockStore>(
        (set, get) => new ClockStoreBuilder(set, get), shallow);
}