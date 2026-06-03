'use client';

import { useEffect, useState } from 'react';
import primaryData from '@/data/primaria.json';

interface School {
  Nombre_Escuela: string;
  'Número_escuela': string;
  Escuela_ID: string;
  Departamento: string;
  Localidad: string;
}

interface PrimarySchoolSelectorProps {
  selectedDepartment: string | null;
  onSelectSchool: (schoolId: string, schoolName: string, localidad: string) => void;
  selectedSchool: string | null;
}

export default function PrimarySchoolSelector({
  selectedDepartment,
  onSelectSchool,
  selectedSchool,
}: PrimarySchoolSelectorProps) {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDepartment) {
      setSchools([]);
      return;
    }

    setIsLoading(true);

    // Filter primary schools by selected department
    const filteredSchools = (primaryData as School[])
      .filter((school) => school.Departamento === selectedDepartment)
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
          const schoolId = e.target.value;
          const school = schools.find((s) => s.Escuela_ID === schoolId);
          if (school) {
            onSelectSchool(schoolId, school.Nombre_Escuela, school.Localidad);
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
        {schools.map((school) => (
          <option key={school.Escuela_ID} value={school.Escuela_ID}>
            {school.Nombre_Escuela} - {school['Número_escuela']}
          </option>
        ))}
      </select>
    </div>
  );
}
