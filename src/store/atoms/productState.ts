import { atom } from "recoil";

const productState = atom({
  key: "productState",
  default: null as any,
});

export default productState;
