import SchoolSelector from './components/SchoolSelector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Conexión Primaria - Secundaria
            </h1>
            <p className="text-gray-600">
              Busca las escuelas secundarias disponibles según tu escuela primaria
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <SchoolSelector />
          </div>
        </div>
      </main>
    </div>
  );
}
