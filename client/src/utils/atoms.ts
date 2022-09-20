import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const ageAtom = atomWithStorage<"child" | "adult">("age", "child");
export const regionAtom = atomWithStorage("region", "Kokiri Forest");

export const mapHeaderTextAtom = atom("");
export const errorTextAtom = atom("");
