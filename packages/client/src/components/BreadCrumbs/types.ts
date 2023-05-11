import { BC_PENDING_SYMBOL } from './const';

export type BreadCrumbItem = string | typeof BC_PENDING_SYMBOL;

export type BreadCrumbProps = {
  items: BreadCrumbItem[];
};
