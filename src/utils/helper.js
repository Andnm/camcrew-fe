import toast from "react-hot-toast";
import {
    BOOKING_STATUS_LABEL,
    membershipLabels,
    SERVICE_CATEGORIES,
    SERVICE_STYLES,
    SERVICE_TIME_OF_DAYS,
} from "./constants";

export function getMembershipLabel(value) {
    return membershipLabels[value] || "Không xác định";
}

export const notSupportFunction = () => {
    toast.error("Chức năng này đang được phát triển!");
};

export const getStyleLabel = (styleValue) => {
    const style = SERVICE_STYLES.find((st) => st.value === styleValue);
    return style ? style.label : styleValue;
};

export const getTimeOfDay = (timeValue) => {
    const time = SERVICE_TIME_OF_DAYS.find((st) => st.value === timeValue);
    return time ? time.label : timeValue;
};

export const getCategoryLabel = (categoryValue) => {
    const category = SERVICE_CATEGORIES.find(
        (cat) => cat.value === categoryValue
    );
    return category ? category.label : categoryValue;
};

export const getBookingStatusLabel = (value) => {
    const m = BOOKING_STATUS_LABEL.find((s) => s.value === value);
    return m ? m.label : value;
};