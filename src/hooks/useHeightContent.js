import { SUBCRIBE_STATUS } from "constants/common";

const useHeightContent = (userInfo) => {
  const heightNotice =
    userInfo?.subscription_status === SUBCRIBE_STATUS.SUSPENDED
      ? "62px"
      : "0px";

  return `calc(100vh/0.9 - 70px - ${heightNotice})`;
};

export default useHeightContent;
