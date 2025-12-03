import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { dashboardAPI } from '../../services/api/dashboard';
import { FilterOptions, DashboardKPIs, Project } from '../../types';
import KPICards from '../../components/dashboard/KPICards';
import FilterControls from '../../components/dashboard/FilterControls';
import ProjectDetailPanel from '../../components/dashboard/ProjectDetailPanel';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMarker {
  id: string;
  project_name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  region: string;
}

function MapUpdater({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(
        markers.map((m) => [m.latitude, m.longitude] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }
  }, [markers, map]);

  return null;
}

export default function Dashboard() {
  const [kpis, setKpis] = useState<DashboardKPIs>({
    totalProjects: 0,
    citiesEngaged: 0,
    countriesRepresented: 0,
    totalFundingNeeded: 0,
    totalFundingSpent: 0,
  });
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    region: 'All Regions',
    sdg: 'All SDGs',
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [kpisData, markersData] = await Promise.all([
        dashboardAPI.getKPIs(filters),
        dashboardAPI.getMapMarkers(filters),
      ]);

      setKpis(kpisData);
      setMarkers(markersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = async (projectId: string) => {
    try {
      const project = await dashboardAPI.getProject(projectId);
      setSelectedProject(project);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      region: 'All Regions',
      sdg: 'All SDGs',
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Bar */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-4 z-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-stone-900">
              Global Dashboard
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Explore sustainable development projects worldwide
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden inline-flex items-center px-4 py-2 border border-stone-300 rounded-lg text-sm font-medium text-stone-700 bg-white hover:bg-stone-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mt-6">
          <KPICards kpis={kpis} loading={loading} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-80 bg-stone-50 border-r border-stone-200 overflow-y-auto p-4`}
        >
          <FilterControls
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Quick Stats */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-stone-200 p-4">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide mb-3">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-600">Visible Projects</span>
                <span className="font-semibold text-primary-600">{markers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-600">Active Filters</span>
                <span className="font-semibold text-stone-900">
                  {(filters.region && filters.region !== 'All Regions' ? 1 : 0) +
                    (filters.sdg && filters.sdg !== 'All SDGs' ? 1 : 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-stone-200 p-4">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide mb-3">
              Map Legend
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                <span className="text-stone-600">Project Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                <span className="text-stone-600">Cluster (Click to zoom)</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                <p className="mt-4 text-stone-600 font-medium">Loading projects...</p>
              </div>
            </div>
          )}

          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup chunkedLoading>
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.latitude, marker.longitude]}
                  eventHandlers={{
                    click: () => handleMarkerClick(marker.id),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-stone-900 mb-1">
                        {marker.project_name}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {marker.city}, {marker.country}
                      </p>
                      <p className="text-xs text-stone-500 mt-1">{marker.region}</p>
                      <button
                        onClick={() => handleMarkerClick(marker.id)}
                        className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        View Details →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>

            <MapUpdater markers={markers} />
          </MapContainer>

          {/* No Results Message */}
          {!loading && markers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                <svg
                  className="w-16 h-16 text-stone-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  No Projects Found
                </h3>
                <p className="text-stone-600 mb-4">
                  No projects match your current filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 pointer-events-auto"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Project Detail Panel */}
      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
