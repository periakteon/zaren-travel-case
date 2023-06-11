import { atom } from "jotai";

export const datePickerCheckInAtom = atom<Date | undefined>(new Date());
export const datePickerCheckOutAtom = atom<Date | undefined>(
  new Date(new Date().setDate(new Date().getDate() + 1)),
);
