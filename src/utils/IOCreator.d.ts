import { Method } from "axios";

interface Opt {
  url: string;
  method?: Method;
}

type Opts<T> = {
  [K in keyof T]: Opt;
};

export default function IOCreator<T extends Opts<T> | Opts<any>>(
  opts: T | Opts<T>,
): { [K in keyof T]: (params: object) => Promise<any> };
