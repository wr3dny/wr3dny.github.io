import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../http.ts";
import { ENDPOINTS } from "../endpoints.ts";

type ApiFileMeta = {
  key: string;
  label: string;
  id_key: string;
  fields: Array<[string, string]>;
  intKeys: string[];
  boolKeys: string[];
};

export type FileMeta = {
  key: string;
  label: string;
  idKey: string;
  fields: Array<[string, string]>;
  intKeys: string[];
  boolKeys: string[];
};

const mapFileMeta = (m: ApiFileMeta): FileMeta => ({
  key: m.key,
  label: m.label,
  idKey: m.id_key,
  fields: m.fields,
  intKeys: m.intKeys,
  boolKeys: m.boolKeys,
});

export const useFileMetaQuery = (key: string) =>
  useQuery<FileMeta>({
    queryKey: ["meta", key],
    queryFn: async () =>
      mapFileMeta(await apiGet<ApiFileMeta>(ENDPOINTS.fileMeta(key))),
  });
