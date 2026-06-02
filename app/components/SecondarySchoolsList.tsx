'use client';

import { useEffect, useState } from 'react';
import SecondarySchoolCard from './SecondarySchoolCard';
import type { SecondarySchool } from './secondary-school';
import secondaryOrientadoData from '@/data/SecundariaOrientado.json';
import secondaryTecnicoData from '@/data/SecuntadariaTecnico.json';

interface SecondarySchoolsListProps {
  selectedDepartment: string | null;
  selectedPrimarySchoolName: string | null;
  selectedPrimarySchoolLocalidad: string | null;
}

export default function SecondarySchoolsList({
  selectedDepartment,
  selectedPrimarySchoolName,
  selectedPrimarySchoolLocalidad,
}: SecondarySchoolsListProps) {
  const [schoolsByLocalidad, setSchoolsByLocalidad] = useState<
    SecondarySchool[]
  >([]);
  const [otherSchools, setOtherSchools] = useState<SecondarySchool[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDepartment) {
      setSchoolsByLocalidad([]);
      setOtherSchools([]);
      return;
    }

    setIsLoading(true);

    // Combine both secondary school datasets
    const allSecondarySchools = [
      ...(secondaryOrientadoData as SecondarySchool[]),
      ...(secondaryTecnicoData as SecondarySchool[]),
    ];

    // Filter by selected department
    let departmentSchools = allSecondarySchools.filter(
      (school) => school.Departamento === selectedDepartment
    );

    // Separate schools by localidad
    let byLocalidad: SecondarySchool[] = [];
    let other: SecondarySchool[] = [];

    if (selectedPrimarySchoolLocalidad) {
      byLocalidad = departmentSchools
        .filter((school) => school.Localidad === selectedPrimarySchoolLocalidad)
        .sort((a, b) => a.Nombre_Escuela.localeCompare(b.Nombre_Escuela));

      other = departmentSchools
        .filter((school) => school.Localidad !== selectedPrimarySchoolLocalidad)
        .sort((a, b) => a.Nombre_Escuela.localeCompare(b.Nombre_Escuela));
    }

    setSchoolsByLocalidad(byLocalidad);
    setOtherSchools(other);
    setIsLoading(false);
  }, [selectedDepartment, selectedPrimarySchoolLocalidad]);

  if (!selectedDepartment || !selectedPrimarySchoolLocalidad) {
    return (
      <div className="text-center py-8 text-gray-500">
        Selecciona un departamento y una escuela primaria para ver las escuelas
        secundarias disponibles.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Cargando escuelas secundarias...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Schools in the same localidad */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Escuelas Secundarias de {selectedPrimarySchoolLocalidad}
          </h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {schoolsByLocalidad.length} escuela
            {schoolsByLocalidad.length !== 1 ? 's' : ''}
          </span>
        </div>
        {schoolsByLocalidad.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay escuelas secundarias disponibles en esta localidad.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schoolsByLocalidad.map((school) => (
              <SecondarySchoolCard
                key={`${school.Nombre_Escuela}-${school.Nivel}`}
                school={school}
              />
            ))}
          </div>
        )}
      </div>

      {/* Other schools in the department */}
      {otherSchools.length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Otras escuelas del departamento
            </h2>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {otherSchools.length} escuela
              {otherSchools.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherSchools.map((school) => (
              <SecondarySchoolCard
                key={`${school.Nombre_Escuela}-${school.Nivel}`}
                school={school}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
