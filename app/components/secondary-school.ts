import type { SchoolNumberRecord } from './school-data';

export interface SecondarySchool extends SchoolNumberRecord {
  Nombre_Escuela: string;
  Localidad: string;
  calle: string;
  calle_numero: string;
  Nivel: string;
  Departamento: string;
  Supervisi\u00f3n: string;
  telefono: string;
  'Secci\u00f3n / Equipo DAE'?: string;
}
