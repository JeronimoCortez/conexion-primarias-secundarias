'use client';

import { useState } from 'react';
import DepartmentSelector from './DepartmentSelector';
import PrimarySchoolSelector from './PrimarySchoolSelector';
import SecondarySchoolsList from './SecondarySchoolsList';

export default function SchoolSelector() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedPrimarySchool, setSelectedPrimarySchool] = useState<
    string | null
  >(null);
  const [selectedPrimarySchoolName, setSelectedPrimarySchoolName] = useState<
    string | null
  >(null);
  const [selectedPrimarySchoolLocalidad, setSelectedPrimarySchoolLocalidad] =
    useState<string | null>(null);

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    // Clear dependent selections
    setSelectedPrimarySchool(null);
    setSelectedPrimarySchoolName(null);
    setSelectedPrimarySchoolLocalidad(null);
  };

  const handlePrimarySchoolChange = (
    schoolId: string,
    schoolName: string,
    localidad: string
  ) => {
    setSelectedPrimarySchool(schoolId);
    setSelectedPrimarySchoolName(schoolName);
    setSelectedPrimarySchoolLocalidad(localidad);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Selection Filters */}
      <div className="space-y-4">
        <DepartmentSelector
          onSelectDepartment={handleDepartmentChange}
          selectedDepartment={selectedDepartment}
        />

        <PrimarySchoolSelector
          selectedDepartment={selectedDepartment}
          onSelectSchool={handlePrimarySchoolChange}
          selectedSchool={selectedPrimarySchool}
        />
      </div>

      {/* Secondary Schools Display */}
      <div>
        <SecondarySchoolsList
          selectedDepartment={selectedDepartment}
          selectedPrimarySchoolName={selectedPrimarySchoolName}
          selectedPrimarySchoolLocalidad={selectedPrimarySchoolLocalidad}
        />
      </div>
    </div>
  );
}
