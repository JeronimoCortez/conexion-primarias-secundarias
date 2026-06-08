'use client';

import { useEffect, useState } from 'react';
import primaryData from '@/data/primaria.json';
import type { PrimarySchoolRecord } from './school-data';

interface DepartmentSelectorProps {
  onSelectDepartment: (department: string) => void;
  selectedDepartment: string | null;
}

export default function DepartmentSelector({
  onSelectDepartment,
  selectedDepartment,
}: DepartmentSelectorProps) {
  const [departments, setDepartments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract unique departments from primary schools data
    const uniqueDepartments = Array.from(
      new Set((primaryData as PrimarySchoolRecord[]).map((school) => school.Departamento))
    )
      .filter(Boolean)
      .sort();

    setDepartments(uniqueDepartments);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="department-select" className="font-semibold text-gray-700">
        Departamento
      </label>
      <select
        id="department-select"
        value={selectedDepartment || ''}
        onChange={(e) => onSelectDepartment(e.target.value)}
        disabled={isLoading}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 font-medium"
      >
        <option value="">
          {isLoading ? 'Cargando departamentos...' : 'Selecciona un departamento'}
        </option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
