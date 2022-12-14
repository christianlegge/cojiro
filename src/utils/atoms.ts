import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const idAtom = atom("");
export const ageAtom = atomWithStorage<"child" | "adult">("age", "child");
export const regionAtom = atomWithStorage("region", "Kokiri Forest");

export const fetchingAtom = atom(false);
export const mapHeaderTextAtom = atom("");
export const errorTextAtom = atom("");
export const winScreenOpenAtom = atom(true);
