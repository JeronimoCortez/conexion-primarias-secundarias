'use client';

import type { SecondarySchool } from './secondary-school';
import { getSchoolNumber } from './school-data';

interface SecondarySchoolCardProps {
  school: SecondarySchool;
  articulationLabel?: string;
}

function splitPhoneNumbers(phoneValue: string) {
  return phoneValue
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function buildTelHref(phoneValue: string) {
  return `tel:${phoneValue.replace(/[^\d+]/g, '')}`;
}

export default function SecondarySchoolCard({
  school,
  articulationLabel,
}: SecondarySchoolCardProps) {
  const address = `${school.calle} ${school.calle_numero}`;
  const phoneNumbers = splitPhoneNumbers(school.telefono);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {school.Nombre_Escuela}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{school.Nivel}</p>
          {articulationLabel && (
            <div className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {articulationLabel}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Nro. escuela:</span>{' '}
            <span>{getSchoolNumber(school)}</span>
          </div>
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
            <span className="inline-flex flex-wrap items-center gap-x-1 gap-y-1">
              {phoneNumbers.map((phoneNumber, index) => (
                <span
                  key={`${phoneNumber}-${index}`}
                  className="inline-flex items-center gap-x-1"
                >
                  {index > 0 && <span aria-hidden="true">/</span>}
                  <a
                    href={buildTelHref(phoneNumber)}
                    className="text-blue-600 hover:underline"
                  >
                    {phoneNumber}
                  </a>
                </span>
              ))}
            </span>
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
