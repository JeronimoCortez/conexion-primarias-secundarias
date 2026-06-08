'use client';

import { useEffect, useState } from 'react';
import SecondarySchoolCard from './SecondarySchoolCard';
import type { SecondarySchool } from './secondary-school';
import {
  getSchoolNumber,
  normalizeSchoolNumber,
  type ConnectionRecord,
} from './school-data';
import connectedData from '@/data/conectadas.json';
import secondaryOrientadoData from '@/data/SecundariaOrientado.json';
import secondaryTecnicoData from '@/data/SecuntadariaTecnico.json';

interface SecondarySchoolsListProps {
  selectedDepartment: string | null;
  selectedPrimarySchoolNumber: string | null;
  selectedPrimarySchoolName: string | null;
  selectedPrimarySchoolLocalidad: string | null;
}

interface ConnectedSchoolGroup {
  nucleus: string;
  schools: SecondarySchool[];
}

export default function SecondarySchoolsList({
  selectedDepartment,
  selectedPrimarySchoolNumber,
  selectedPrimarySchoolName,
  selectedPrimarySchoolLocalidad,
}: SecondarySchoolsListProps) {
  const [connectedSchools, setConnectedSchools] = useState<ConnectedSchoolGroup[]>(
    []
  );
  const [otherSchools, setOtherSchools] = useState<SecondarySchool[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDepartment || !selectedPrimarySchoolNumber) {
      setConnectedSchools([]);
      setOtherSchools([]);
      return;
    }

    setIsLoading(true);

    const allSecondarySchools = [
      ...(secondaryOrientadoData as SecondarySchool[]),
      ...(secondaryTecnicoData as SecondarySchool[]),
    ].filter((school) => school.Nombre_Escuela && getSchoolNumber(school));

    const secondarySchoolsByNumber = new Map<string, SecondarySchool>();
    allSecondarySchools.forEach((school) => {
      secondarySchoolsByNumber.set(
        normalizeSchoolNumber(getSchoolNumber(school)),
        school
      );
    });

    const relatedConnections = (connectedData as ConnectionRecord[]).filter(
      (connection) =>
        connection.departamento === selectedDepartment &&
        normalizeSchoolNumber(connection.nro_prim) ===
          normalizeSchoolNumber(selectedPrimarySchoolNumber)
    );

    const connectedNumbers = new Set<string>();
    const connectedByNucleus = new Map<string, SecondarySchool[]>();

    relatedConnections.forEach((connection) => {
      const schoolNumber = normalizeSchoolNumber(connection.nro_secund);
      const school = secondarySchoolsByNumber.get(schoolNumber);

      if (!school || connectedNumbers.has(schoolNumber)) {
        return;
      }

      connectedNumbers.add(schoolNumber);
      const nucleus = connection['n\u00facleo_articulaci\u00f3n'] || 'Sin núcleo';
      const schoolsInNucleus = connectedByNucleus.get(nucleus) ?? [];
      schoolsInNucleus.push(school);
      connectedByNucleus.set(nucleus, schoolsInNucleus);
    });

    const groupedConnections = Array.from(connectedByNucleus.entries())
      .map(([nucleus, schools]) => ({
        nucleus,
        schools: schools.sort((a, b) => a.Nombre_Escuela.localeCompare(b.Nombre_Escuela)),
      }))
      .sort(
        (a, b) =>
          a.nucleus.localeCompare(b.nucleus) ||
          a.schools[0].Nombre_Escuela.localeCompare(b.schools[0].Nombre_Escuela)
      );

    const departmentSchools = allSecondarySchools.filter(
      (school) => school.Departamento === selectedDepartment
    );

    let other: SecondarySchool[] = [];

    if (selectedPrimarySchoolLocalidad) {
      other = departmentSchools
        .filter((school) => school.Localidad !== selectedPrimarySchoolLocalidad)
        .sort((a, b) => a.Nombre_Escuela.localeCompare(b.Nombre_Escuela));
    }

    setConnectedSchools(groupedConnections);
    setOtherSchools(other);
    setIsLoading(false);
  }, [
    selectedDepartment,
    selectedPrimarySchoolLocalidad,
    selectedPrimarySchoolNumber,
  ]);

  if (!selectedDepartment || !selectedPrimarySchoolNumber) {
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

  const connectedSchoolCount = connectedSchools.reduce(
    (total, group) => total + group.schools.length,
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Escuelas secundarias articuladas
          </h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {connectedSchoolCount} escuela
            {connectedSchoolCount !== 1 ? 's' : ''}
          </span>
        </div>

        {selectedPrimarySchoolName && selectedPrimarySchoolLocalidad && (
          <p className="mb-4 text-sm text-gray-600">
            Articulación oficial para {selectedPrimarySchoolName} (
            {selectedPrimarySchoolLocalidad}).
          </p>
        )}

        {connectedSchools.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay articulaciones oficiales registradas para esta escuela
            primaria.
          </div>
        ) : (
          <div className="space-y-6">
            {connectedSchools.map((group) => (
              <div key={group.nucleus} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {group.nucleus}
                  </h3>
                  <span className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                    {group.schools.length} escuela
                    {group.schools.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.schools.map((school) => (
                    <SecondarySchoolCard
                      key={`${group.nucleus}-${getSchoolNumber(school)}`}
                      school={school}
                      articulationLabel={group.nucleus}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
                key={`${school.Nombre_Escuela}-${getSchoolNumber(school)}`}
                school={school}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
