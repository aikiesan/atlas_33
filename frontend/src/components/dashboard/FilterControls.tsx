import { FilterOptions, UIARegion, SDG } from '../../types';

interface FilterControlsProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const regions: (UIARegion | 'All Regions')[] = [
  'All Regions',
  'Section I - Western Europe',
  'Section II - Eastern Europe & Central Asia',
  'Section III - Middle East & Africa',
  'Section IV - Asia & Pacific',
  'Section V - Americas',
];

const sdgs: (SDG | 'All SDGs')[] = ['All SDGs', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const sdgLabels: Record<SDG, string> = {
  1: 'No Poverty',
  2: 'Zero Hunger',
  3: 'Good Health',
  4: 'Quality Education',
  5: 'Gender Equality',
  6: 'Clean Water',
  7: 'Clean Energy',
  8: 'Decent Work',
  9: 'Innovation',
  10: 'Reduced Inequality',
  11: 'Sustainable Cities',
  12: 'Responsible Consumption',
  13: 'Climate Action',
  14: 'Life Below Water',
  15: 'Life on Land',
  16: 'Peace & Justice',
  17: 'Partnerships',
};

export default function FilterControls({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterControlsProps) {
  const hasActiveFilters =
    (filters.region && filters.region !== 'All Regions') ||
    (filters.sdg && filters.sdg !== 'All SDGs');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-stone-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            UIA Region
          </label>
          <select
            value={filters.region || 'All Regions'}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                region: e.target.value as UIARegion | 'All Regions',
              })
            }
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* SDG Filter */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Sustainable Development Goal
          </label>
          <select
            value={filters.sdg || 'All SDGs'}
            onChange={(e) => {
              const value = e.target.value;
              onFilterChange({
                ...filters,
                sdg: value === 'All SDGs' ? 'All SDGs' : (parseInt(value) as SDG),
              });
            }}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            {sdgs.map((sdg) => (
              <option key={sdg} value={sdg}>
                {sdg === 'All SDGs' ? 'All SDGs' : `SDG ${sdg}: ${sdgLabels[sdg as SDG]}`}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-stone-200">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
              Active Filters
            </p>
            <div className="flex flex-wrap gap-2">
              {filters.region && filters.region !== 'All Regions' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  {filters.region}
                  <button
                    onClick={() => onFilterChange({ ...filters, region: 'All Regions' })}
                    className="ml-2 hover:text-primary-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.sdg && filters.sdg !== 'All SDGs' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                  SDG {filters.sdg}
                  <button
                    onClick={() => onFilterChange({ ...filters, sdg: 'All SDGs' })}
                    className="ml-2 hover:text-accent-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
