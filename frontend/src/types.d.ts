import { FormEvent } from "react";
export interface bookType {
  id: string;
  title: string;
  cover: string;
  price: number;
  desc: string;
}

export interface formValues {
  title: string;
  desc: string;
  price: number;
  cover: ChangeEvent<HTMLInputElement>;
}
