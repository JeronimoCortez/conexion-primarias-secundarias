'use client';

import { useEffect, useState } from 'react';
import primaryData from '@/data/primaria.json';
import {
  getSchoolNumber,
  normalizeSchoolNumber,
  type PrimarySchoolRecord,
} from './school-data';

interface PrimarySchoolSelectorProps {
  selectedDepartment: string | null;
  onSelectSchool: (
    schoolNumber: string,
    schoolName: string,
    localidad: string
  ) => void;
  selectedSchool: string | null;
}

export default function PrimarySchoolSelector({
  selectedDepartment,
  onSelectSchool,
  selectedSchool,
}: PrimarySchoolSelectorProps) {
  const [schools, setSchools] = useState<PrimarySchoolRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDepartment) {
      setSchools([]);
      return;
    }

    setIsLoading(true);

    const filteredSchools = (primaryData as PrimarySchoolRecord[])
      .filter(
        (school) =>
          school.Departamento === selectedDepartment &&
          school.Nombre_Escuela &&
          getSchoolNumber(school)
      )
      .sort((a, b) => a.Nombre_Escuela.localeCompare(b.Nombre_Escuela));

    setSchools(filteredSchools);
    setIsLoading(false);
  }, [selectedDepartment]);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="primary-school-select"
        className="font-semibold text-gray-700"
      >
        Escuela Primaria
      </label>
      <select
        id="primary-school-select"
        value={selectedSchool || ''}
        onChange={(e) => {
          const schoolNumber = e.target.value;
          const school = schools.find(
            (item) =>
              normalizeSchoolNumber(getSchoolNumber(item)) === schoolNumber
          );
          if (school) {
            onSelectSchool(
              schoolNumber,
              school.Nombre_Escuela,
              school.Localidad
            );
          }
        }}
        disabled={!selectedDepartment || isLoading}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 font-medium"
      >
        <option value="">
          {!selectedDepartment
            ? 'Selecciona un departamento primero'
            : isLoading
              ? 'Cargando escuelas...'
              : 'Selecciona una escuela primaria'}
        </option>
        {schools.map((school) => {
          const schoolNumber = normalizeSchoolNumber(getSchoolNumber(school));

          return (
            <option key={schoolNumber} value={schoolNumber}>
              {school.Nombre_Escuela} - {getSchoolNumber(school)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
