import toast from "react-hot-toast";
import { membershipLabels, SERVICE_CATEGORIES, SERVICE_STYLES } from "./constants";

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

export const getCategoryLabel = (categoryValue) => {
    const category = SERVICE_CATEGORIES.find(
        (cat) => cat.value === categoryValue
    );
    return category ? category.label : categoryValue;
};