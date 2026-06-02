'use client';

import type { SecondarySchool } from './secondary-school';

interface SecondarySchoolCardProps {
  school: SecondarySchool;
}

export default function SecondarySchoolCard({
  school,
}: SecondarySchoolCardProps) {
  const address = `${school.calle} ${school.calle_numero}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {school.Nombre_Escuela}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {school.Nivel}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Localidad:</span>{' '}
            <span>{school.Localidad}</span>
          </div>
          <div>
            <span className="font-medium">Dirección:</span>{' '}
            <span>{address}</span>
          </div>
          <div>
            <span className="font-medium">Supervisión:</span>{' '}
            <span>{school.Supervisión}</span>
          </div>
          <div>
            <span className="font-medium">Teléfono:</span>{' '}
            <a
              href={`tel:${school.telefono}`}
              className="text-blue-600 hover:underline"
            >
              {school.telefono}
            </a>
          </div>
          {school['Sección / Equipo DAE'] && (
            <div>
              <span className="font-medium">Sección:</span>{' '}
              <span>{school['Sección / Equipo DAE']}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
