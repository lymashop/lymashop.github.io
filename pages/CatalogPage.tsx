import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/Product/ProductCard';
import SearchBar from '../components/Product/SearchBar';
import { products as allProducts } from '../data/products';
import { Product, SortOption } from '../types';
import { siteContent } from '../data/siteContent';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Button from '../components/UI/Button';
import { FilterIcon, XMarkIcon, CheckSquareIcon, SquareIcon, RadioCheckedIcon, RadioUncheckedIcon } from '../components/UI/Icon';

const SORT_OPTIONS: SortOption[] = [
  { value: 'default', label: 'Par défaut' },
  { value: 'price-asc', label: 'Prix : Croissant' },
  { value: 'price-desc', label: 'Prix : Décroissant' },
  { value: 'name-asc', label: 'Nom : A à Z' },
  { value: 'name-desc', label: 'Nom : Z à A' },
  { value: 'rating-desc', label: 'Popularité (avis)' },
];

const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>(SORT_OPTIONS[0].value);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    allProducts.forEach(product => categories.add(product.category));
    return Array.from(categories).sort();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortOption(SORT_OPTIONS[0].value);
    setSearchTerm(''); 
  };
  
  const applyMobileFilters = () => {
    setIsMobileFilterOpen(false);
    // Filters are already applied by state changes, this just closes the drawer
  };

  const filteredAndSortedProducts = useMemo(() => {
    setIsLoading(true); // Simulate loading
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // 'default' or any other case
        // Keep original order or sort by ID for stability if needed
        filtered.sort((a,b) => parseInt(a.id) - parseInt(b.id));
        break;
    }
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300); 
    return filtered;
  }, [searchTerm, selectedCategories, sortOption]);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }; // Cleanup on unmount
  }, [isMobileFilterOpen]);

  const FilterControls = ({ inDrawer }: { inDrawer?: boolean }) => (
    <div className={`space-y-6 ${inDrawer ? 'p-4' : ''}`}>
      {/* Category Filters */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">{siteContent.catalog.categoriesTitle}</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {uniqueCategories.map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-slate-300 hover:text-primary-dark dark:hover:text-primary-light">
              <input
                type="checkbox"
                className="hidden" // Hidden and replaced by custom icons
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {selectedCategories.includes(category) ? <CheckSquareIcon className="text-primary-dark dark:text-primary-light" /> : <SquareIcon className="text-gray-400 dark:text-slate-500" />}
              <span>{category} ({allProducts.filter(p => p.category === category).length})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">{siteContent.catalog.sortTitle}</h3>
        <div className="space-y-2">
          {SORT_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-slate-300 hover:text-primary-dark dark:hover:text-primary-light">
              <input
                type="radio"
                name="sortOption"
                className="hidden" // Hidden and replaced by custom icons
                value={option.value}
                checked={sortOption === option.value}
                onChange={() => setSortOption(option.value)}
              />
              {sortOption === option.value ? <RadioCheckedIcon className="text-primary-dark dark:text-primary-light" /> : <RadioUncheckedIcon className="text-gray-400 dark:text-slate-500" />}
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <Button variant="outline" onClick={clearFilters} fullWidth size="sm">
        {siteContent.catalog.clearFiltersButton}
      </Button>
    </div>
  );


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-serif text-gray-800 dark:text-slate-100 mb-2">
          {siteContent.catalog.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-300">
          Découvrez notre collection exclusive de vêtements et accessoires.
        </p>
      </div>
      
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} className="mb-6 max-w-2xl mx-auto" />

      <div className="md:flex md:gap-x-6 lg:gap-x-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block md:w-60 lg:w-72 xl:w-80 py-4 pr-2 space-y-6 sticky top-24 self-start h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">{siteContent.catalog.filtersTitle}</h2>
          <FilterControls />
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1 min-w-0"> {/* min-w-0 helps flexbox grid items to not overflow */}
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <LoadingSpinner text="Chargement des produits..." />
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {/* On smallest screens: 2 cols. 
                  md (with sidebar): 2 cols in content area. 
                  lg (with sidebar): 3 cols in content area.
                  xl (with sidebar): 3 cols in content area (can be 4 if cards are smaller or sidebar narrower)
              */}
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-slate-100">{siteContent.catalog.noProductsFound}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Essayez de modifier vos termes de recherche ou vos filtres.</p>
              <div className="mt-6">
                <Button variant="ghost" onClick={clearFilters} className="text-primary-dark dark:text-primary-light hover:underline">
                  {siteContent.catalog.clearFiltersButton}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Button */}
      <Button 
        variant="primary"
        onClick={() => setIsMobileFilterOpen(true)} 
        className="md:hidden fixed bottom-6 left-6 z-30 p-4 rounded-full shadow-lg flex items-center"
        aria-label="Ouvrir les filtres"
      >
        <FilterIcon className="w-5 h-5 mr-2" />
        <span>Filtres</span>
      </Button>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-slate-900 h-full shadow-xl flex flex-col transform transition-transform ease-in-out duration-300 translate-x-0">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">{siteContent.catalog.filtersTitle}</h2>
              <Button variant="ghost" onClick={() => setIsMobileFilterOpen(false)} aria-label="Fermer les filtres">
                <XMarkIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <FilterControls inDrawer />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700">
              <Button variant="primary" onClick={applyMobileFilters} fullWidth>
                {siteContent.catalog.applyFiltersButton} ({filteredAndSortedProducts.length} résultats)
              </Button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: var(--scrollbar-track);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb);
          border-radius: 10px;
          border: 2px solid var(--scrollbar-track);
        }
      `}</style>
      <script dangerouslySetInnerHTML={{__html: `
        document.documentElement.style.setProperty('--scrollbar-thumb', document.documentElement.classList.contains('dark') ? '#475569' : '#CBD5E1'); /* slate-600 dark, gray-300 light */
        document.documentElement.style.setProperty('--scrollbar-track', 'transparent');
        new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              document.documentElement.style.setProperty('--scrollbar-thumb', document.documentElement.classList.contains('dark') ? '#475569' : '#CBD5E1');
            }
          }
        }).observe(document.documentElement, { attributes: true });
      `}}/>
    </div>
  );
};

export default CatalogPage;