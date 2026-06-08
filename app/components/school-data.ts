export interface SchoolNumberRecord {
  Escuela_ID?: string;
  'N\u00famero_escuela'?: string;
}

export interface PrimarySchoolRecord extends SchoolNumberRecord {
  Nombre_Escuela: string;
  Departamento: string;
  Localidad: string;
}

export interface ConnectionRecord {
  supervisi\u00f3n_primaria: string;
  nro_prim: string;
  escuelas_primarias: string;
  localidad: string;
  departamento: string;
  n\u00facleo_articulaci\u00f3n: string;
  nro_secund: string;
  anexo: string;
  secundaria: string;
}

export function normalizeSchoolNumber(value: string | null | undefined) {
  return value?.trim().toUpperCase().replace(/\/0$/, '') ?? '';
}

export function getSchoolNumber(record: SchoolNumberRecord) {
  return record['N\u00famero_escuela'] ?? record.Escuela_ID ?? '';
}
