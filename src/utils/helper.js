import toast from "react-hot-toast";
import { membershipLabels } from "./constants";

export function getMembershipLabel(value) {
  return membershipLabels[value] || "Không xác định";
}

export const notSupportFunction = () => {
  toast.error("Chức năng này đang được phát triển!")
}