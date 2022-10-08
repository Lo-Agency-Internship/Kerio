import { EContactStatus } from "src/utils/types";
import { IContactStatus } from "./status.interface";

export const statuses:IContactStatus[] = [
    { status: EContactStatus.Lead },
    { status: EContactStatus.PotentialCustomer },
    { status: EContactStatus.LostLoyalCustomer },
    { status: EContactStatus.LostPotentialCustomer },
    { status: EContactStatus.LoyalCustomer },
  ];
  